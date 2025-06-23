# Mimir Games – Backend Overview

This backend is part of the **Mimir Games** project and connects to a frontend running on a separate Replit project. The frontend uses `localStorage` for login, and fetches data from this backend through the following routes:

---

## 🔁 Connected Frontend

- Frontend URL: served via `.replit.dev` (separate Replit project)
- Backend Dev URL (current):  
  **https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev**

---

## 📁 Routes Overview (in `/routes` folder)

### `/auth.js`
- Handles login/logout logic (if needed for future expansion)

### `/friends.js`
- Shared friends list for all games
- Links usernames (7 chars or more) together

### `/stats.js`
- Stores user statistics per game
- Each game (e.g. quiz, pac-man) uses its own keys in the DB
- Tracks stats like:
  - Total percentage correct
  - Longest streak
  - Games with 100% score

### `/leaderboard.js`
- Sends leaderboard data to the frontend
- Example route:
  ```js
  router.get("/", (req, res) => {
      res.send("Leaderboard route working!");
  });
