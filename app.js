/*
  UX: navegação mobile, animações ao rolar, galeria (zoom/modal) e envio do formulário via WhatsApp.
*/

(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isHidden = mobileMenu.hasAttribute('hidden');
      if (isHidden) {
        mobileMenu.removeAttribute('hidden');
        burger.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));

  // Parallax: background shimmer (subtle)
  const hero = document.querySelector('.hero');
  if (hero) {
    const bg = hero.querySelector('.hero__bg');
    window.addEventListener('scroll', () => {
      const y = window.scrollY || 0;
      if (!bg) return;
      bg.style.transform = `translateY(${Math.min(36, y * 0.08)}px)`;
    }, { passive: true });
  }

  // Gallery modal
  const modal = document.getElementById('photoModal');
  const modalImg = modal ? modal.querySelector('.modal__img') : null;
  const modalCaption = modal ? document.getElementById('modalCaption') : null;
  const closeBtn = modal ? modal.querySelector('.modal__close') : null;

  const openModal = (imgEl, caption) => {
    if (!modal || !modalImg) return;
    modal.setAttribute('aria-hidden', 'false');
    modalImg.src = imgEl.currentSrc || imgEl.src || '';
    modalImg.alt = imgEl.alt || 'Foto ampliada';
    if (modalCaption) modalCaption.textContent = caption || '';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modalImg && (modalImg.src = '');
    if (modalCaption) modalCaption.textContent = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.photo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      const tag = btn.querySelector('.photo__tag')?.textContent?.trim() || '';
      const alt = img?.alt?.trim();
      const caption = tag ? `${tag} • ${alt || ''}`.trim() : (alt || '');
      if (img) openModal(img, caption);
    });
  });

  if (closeBtn && modal) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Gallery filters (simple)
  const chips = document.querySelectorAll('[data-filter]');
  const photos = document.querySelectorAll('.photo');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      const filter = chip.getAttribute('data-filter');

      photos.forEach((p) => {
        const kind = p.getAttribute('data-kind');
        const show = filter === 'all' || (filter && kind === filter);
        p.style.display = show ? '' : 'none';
      });
    });
  });

  // Contact form -> WhatsApp
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        nome: document.getElementById('nome')?.value?.trim() || '',
        telefone: document.getElementById('telefone')?.value?.trim() || '',
        email: document.getElementById('email')?.value?.trim() || '',
        cidade: document.getElementById('cidade')?.value?.trim() || '',
        servico: document.getElementById('servico')?.value?.trim() || '',
        mensagem: document.getElementById('mensagem')?.value?.trim() || ''
      };

      const msg = [
        'Olá! Gostaria de solicitar um orçamento. 👋',
        '',
        `Nome: ${data.nome}`,
        `Telefone: ${data.telefone}`,
        `E-mail: ${data.email || '-'}`,
        `Cidade: ${data.cidade || '-'}`,
        `Serviço desejado: ${data.servico || '-'}`,
        '',
        'Mensagem:',
        data.mensagem
      ].join('\n');

      const phone = '5569992131686';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();

