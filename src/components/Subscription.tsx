"use client";
import { ServiceWorkerStatus } from "~/app/types";
import postToServer from "~/utils/postToServer";
import urlB64ToUint8Array from "~/utils/urlB64ToUint8Array";

export default function Subscription({
  serviceWorker,
  checkServiceWorker,
}: {
  serviceWorker: ServiceWorkerStatus;
  checkServiceWorker: () => Promise<void>;
}) {
  async function subscribeToPush() {
    const subscription =
      await serviceWorker.registration?.pushManager?.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });
    if (subscription) {
      await postToServer("/api/add-subscription", subscription);
    }
    checkServiceWorker();
  }

  async function unsubscribeFromPush() {
    const subscription = serviceWorker?.subscription;
    if (subscription) {
      await postToServer("/api/remove-subscription", {
        endpoint: subscription.endpoint,
      });
      await subscription.unsubscribe();
    }
    checkServiceWorker();
  }

  return (
    <>
      <h2>Subscripton</h2>
      <div>
        {serviceWorker.status === "not available" &&
          "Push subscription on this client isn't possible because of lack of service worker support."}
        {serviceWorker.status === "not registered" &&
          "Push subscription on this client isn't possible until a service worker is registered."}
        {serviceWorker.status === "registered" &&
          !serviceWorker.subscription &&
          "Ready to subscribe this client to push."}
        {serviceWorker.status === "registered" &&
          serviceWorker.subscription &&
          `Service worker subscribed to push. Endpoint: ${serviceWorker.subscription.endpoint}`}
      </div>
      <button
        id="subscribe"
        onClick={subscribeToPush}
        disabled={
          serviceWorker.status !== "registered" || !!serviceWorker.subscription
        }
      >
        Subscribe to push
      </button>
      <button
        id="unsubscribe"
        onClick={unsubscribeFromPush}
        disabled={
          serviceWorker.status !== "registered" || !serviceWorker.subscription
        }
      >
        Unsubscribe from push
      </button>
    </>
  );
}
