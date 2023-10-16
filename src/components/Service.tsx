"use client";
import { ServiceWorkerStatus } from "~/app/types";

export default function Service({
  serviceWorker,
  checkServiceWorker,
}: {
  serviceWorker: ServiceWorkerStatus;
  checkServiceWorker: () => Promise<void>;
}) {
  const registerServiceWorker = async () => {
    await navigator.serviceWorker.register("./service-worker.js");
    await checkServiceWorker();
  };

  const unregisterServiceWorker = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    await registration?.unregister();
    await checkServiceWorker();
  };

  return (
    <>
      <h2>Service worker</h2>
      <div>
        {serviceWorker.status === "not available" &&
          "This browser doesn't support service workers."}
        {serviceWorker.status === "not registered" &&
          "No service worker has been registered yet."}
        {serviceWorker.status === "registered" &&
          `Service worker registered. Scope: ${serviceWorker.registration?.scope}`}
      </div>
      <button
        id="register"
        onClick={registerServiceWorker}
        disabled={
          serviceWorker.status === "not available" ||
          serviceWorker.status === "registered"
        }
      >
        Register service worker
      </button>
      <button
        id="unregister"
        onClick={unregisterServiceWorker}
        disabled={
          serviceWorker.status === "not available" ||
          serviceWorker.status === "not registered"
        }
      >
        Unregister service worker
      </button>
    </>
  );
}
