const API_URL =
  "https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev";

async function saveStats(game, total, score) {
  const username = localStorage.getItem("mimirUsername");
  if (!username) return;

  try {
    await fetch(`${API_URL}/api/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, game, total, score }),
    });
  } catch (err) {
    console.error("Fel vid sparning av statistik:", err);
  }
}

async function getStats(username, game) {
  try {
    const res = await fetch(`${API_URL}/api/stats/${username}/${game}`);
    if (!res.ok) throw new Error("Kunde inte hämta statistik");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
