<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ValueBet — Crear cuenta</title>
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
    <div class="auth-title">Crear cuenta</div>
    <div class="auth-sub">Gratis · Sin tarjeta</div>

    <div class="form-group" style="margin-bottom:14px">
      <label>Email</label>
      <input type="email" id="email" placeholder="tu@email.com" />
    </div>
    <div class="form-group" style="margin-bottom:14px">
      <label>Contraseña</label>
      <input type="password" id="password" placeholder="Mínimo 6 caracteres" />
    </div>
    <div class="form-group" style="margin-bottom:20px">
      <label>Confirmar contraseña</label>
      <input type="password" id="password2" placeholder="Repite la contraseña" />
    </div>

    <button class="btn-full" id="btnReg" onclick="doRegister()">CREAR CUENTA</button>
    <div class="error" id="errorMsg" style="margin-top:12px"></div>
    <div id="successMsg" style="display:none;color:var(--green);font-size:0.83rem;padding:10px 13px;background:rgba(0,229,160,0.08);border:1px solid rgba(0,229,160,0.2);border-radius:9px;margin-top:12px;">
      ¡Cuenta creada! Revisa tu email para confirmarla y luego <a href="/pages/login.html" style="color:var(--accent)">inicia sesión</a>.
    </div>

    <div class="divider">o</div>
    <div class="auth-link">¿Ya tienes cuenta? <a href="/pages/login.html">Inicia sesión</a></div>
  </div>
</div>

<script src="/js/auth.js"></script>
<script>
  async function doRegister() {
    const email=document.getElementById('email').value.trim();
    const pw=document.getElementById('password').value;
    const pw2=document.getElementById('password2').value;
    if(!email||!pw) return showErr('Rellena todos los campos.');
    if(pw.length<6) return showErr('La contraseña debe tener al menos 6 caracteres.');
    if(pw!==pw2) return showErr('Las contraseñas no coinciden.');
    const btn=document.getElementById('btnReg'); btn.disabled=true; btn.textContent='CREANDO...';
    const r=await register(email,pw);
    if(r.ok) { document.getElementById('successMsg').style.display='block'; document.getElementById('errorMsg').style.display='none'; }
    else { showErr(r.error); btn.disabled=false; btn.textContent='CREAR CUENTA'; }
  }
  function showErr(m){const e=document.getElementById('errorMsg');e.textContent=m;e.style.display='block';}
</script>
</body>
</html>
