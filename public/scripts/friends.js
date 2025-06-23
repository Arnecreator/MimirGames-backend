const API_URL =
  "https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev";

async function addFriend(username, friend) {
  try {
    const res = await fetch(`${API_URL}/api/friends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, friend }),
    });
    return await res.json();
  } catch (err) {
    console.error("Fel vid tillägg av vän:", err);
  }
}

async function getFriends(username) {
  try {
    const res = await fetch(`${API_URL}/api/friends/${username}`);
    if (!res.ok) throw new Error("Kunde inte hämta vänlista");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function removeFriend(username, friend) {
  try {
    await fetch(`${API_URL}/api/friends`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, friend }),
    });
  } catch (err) {
    console.error("Fel vid borttagning av vän:", err);
  }
}
