export default async function postToServer(
  url: string,
  data?: { [key: string]: any }
) {
  const body = data ? JSON.stringify(data) : null;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}
