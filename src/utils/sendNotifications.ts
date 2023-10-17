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

export default async function sendNotifications(subscriptions: any[]) {
  const notification = JSON.stringify(createNotification());
  const options = {
    TTL: 10000,
    vapidDetails: vapidDetails,
  };

  const goes = Promise.all(
    subscriptions.map((subscription) => {
      const endpoint = subscription.endpoint;
      return webpush.sendNotification(subscription, notification, options);
    })
  );

  try {
    const results = await goes;

    console.log("All notifications sent");
  } catch (err) {
    console.log("Error sending notifications, reason: ", err);
  }
}
