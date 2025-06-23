const API_URL =
  "https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev";

async function loadLeaderboard(game) {
  try {
    const res = await fetch(`${API_URL}/api/leaderboard/${game}`);
    if (!res.ok) throw new Error("Kunde inte hämta topplistan");
    const data = await res.json();

    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    data.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${entry.username}: ${entry.score} poäng`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("leaderboard").innerHTML =
      "<li>Fel vid hämtning av data.</li>";
  }
}
