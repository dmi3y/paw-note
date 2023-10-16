"use client";
import { useEffect, useState } from "react";
import Subscription from "~/components/Subscription";
import styles from "./page.module.css";
import Service from "~/components/Service";
import Notifications from "~/components/Notifications";
import { ServiceWorkerStatus } from "~/app/types";

export default function Home() {
  const [serviceWorker, setServiceWorkerStatus] = useState<ServiceWorkerStatus>(
    { status: "not registered" }
  );

  const checkServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker?.getRegistration();
      const subscription = await registration?.pushManager?.getSubscription();
      setServiceWorkerStatus(
        registration?.active
          ? { status: "registered", registration: registration, subscription }
          : { status: "not registered" }
      );
    } else {
      setServiceWorkerStatus({ status: "not available" });
    }
  };

  useEffect(() => {
    checkServiceWorker();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Push notifications client</h1>
      <noscript>
        You have JavaScript disabled. This app requires JavaScript to work.
      </noscript>
      <Service
        serviceWorker={serviceWorker}
        checkServiceWorker={checkServiceWorker}
      />
      <Subscription
        serviceWorker={serviceWorker}
        checkServiceWorker={checkServiceWorker}
      />
      <Notifications
        serviceWorker={serviceWorker}
        checkServiceWorker={checkServiceWorker}
      />
    </main>
  );
}
