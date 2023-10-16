import webpush from "web-push";

const vapidDetails = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: process.env.VAPID_SUBJECT,
};

function createNotification() {
  return {
    title: "Hello, Notifications!",
    options: {
      body: `ID: ${Math.floor(Math.random() * 100)}`,
      icon: "/paw-note.png",
      image: "/paw-note.png",
    },
  };
}

export default function sendNotifications(subscriptions: any[]) {
  const notification = JSON.stringify(createNotification());
  const options = {
    TTL: 10000,
    vapidDetails: vapidDetails,
  };

  subscriptions.forEach(async (subscription) => {
    const endpoint = subscription.endpoint;
    const id = endpoint.substr(endpoint.length - 8, endpoint.length);

    try {
      const result = await webpush.sendNotification(
        subscription,
        notification,
        options
      );

      console.log(`Endpoint ID: ${id}`);
      console.log(`Result: ${result.statusCode}`);
    } catch (err) {
      console.log(`Endpoint ID: ${id}`);
      console.log(`Error: ${err}`);
    }
  });
}
