export type ServiceWorkerStatus = {
  status: "not registered" | "registered" | "not available";
  registration?: ServiceWorkerRegistration;
  subscription?: PushSubscription | null;
};
