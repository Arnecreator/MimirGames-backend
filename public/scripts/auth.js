const API_BASE_URL =
  "https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev";

// === LOGIN ===
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("mimirUsername", username);
      localStorage.setItem("mimirIsLoggedIn", "true");
      alert("✅ Inloggning lyckades!");
      window.location.href = "home.html"; // eller "index.html"
    } else {
      alert(data.error || "Inloggning misslyckades");
    }
  } catch (error) {
    alert("Kunde inte logga in");
    console.error(error);
  }
}

// === REGISTER ===
export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ Registrering lyckades! Du kan nu logga in.");
    } else {
      alert(data.error || "Registrering misslyckades");
    }
  } catch (error) {
    alert("Kunde inte registrera");
    console.error(error);
  }
}
