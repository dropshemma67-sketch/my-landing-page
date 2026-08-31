/* MAERK — interacciones del tema */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Evita registrar el mismo listener dos veces cuando el personalizador
     de Shopify vuelve a montar una sección. */
  function once(el, key) {
    var flag = 'maerk' + key;
    if (el.dataset[flag]) return false;
    el.dataset[flag] = '1';
    return true;
  }

  /* ---------- Revelado al hacer scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
        setTimeout(function () { entry.target.classList.add('is-in'); }, delay * 1000);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header pegajoso ---------- */
  function initHeader() {
    var hdr = document.querySelector('[data-header]');
    if (!hdr) return;
    var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 20); };
    onScroll();
    if (once(hdr, 'Scroll')) window.addEventListener('scroll', onScroll, { passive: true });

    var burger = document.querySelector('[data-burger]');
    var menu = document.querySelector('[data-mobile-nav]');
    if (burger && menu && once(burger, 'Burger')) {
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        menu.classList.toggle('is-open', !open);
        document.body.style.overflow = !open ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          burger.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ---------- Parallax suave del hero ---------- */
  function initParallax() {
    if (reduced) return;
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;
    var ticking = false;
    if (!once(document.body, 'Parallax')) return;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        layers.forEach(function (el) {
          var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
          el.style.transform = 'translate3d(0,' + (y * speed).toFixed(2) + 'px,0)';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Contadores animados ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
        var start = null;
        var dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Galería ---------- */
  function initGallery() {
    document.querySelectorAll('[data-gallery]').forEach(function (root) {
      var main = root.querySelector('[data-gallery-main]');
      var thumbs = root.querySelectorAll('[data-gallery-thumb]');
      if (!main || !thumbs.length) return;
      thumbs.forEach(function (btn) {
        if (!once(btn, 'Thumb')) return;
        btn.addEventListener('click', function () {
          var src = btn.getAttribute('data-src');
          if (!src) return;
          main.style.opacity = '0';
          setTimeout(function () {
            main.src = src;
            main.srcset = btn.getAttribute('data-srcset') || '';
            main.style.opacity = '1';
          }, 160);
          thumbs.forEach(function (t) { t.classList.remove('is-active'); });
          btn.classList.add('is-active');
        });
      });
      main.style.transition = 'opacity .3s ease';
    });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    document.querySelectorAll('[data-faq-q]').forEach(function (btn) {
      if (!once(btn, 'Faq')) return;
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq__item');
        var open = item.classList.contains('is-open');
        var group = btn.closest('[data-faq]');
        if (group) {
          group.querySelectorAll('.faq__item').forEach(function (i) {
            i.classList.remove('is-open');
            var q = i.querySelector('[data-faq-q]');
            if (q) q.setAttribute('aria-expanded', 'false');
          });
        }
        item.classList.toggle('is-open', !open);
        btn.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ---------- Selector de pack ---------- */
  function initPacks() {
    document.querySelectorAll('[data-packs]').forEach(function (group) {
      var packs = group.querySelectorAll('.pack');
      packs.forEach(function (pack) {
        var input = pack.querySelector('input[type="radio"]');
        if (input && input.checked) pack.classList.add('is-active');
        if (!once(pack, 'Pack')) return;
        pack.addEventListener('click', function () {
          if (input) input.checked = true;
          packs.forEach(function (p) { p.classList.remove('is-active'); });
          pack.classList.add('is-active');
          var form = group.closest('form');
          if (form && input) {
            var hid = form.querySelector('[data-quantity-input]');
            if (hid) hid.value = input.getAttribute('data-qty') || '1';
            var vid = form.querySelector('[data-variant-input]');
            if (vid && input.getAttribute('data-variant')) vid.value = input.getAttribute('data-variant');
          }
          group.dispatchEvent(new CustomEvent('pack:change', { bubbles: true, detail: { pack: pack } }));
        });
      });
    });
  }

  /* ---------- CTA fija en móvil ---------- */
  function initStickyCta() {
    var bar = document.querySelector('[data-sticky-cta]');
    if (!bar) return;
    var anchor = document.querySelector('[data-sticky-anchor]');
    var show = function () {
      var past = anchor ? anchor.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      bar.classList.toggle('is-visible', past || window.scrollY > 600);
    };
    show();
    if (once(bar, 'Sticky')) window.addEventListener('scroll', show, { passive: true });
  }

  /* ---------- Formulario contraentrega ---------- */
  function initCod() {
    document.querySelectorAll('[data-cod-form]').forEach(function (form) {
      if (!once(form, 'Cod')) return;
      var btn = form.querySelector('[data-cod-submit]');
      var status = form.querySelector('[data-cod-status]');

      function setError(field, msg) {
        var wrap = field.closest('.field');
        if (!wrap) return;
        wrap.classList.add('has-error');
        var err = wrap.querySelector('.field__err');
        if (err) err.textContent = msg;
      }
      function clearError(field) {
        var wrap = field.closest('.field');
        if (wrap) wrap.classList.remove('has-error');
      }
      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        f.addEventListener('input', function () { clearError(f); });
        f.addEventListener('change', function () { clearError(f); });
      });

      function validate() {
        var ok = true;
        form.querySelectorAll('[data-required]').forEach(function (f) {
          var val = (f.value || '').trim();
          clearError(f);
          if (!val) { setError(f, 'Completa este campo'); ok = false; return; }
          if (f.getAttribute('data-type') === 'phone') {
            var digits = val.replace(/\D/g, '');
            if (digits.length < 9) { setError(f, 'Ingresa un celular válido de 9 dígitos'); ok = false; }
          }
          if (f.getAttribute('data-type') === 'text' && val.length < 3) {
            setError(f, 'Muy corto, revísalo por favor'); ok = false;
          }
        });
        return ok;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (status) { status.className = 'cod__status'; status.textContent = ''; }

        if (!validate()) {
          var bad = form.querySelector('.field.has-error input, .field.has-error select');
          if (bad) { bad.focus(); bad.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); }
          return;
        }

        var variantId = form.querySelector('[data-variant-input]');
        var qtyInput = form.querySelector('[data-quantity-input]');
        var mode = form.getAttribute('data-cod-mode') || 'checkout';

        var props = {};
        form.querySelectorAll('[data-prop]').forEach(function (f) {
          var val = (f.value || '').trim();
          if (val) props[f.getAttribute('data-prop')] = val;
        });
        props['Forma de pago'] = 'Contraentrega (pago al recibir)';

        if (mode === 'whatsapp') {
          var phone = form.getAttribute('data-wa-number') || '';
          var lines = ['Hola MAERK, quiero pedir el Corrector de Postura contraentrega.', ''];
          Object.keys(props).forEach(function (k) { lines.push(k + ': ' + props[k]); });
          lines.push('Cantidad: ' + (qtyInput ? qtyInput.value : '1'));
          window.open('https://wa.me/' + phone.replace(/\D/g, '') + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
          return;
        }

        if (!variantId || !variantId.value) {
          if (status) { status.className = 'cod__status is-error'; status.textContent = 'Conecta un producto a esta sección desde el personalizador de Shopify para recibir pedidos.'; }
          return;
        }

        if (btn) btn.classList.add('is-loading');

        fetch(window.Shopify && window.Shopify.routes ? window.Shopify.routes.root + 'cart/add.js' : '/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            items: [{
              id: Number(variantId.value),
              quantity: Number(qtyInput ? qtyInput.value : 1) || 1,
              properties: props
            }]
          })
        })
          .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
          .then(function (res) {
            if (!res.ok) throw new Error(res.data.description || res.data.message || 'No se pudo agregar el producto');
            if (status) { status.className = 'cod__status is-ok'; status.textContent = '¡Listo! Te llevamos a confirmar tu pedido…'; }
            window.location.href = (window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : '/') + 'checkout';
          })
          .catch(function (err) {
            if (btn) btn.classList.remove('is-loading');
            if (status) { status.className = 'cod__status is-error'; status.textContent = err.message || 'Ocurrió un error. Intenta otra vez o escríbenos por WhatsApp.'; }
          });
      });
    });
  }

  /* ---------- Init ---------- */
  function boot() {
    initHeader(); initReveal(); initParallax(); initCounters();
    initGallery(); initFaq(); initPacks(); initStickyCta(); initCod();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* Re-inicializar dentro del personalizador de Shopify */
  document.addEventListener('shopify:section:load', boot);
  document.addEventListener('shopify:section:select', boot);
})();
