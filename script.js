    /* ==== HAMBURGER ==== */
    function toggleM() {
      const m = document.getElementById('mobMenu'), b = document.getElementById('hamBtn');
      const open = m.classList.toggle('open');
      b.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function closeM() {
      document.getElementById('mobMenu').classList.remove('open');
      document.getElementById('hamBtn').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('mobMenu').addEventListener('click', function (e) { if (e.target === this) closeM(); });

    /* ==== CURSOR (real pointer devices only) ==== */
    const hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (hasFinePointer) {
      const cd = document.getElementById('cur'), cr = document.getElementById('cur-ring');
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cd.style.left = mx + 'px'; cd.style.top = my + 'px'; });
      (function loop() { rx += (mx - rx) * .12; ry += (my - ry) * .12; cr.style.left = rx + 'px'; cr.style.top = ry + 'px'; requestAnimationFrame(loop); })();
      document.querySelectorAll('a,button,.pcard,.hcard,.ccloud,.certcard,.pill,.citem').forEach(el => {
        el.addEventListener('mouseenter', () => { cr.style.width = '56px'; cr.style.height = '56px'; cr.style.borderColor = 'rgba(255,77,109,.6)'; cd.style.background = 'var(--c1)'; cd.style.width = '12px'; cd.style.height = '12px'; });
        el.addEventListener('mouseleave', () => { cr.style.width = '38px'; cr.style.height = '38px'; cr.style.borderColor = 'rgba(0,217,192,.45)'; cd.style.background = 'var(--c3)'; cd.style.width = '10px'; cd.style.height = '10px'; });
      });
    }

    /* ==== 3D AVATAR (desktop only) ==== */
    if (window.innerWidth > 1024) {
      const card = document.getElementById('avCard'), shine = document.getElementById('avShine'), hero = document.getElementById('hero');
      if (card && hero) {
        hero.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          card.style.transform = `perspective(800px) rotateX(${-dy * 13}deg) rotateY(${dx * 13}deg) scale3d(1.03,1.03,1.03)`;
          shine.style.background = `radial-gradient(circle at ${50 + dx * 30}% ${50 + dy * 30}%,rgba(255,255,255,.14),transparent 60%)`;
        });
        hero.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
          shine.style.background = 'radial-gradient(circle at 50% 30%,rgba(255,255,255,.08),transparent 60%)';
        });
      }
    }

    /* ==== SCROLL REVEAL ==== */
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }); }, { threshold: 0.07 });
    document.querySelectorAll('.rev').forEach(el => obs.observe(el));

    /* ==== ACTIVE NAV ==== */
    const secs = document.querySelectorAll('section[id]'), navAs = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let cur = '';
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 260) cur = s.id; });
      navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--tx)' : ''; });
    }, { passive: true });

    /* ==== FORMSPREE CONTACT FORM ==== */
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // If Formspree ID not set yet, show instructions
      if (form.action.includes('YOUR_FORM_ID')) {
        msg.className = 'form-msg err';
        msg.textContent = '⚠️ Form not connected yet. See setup instructions below the website.';
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Sending...';
      msg.className = 'form-msg';
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          msg.className = 'form-msg ok';
          msg.textContent = '✅ Message sent! Pradip will reply within 24 hours.';
          btn.textContent = '✓ Sent!';
          form.reset();
          setTimeout(() => { btn.disabled = false; btn.textContent = 'Send Message →'; }, 4000);
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        msg.className = 'form-msg err';
        msg.textContent = '❌ Something went wrong. Please email directly: parmarpradip1211@gmail.com';
        btn.disabled = false;
        btn.textContent = 'Send Message →';
      }
    });
