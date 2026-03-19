const SUPABASE_URL = 'https://kebbavbpqaudowzngpmq.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYmJhdmJwcWF1ZG93em5ncG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjY4NjYsImV4cCI6MjA4OTUwMjg2Nn0.YZhnSdY3TPGs87X-5sJm-HG9OMWlRtWcHSgvZxg2eyI';

function getToken() { return localStorage.getItem('vb_token'); }
function getUser() { try { return JSON.parse(localStorage.getItem('vb_user')); } catch { return null; } }
function setSession(token, user) { localStorage.setItem('vb_token', token); localStorage.setItem('vb_user', JSON.stringify(user)); }
function clearSession() { localStorage.removeItem('vb_token'); localStorage.removeItem('vb_user'); }

async function sbFetch(endpoint, method = 'GET', body = null) {
  const opts = { method, headers: { 'apikey': SUPABASE_ANON, 'Content-Type': 'application/json' } };
  const token = getToken();
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(SUPABASE_URL + endpoint, opts);
  return res.json();
}

async function login(email, password) {
  const data = await sbFetch('/auth/v1/token?grant_type=password', 'POST', { email, password });
  if (data.access_token) { setSession(data.access_token, data.user); return { ok: true }; }
  return { ok: false, error: data.error_description || 'Error al iniciar sesión' };
}

async function register(email, password) {
  const data = await sbFetch('/auth/v1/signup', 'POST', { email, password });
  if (data.id || data.user?.id) return { ok: true };
  return { ok: false, error: data.error_description || data.msg || 'Error al registrarse' };
}

function logout() { clearSession(); window.location.href = '/'; }

async function initNav() {
  const user = getUser();
  const loginBtn = document.getElementById('navLogin');
  const logoutBtn = document.getElementById('navLogout');
  const dashBtn = document.getElementById('navDashboard');
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline';
    if (dashBtn) dashBtn.style.display = 'inline';
  }
}

async function apiCall(endpoint, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(endpoint, opts);
  return res.json();
}
