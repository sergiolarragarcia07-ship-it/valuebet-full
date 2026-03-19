<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ValueBet — Iniciar sesión</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/main.css">
</head>
<body>
<nav class="navbar">
  <a href="/" class="nav-logo">ValueBet</a>
  <div class="nav-links"></div>
</nav>

<div class="auth-container">
  <div class="auth-card">
    <div class="auth-title">Bienvenido</div>
    <div class="auth-sub">Inicia sesión en tu cuenta</div>

    <div class="form-group" style="margin-bottom:14px">
      <label>Email</label>
      <input type="email" id="email" placeholder="tu@email.com" />
    </div>
    <div class="form-group" style="margin-bottom:20px">
      <label>Contraseña</label>
      <input type="password" id="password" placeholder="••••••••" />
    </div>

    <button class="btn-full" id="btnLogin" onclick="doLogin()">INICIAR SESIÓN</button>
    <div class="error" id="errorMsg" style="margin-top:12px"></div>

    <div class="divider">o</div>

    <div class="auth-link">¿No tienes cuenta? <a href="/pages/register.html">Regístrate gratis</a></div>
    <div class="auth-link" style="margin-top:8px"><a href="/">← Volver a la calculadora</a></div>
  </div>
</div>

<script src="/js/auth.js"></script>
<script>
  if (getToken()) window.location.href = '/pages/dashboard.html';

  document.getElementById('password').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });

  async function doLogin() {
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    if(!email||!password) { showErr('Rellena todos los campos.'); return; }
    const btn=document.getElementById('btnLogin'); btn.disabled=true; btn.textContent='ENTRANDO...';
    const r=await login(email,password);
    if(r.ok) { window.location.href='/pages/dashboard.html'; }
    else { showErr(r.error); btn.disabled=false; btn.textContent='INICIAR SESIÓN'; }
  }

  function showErr(m){const e=document.getElementById('errorMsg');e.textContent=m;e.style.display='block';}
</script>
</body>
</html>
