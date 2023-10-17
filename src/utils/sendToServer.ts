export default async function sendToServer(
  url: string,
  data?: { [key: string]: any },
  method: "POST" | "DELETE" = "POST"
) {
  const body = data ? JSON.stringify(data) : null;
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}
