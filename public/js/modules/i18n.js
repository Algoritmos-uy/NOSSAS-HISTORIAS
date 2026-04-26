const STORAGE_KEY = 'nossas-historias-locale';
const DEFAULT_LOCALE = 'pt-BR';

const MESSAGES = {
  'pt-BR': {
    header: {
      logoSub: 'Ricardo & Tami • Do Brasil ao Alasca',
      nav: {
        home: 'Início',
        historias: 'Histórias',
        lugares: 'Lugares',
        curiosidades: 'Curiosidades',
        loja: 'Loja',
        contato: 'Contato'
      },
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu'
    },
    chatbot: {
      toggleLabel: 'Conversar com Frederico',
      hint: 'Oi!, sou Frederico, Fala comigo',
      name: 'Frederico',
      status: 'Guia da aventura',
      inputPlaceholder: 'Pergunte sobre a aventura...',
      inputAria: 'Sua mensagem para Frederico',
      suggestions: [
        'Quem são Ricardo e Tami?',
        'Já chegaram no México? 🇲🇽',
        'Como é a Frontier?',
        'A rota até o Alasca',
        'O que tem na loja?'
      ],
      welcome: 'Oi! Eu sou Frederico, seu companheiro de aventura nesse site! 🗺️ Pergunta qualquer coisa sobre Ricardo e Tami, a viagem, o canal... pode falar!',
      errorSignal: 'Ops! Tive um problema de sinal por aqui... tenta de novo! 📡'
    },
    localePrompt: 'Detectamos que seu navegador está em Português do Brasil. Manter este idioma como padrão?'
  },
  es: {
    header: {
      logoSub: 'Ricardo & Tami • De Brasil a Alaska',
      nav: {
        home: 'Inicio',
        historias: 'Historias',
        lugares: 'Lugares',
        curiosidades: 'Curiosidades',
        loja: 'Tienda',
        contato: 'Contacto'
      },
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú'
    },
    chatbot: {
      toggleLabel: 'Hablar con Frederico',
      hint: '¡Hola!, soy Frederico, habla conmigo',
      name: 'Frederico',
      status: 'Guía de la aventura',
      inputPlaceholder: 'Pregunta sobre la aventura...',
      inputAria: 'Tu mensaje para Frederico',
      suggestions: [
        '¿Quiénes son Ricardo y Tami?',
        '¿Ya llegaron a México? 🇲🇽',
        '¿Cómo es la Frontier?',
        'La ruta hasta Alaska',
        '¿Qué hay en la tienda?'
      ],
      welcome: '¡Hola! Soy Frederico, tu compañero de aventura en este sitio 🗺️ Pregúntame lo que quieras sobre Ricardo y Tami, el viaje o el canal.',
      errorSignal: 'Ups, tuve un problema de señal... ¡intenta de nuevo! 📡'
    },
    localePrompt: 'Detectamos que tu navegador está en Español. ¿Deseas cambiar el sitio y el chatbot a Español?'
  },
  en: {
    header: {
      logoSub: 'Ricardo & Tami • From Brazil to Alaska',
      nav: {
        home: 'Home',
        historias: 'Stories',
        lugares: 'Places',
        curiosidades: 'Curiosities',
        loja: 'Shop',
        contato: 'Contact'
      },
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    chatbot: {
      toggleLabel: 'Chat with Frederico',
      hint: 'Hi! I am Frederico, talk to me',
      name: 'Frederico',
      status: 'Adventure guide',
      inputPlaceholder: 'Ask about the adventure...',
      inputAria: 'Your message to Frederico',
      suggestions: [
        'Who are Ricardo and Tami?',
        'Have they reached Mexico yet? 🇲🇽',
        'How is the Frontier?',
        'The route to Alaska',
        'What is in the shop?'
      ],
      welcome: 'Hi! I am Frederico, your adventure partner on this site 🗺️ Ask me anything about Ricardo and Tami, the trip, or the channel!',
      errorSignal: 'Oops, I had a signal issue... please try again! 📡'
    },
    localePrompt: 'We detected your browser is in English. Do you want to switch the site and chatbot to English?'
  }
};

let currentLocale = DEFAULT_LOCALE;

function normalizeLocale(locale = '') {
  const value = String(locale).toLowerCase();
  if (value.startsWith('pt')) return 'pt-BR';
  if (value.startsWith('es')) return 'es';
  if (value.startsWith('en')) return 'en';
  return DEFAULT_LOCALE;
}

function detectBrowserLocale() {
  const langs = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || DEFAULT_LOCALE];

  for (const lang of langs) {
    const normalized = normalizeLocale(lang);
    if (normalized !== DEFAULT_LOCALE) return normalized;
  }

  return DEFAULT_LOCALE;
}

function getNested(path, locale) {
  return path.split('.').reduce((acc, part) => (acc && part in acc ? acc[part] : undefined), MESSAGES[locale]);
}

export function t(path, fallback = '') {
  return getNested(path, currentLocale)
    ?? getNested(path, DEFAULT_LOCALE)
    ?? fallback
    ?? path;
}

function applyStaticI18n() {
  document.documentElement.lang = currentLocale === 'pt-BR' ? 'pt-BR' : currentLocale;

  const logoSub = document.querySelector('.header__logo-sub');
  if (logoSub) logoSub.textContent = t('header.logoSub');

  const navMap = {
    home: 'header.nav.home',
    historias: 'header.nav.historias',
    lugares: 'header.nav.lugares',
    curiosidades: 'header.nav.curiosidades',
    loja: 'header.nav.loja',
    contato: 'header.nav.contato'
  };

  document.querySelectorAll('.nav__link[data-pagina]').forEach(link => {
    const key = navMap[link.dataset.pagina];
    if (key) link.textContent = t(key);
  });

  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
    menuToggle.setAttribute('aria-label', t('header.closeMenu'));
  } else if (menuToggle) {
    menuToggle.setAttribute('aria-label', t('header.openMenu'));
  }

  const toggle = document.getElementById('historinha-toggle');
  if (toggle) toggle.setAttribute('aria-label', t('chatbot.toggleLabel'));

  const hint = document.querySelector('.historinha-toggle__hint');
  if (hint) hint.textContent = t('chatbot.hint');

  const name = document.querySelector('.historinha__nome');
  if (name) name.textContent = t('chatbot.name');

  const status = document.querySelector('.historinha__status');
  if (status) status.textContent = t('chatbot.status');

  const input = document.getElementById('historinha-input');
  if (input) {
    input.placeholder = t('chatbot.inputPlaceholder');
    input.setAttribute('aria-label', t('chatbot.inputAria'));
  }
}

export function getCurrentLanguage() {
  return currentLocale;
}

export function setLanguage(locale, { persist = true, emit = true } = {}) {
  currentLocale = normalizeLocale(locale);
  applyStaticI18n();

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, currentLocale);
    } catch {
      // ignore storage errors
    }
  }

  if (emit) {
    document.dispatchEvent(new CustomEvent('idioma-alterado', { detail: { locale: currentLocale } }));
  }
}

export function initializeI18n() {
  let savedLocale = null;
  try {
    savedLocale = localStorage.getItem(STORAGE_KEY);
  } catch {
    savedLocale = null;
  }

  if (savedLocale) {
    setLanguage(savedLocale, { persist: false, emit: false });
    return currentLocale;
  }

  const detected = detectBrowserLocale();
  if (detected !== DEFAULT_LOCALE) {
    const shouldSwitch = window.confirm(MESSAGES[detected].localePrompt);
    if (shouldSwitch) {
      setLanguage(detected, { persist: true, emit: false });
      return currentLocale;
    }
  }

  setLanguage(DEFAULT_LOCALE, { persist: true, emit: false });
  return currentLocale;
}
