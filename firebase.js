
const firebaseConfig = {
  apiKey: "AIzaSyDrMiuqnz_m-5zU8ZpB06VBevkM64iA0pg",
  authDomain: "projetoofthenight.firebaseapp.com",
  projectId: "projetoofthenight",
  storageBucket: "projetoofthenight.firebasestorage.app",
  messagingSenderId: "770366764129",
  appId: "1:770366764129:web:40ba31a38da6ede1b96620",
  measurementId: "G-LJLV2M2PLD"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    // se já inicializado, ignora
    console.warn('Firebase já inicializado', e);
  }
  window.auth = firebase.auth();
} else {
  console.error("Firebase SDK não encontrado. Verifique as tags <script> nos HTMLs.");
}

function openTerminal(key) {
  const modal = document.getElementById('terminal-modal');
  const body = document.getElementById('terminal-body');

  // buscar template
  const tpl = document.getElementById('tpl-' + key);
  if (!tpl) {
    body.innerHTML = '<h1>Conteúdo não encontrado</h1><p>Template "'+key+'" ausente.</p>';
  } else {
    body.innerHTML = '';
    // clona o template para o body
    body.appendChild(tpl.content.cloneNode(true));
  }

  // mostrar modal
  modal.setAttribute('aria-hidden', 'false');

  // foco para permitir scroll por teclado
  setTimeout(() => body.focus(), 100);
}

function closeTerminal() {
  const modal = document.getElementById('terminal-modal');
  modal.setAttribute('aria-hidden', 'true');
  // limpar conteúdo para economizar memória (opcional)
  const body = document.getElementById('terminal-body');
  body.innerHTML = '';
}

/* fechar ao pressionar ESC */
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('terminal-modal');
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
    closeTerminal();
  }
});

/* impedir rolagem do body quando modal aberto */
document.getElementById('terminal-modal').addEventListener('wheel', (e) => {
  // deixamos o scroll interno do terminal funcionar, nada especial
}, { passive: true });