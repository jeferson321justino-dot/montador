 (() => {
  const PHONE_RAW = '69992131686';
  const NAME_BUSINESS = 'Jefferson Montador';

  const whatsappURL = (message) => {
    const text = encodeURIComponent(message);
    // Número sem caracteres; link wa.me/BR
    return `https://wa.me/55${PHONE_RAW}?text=${text}`;
  };

  const heroTopic = document.getElementById('quick-topic');
  if (heroTopic) {
    const topics = ['montagem', 'cortinas', 'reparos', 'instalações'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % topics.length;
      heroTopic.textContent = topics[i];
    }, 2600);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('#menu a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const setupWhatsappButtons = () => {
    const defaultMsg = `Olá! Quero orçamento para ${NAME_BUSINESS}.`

    const heroBtn = document.getElementById('hero-whatsapp');
    const waFloat = document.getElementById('wa-float');
    const whatsappCta = document.getElementById('whatsapp-cta');
    const topBtn = document.getElementById('btn-whatsapp');

    const map = [heroBtn, waFloat, whatsappCta, topBtn];
    map.forEach(el => {
      if (!el) return;
      el.href = whatsappURL(defaultMsg);
    });
  };

  setupWhatsappButtons();

  // Form -> WhatsApp com mensagem pronta
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const nome = (fd.get('nome') || '').toString().trim();
      const whatsapp = (fd.get('whatsapp') || '').toString().trim();
      const servico = (fd.get('servico') || '').toString().trim();
      const mensagem = (fd.get('mensagem') || '').toString().trim();

      const city = 'Cacoal-RO e região';

      const text = [
        `Olá! Meu nome é ${nome || '(não informado)'}.`,
        `WhatsApp: ${whatsapp || '(não informado)'}`,
        `Serviço: ${servico}`,
        `Local: ${city}`,
        mensagem ? `Mensagem: ${mensagem}` : ''
      ].filter(Boolean).join('\n');

      const url = whatsappURL(text);
      window.location.href = url;
    });
  }

  // Portfólio filter
  const filterButtons = document.querySelectorAll('.filter__btn');
  const items = document.querySelectorAll('.gallery__item');
  if (filterButtons.length && items.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const tag = btn.getAttribute('data-filter');
        items.forEach(it => {
          const itemTag = it.getAttribute('data-tag');
          const show = tag === 'todos' || itemTag === tag;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();

