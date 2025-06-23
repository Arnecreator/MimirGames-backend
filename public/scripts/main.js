console.log("✅ JavaScript loaded correctly!");

class MimirGames {
  constructor() {
    this.backendBaseUrl = window.location.origin;
    this.init();
  }

  init() {
    this.checkDevMode();
    this.checkLoginStatus();
    this.setupEventListeners();
  }

  checkDevMode() {
    const devMode = localStorage.getItem("mimirDevMode") === "true";
    if (devMode) {
      localStorage.setItem("mimirUsername", "Putte68");
      localStorage.setItem("mimirIsLoggedIn", "true");
      console.log(
        "%c🧪 Dev mode enabled. Logged in as Putte68!",
        "color: lime; font-weight: bold",
      );

      const banner = document.getElementById("devBanner");
      if (banner) banner.style.display = "block";
    }
  }

  checkLoginStatus() {
    const loggedIn = localStorage.getItem("mimirIsLoggedIn") === "true";
    const username = localStorage.getItem("mimirUsername");

    if (loggedIn && username && username.length >= 6) {
      this.showMainContent(username);
    } else {
      this.showUsernameModal();
    }
  }

  showUsernameModal() {
    const modal = document.getElementById("usernameModal");
    const mainContent = document.getElementById("mainContent");

    if (modal) modal.style.display = "flex";
    if (mainContent) mainContent.style.display = "none";
  }

  showMainContent(username) {
    const modal = document.getElementById("usernameModal");
    const mainContent = document.getElementById("mainContent");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (modal) modal.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
    if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${username}!`;
  }

  setupEventListeners() {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const emailInput = document.getElementById("emailInput");
    const errorDiv = document.getElementById("authError");
    const successDiv = document.getElementById("authSuccess");

    if (loginBtn) {
      loginBtn.addEventListener("click", () => this.handleAuth("login"));
    }

    if (registerBtn) {
      registerBtn.addEventListener("click", () => this.handleAuth("register"));
    }

    [usernameInput, passwordInput, emailInput].forEach((input) => {
      if (input) {
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            this.handleAuth("login");
          }
        });
        
        // Clear error messages when user starts typing
        input.addEventListener("input", () => {
          const errorDiv = document.getElementById("authError");
          const successDiv = document.getElementById("authSuccess");
          if (errorDiv) errorDiv.textContent = "";
          if (successDiv) successDiv.textContent = "";
        });
      }
    });

    const logoutBtn = document.getElementById("logoutBtn");
    const logoutLink = document.getElementById("logoutLink");

    [logoutBtn, logoutLink].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.logout();
        });
      }
    });

    const connectWalletBtn = document.getElementById("connectWalletBtn");
    if (connectWalletBtn) {
      connectWalletBtn.addEventListener("click", () => {
        alert("Wallet connection coming soon!");
      });
    }
  }

  async handleAuth(action) {
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const emailInput = document.getElementById("emailInput");
    const errorDiv = document.getElementById("authError");
    const successDiv = document.getElementById("authSuccess");

    const username = usernameInput?.value.trim();
    const password = passwordInput?.value;
    const email = emailInput?.value.trim();

    if (errorDiv) errorDiv.textContent = "";
    if (successDiv) successDiv.textContent = "";

    const validation = this.validateCredentials(username, password);
    if (!validation.valid) {
      if (errorDiv) errorDiv.textContent = validation.error;
      return;
    }

    try {
      const response = await fetch(
        `${this.backendBaseUrl}/api/auth/${action}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (successDiv) {
          if (action === "login" && data.emailAdded) {
            successDiv.innerHTML = '<strong>Email address added to your profile.</strong><br><em>You can now reset your password if needed.</em>';
          } else {
            successDiv.textContent = data.message;
          }
        }
        localStorage.setItem("mimirUsername", username);
        localStorage.setItem("mimirIsLoggedIn", "true");
        setTimeout(() => this.showMainContent(username), 1000);
      } else {
        if (errorDiv) {
          if (action === "login" && (response.status === 401 || data.error.includes("användarnamn") || data.error.includes("lösenord"))) {
            errorDiv.innerHTML = '<strong>Incorrect username or password.</strong><br><em>Check your information. To create a new account with these details, click Register.</em>';
          } else {
            errorDiv.textContent = data.error;
          }
        }
      }
    } catch (error) {
      if (errorDiv)
        errorDiv.textContent = "Connection error. Please try again.";
      console.error("Auth error:", error);
    }
  }

  validateCredentials(username, password) {
    if (!username) return { valid: false, error: "Please enter a username" };
    if (username.length < 6)
      return { valid: false, error: "Username must be at least 6 characters" };
    if (username.length > 20)
      return { valid: false, error: "Username must be 20 characters or less" };
    if (!password) return { valid: false, error: "Please enter a password" };
    if (password.length < 8)
      return { valid: false, error: "Password must be at least 8 characters" };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSymbol) {
      return {
        valid: false,
        error: "Password must contain uppercase, lowercase, number, and symbol",
      };
    }

    return { valid: true };
  }

  logout() {
    localStorage.removeItem("mimirIsLoggedIn");
    localStorage.removeItem("mimirUsername");
    this.showUsernameModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MimirGames();
});
