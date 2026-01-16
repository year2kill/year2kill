/* =========================================================
   YEAR2KILL — AUTH SPINE (FRONTEND ONLY)
   - Mechanics only
   - No design
   - No game logic
   ========================================================= */

/* ---------- CONFIG ---------- */
const SESSION_KEY = "y2k_session";
const USERS_KEY = "y2k_users";

/* ---------- HELPERS ---------- */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    username: user.username,
    email: user.email,
    loginTime: Date.now()
  }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

/* ---------- REGISTER ---------- */
async function registerUser(username, email, password, confirm) {
  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    alert("Account already exists.");
    return;
  }

  const newUser = {
    username,
    email,
    password, // FRONTEND ONLY — replace with hashing on backend later
    createdAt: Date.now(),
    killphone_state: {} // placeholder for future system state
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);

  window.location.href = "boot.html";
}

/* ---------- LOGIN ---------- */
async function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials.");
    return;
  }

  setSession(user);
  window.location.href = "boot.html";
}

/* ---------- LOGOUT ---------- */
function logoutUser() {
  clearSession();
  window.location.href = "login.html";
}

/* ---------- SESSION CHECK ---------- */
function isLoggedIn() {
  return !!getSession();
}

/* ---------- PROTECTED ROUTE ---------- */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

/* ---------- OPTIONAL: AUTO-CHECK ---------- */
/*
  Call requireAuth() at the TOP of any protected page:
  <script src="auth.js"></script>
  <script>requireAuth();</script>
*/
