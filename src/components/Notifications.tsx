"use client";
import { ServiceWorkerStatus } from "~/app/types";
import postToServer from "~/utils/sendToServer";

export default function Notifications({
  serviceWorker,
  checkServiceWorker,
}: {
  serviceWorker: ServiceWorkerStatus;
  checkServiceWorker: () => Promise<void>;
}) {
  async function notifyMe() {
    const subscription = serviceWorker?.subscription;
    if (subscription)
      await postToServer("/api/notify-me", { endpoint: subscription.endpoint });
  }

  async function notifyAll() {
    const response = await postToServer("/api/notify-all");
    // if (response.status === 409) {
    //   document.getElementById("notification-status-message").textContent =
    //     "There are no subscribed endpoints to send messages to, yet.";
    // }
  }

  return (
    <>
      <h2>Notifications</h2>
      <div>
        {serviceWorker.status === "not available" &&
          "Push subscription on this client isn't possible because of lack of service worker support."}
        {serviceWorker.status === "not registered" &&
          "Push notification to this client isn't possible until a service worker is registered."}
        {serviceWorker.status === "registered" &&
          !serviceWorker.subscription &&
          "Push notification to this client will be possible once subscribed."}
        {serviceWorker.status === "registered" &&
          serviceWorker.subscription &&
          "Ready to send a push notification to this client!"}
      </div>
      <button
        id="notify-me"
        onClick={notifyMe}
        disabled={
          serviceWorker.status !== "registered" || !serviceWorker.subscription
        }
      >
        Notify current subscription
      </button>
      <button
        id="notify-all"
        onClick={notifyAll}
        disabled={
          serviceWorker.status !== "registered" || !serviceWorker.subscription
        }
      >
        Notify all subscriptions
      </button>
    </>
  );
}
