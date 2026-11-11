// Aviso diário exibido após o login. O usuário precisa clicar em OK para ver o sistema.
// Reaparece uma vez por dia. Para desligar: remova a linha <script src="js/aviso.js"> do agenda.html.
(function () {
  var CHAVE = 'aviso-homologacao-v1';
  var d = new Date();
  var hoje = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  try { if (localStorage.getItem(CHAVE) === hoje) return; } catch (e) { /* sem storage: mostra sempre */ }

  var css = document.createElement('style');
  css.textContent =
    '.aviso-ov{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:16px;background:rgba(20,21,24,.72);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:avFade .25s ease both}' +
    '.aviso-box{box-sizing:border-box;position:relative;width:100%;max-width:460px;max-height:92vh;overflow:auto;background:#fff;border-radius:20px;padding:34px 28px 24px;box-shadow:0 24px 70px rgba(0,0,0,.35);font-family:Sora,"Segoe UI",sans-serif;color:#26282c;animation:avUp .35s cubic-bezier(.2,.8,.2,1) both}' +
    '.aviso-box::before{content:"";position:absolute;left:24px;right:24px;top:0;height:4px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,#7f1219,#b01e28)}' +
    '.aviso-ic{width:56px;height:56px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:1.6rem;background:#fbeaec;border:1px solid #f1c9cd}' +
    '.aviso-box h2{font-size:1.15rem;text-align:center;margin:0 0 14px;color:#26282c}' +
    '.aviso-box p{font-size:.92rem;line-height:1.6;color:#4a4d53;margin:0 0 12px}' +
    '.aviso-box p.dest{background:#f2f3f5;border-left:4px solid #b01e28;border-radius:8px;padding:10px 12px;color:#26282c}' +
    '.aviso-box p.fim{text-align:center;margin:16px 0 18px;font-weight:600;color:#26282c}' +
    '.aviso-ok{display:block;width:100%;padding:13px;border:0;border-radius:12px;cursor:pointer;font:700 1rem Sora,"Segoe UI",sans-serif;letter-spacing:.08em;color:#fff;background:linear-gradient(135deg,#b01e28,#7f1219);box-shadow:0 8px 20px rgba(176,30,40,.3);transition:transform .15s}' +
    '.aviso-ok:hover{transform:translateY(-1px)}.aviso-ok:focus-visible{outline:3px solid #26282c;outline-offset:2px}' +
    '@keyframes avFade{from{opacity:0}to{opacity:1}}@keyframes avUp{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}';
  document.head.appendChild(css);

  var ov = document.createElement('div');
  ov.className = 'aviso-ov';
  ov.innerHTML =
    '<div class="aviso-box" role="alertdialog" aria-modal="true" aria-labelledby="avT" aria-describedby="avD">' +
      '<div class="aviso-ic" aria-hidden="true">⚠️</div>' +
      '<h2 id="avT">Aviso importante</h2>' +
      '<div id="avD">' +
        '<p>Olá! Informamos que a ferramenta passará por uma análise de homologação interna e, por isso, ficará fora do ar por tempo indeterminado.</p>' +
        '<p>Durante esse período, os agendamentos deverão voltar a ser realizados da forma tradicional.</p>' +
        '<p class="dest">Pedimos, por gentileza, que, <b>até o dia 19/11</b>, os agendamentos sejam encaminhados pela forma tradicional, como era feito anteriormente.</p>' +
        '<p class="fim">Agradecemos a compreensão e a colaboração de todos!</p>' +
      '</div>' +
      '<button type="button" class="aviso-ok" id="avOk">OK</button>' +
    '</div>';
  document.body.appendChild(ov);

  var ok = ov.querySelector('#avOk');
  var overflowAnterior = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  setTimeout(function () { ok.focus(); }, 50);

  // Mantém o foco dentro do aviso até o usuário confirmar
  ov.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); ok.focus(); } });

  ok.addEventListener('click', function () {
    try { localStorage.setItem(CHAVE, hoje); } catch (e) { /* ignora */ }
    document.body.style.overflow = overflowAnterior;
    ov.remove();
    css.remove();
  });
})();
