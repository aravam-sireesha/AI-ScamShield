const BASE_URL = "http://localhost:8000";

export async function checkEmail(text: string) {
  const res = await fetch(`${BASE_URL}/email-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  return res.json();
}