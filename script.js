(function () {
  // ====== LOADER ======
  var loader = document.getElementById('loader');
  var pageWrapper = document.getElementById('pageWrapper');

  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) loader.classList.add('hidden');
      if (pageWrapper) pageWrapper.classList.add('loaded');
    }, 400);
  });

  // Fallback: hide loader after 2s even if load event is slow
  setTimeout(function () {
    if (loader) loader.classList.add('hidden');
    if (pageWrapper) pageWrapper.classList.add('loaded');
  }, 2000);

  // ====== CUSTOM CURSOR ======
  var cursorDot = document.getElementById('cursorDot');
  var cursorRing = document.getElementById('cursorRing');
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (cursorDot && cursorRing && !isTouchDevice) {
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = 'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = 'translate(' + (ringX - 20) + 'px, ' + (ringY - 20) + 'px)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    var hoverTargets = document.querySelectorAll('a, button, .btn-resume, .grid-card, .award-ref-card, .interest-tag, .nav-link');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function () {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  // ====== SCROLL PROGRESS BAR ======
  var progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.width = (progress * 100) + '%';
    }, { passive: true });
  }

  // ====== SCROLL TO TOP ======
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== ACTIVE NAV SECTION ======
  var navLinks = document.querySelectorAll('.nav-link[data-section]');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('data-section');
    var section = document.getElementById(id);
    if (section) sections.push({ el: section, link: link });
  });

  if (sections.length > 0) {
    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 200;
      sections.forEach(function (s) {
        if (s.el.offsetTop <= scrollPos && s.el.offsetTop + s.el.offsetHeight > scrollPos) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          s.link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  var menuToggle = document.getElementById('menuToggle');
  var headerNav = document.getElementById('headerNav');
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = headerNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        headerNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ====== STRAPLINE TYPING EFFECT ======
  var straplineEl = document.getElementById('strapline');
  if (straplineEl) {
    var phrases = [
      'Senior Technical Engineer (UI)',
      'Pega Constellation Specialist',
      'Full-Stack Developer',
      'AI & LLM Practitioner',
      'Internal Tools Builder'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function typeStrapline() {
      var current = phrases[phraseIndex];
      if (isDeleting) {
        straplineEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        straplineEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(typeStrapline, typeSpeed);
    }

    setTimeout(typeStrapline, 1500);
  }

  // ====== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ======
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var animateElements = document.querySelectorAll('[data-animate]');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ====== STATS COUNTER ANIMATION ======
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function animateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(animateCount);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) {
    statsObserver.observe(el);
  });

  // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ====== THREE.JS HERO ANIMATION ======
  var canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var hero = document.getElementById('hero');
  var scene = new THREE.Scene();
  scene.position.x = 3;
  var camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(3, 0, 8);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  var orange = new THREE.Color(0xff4500);
  var dimOrange = new THREE.Color(0xff4500);
  var white = new THREE.Color(0xf4f4f4);

  var arcs = [];

  function createArc(radius, tube, rotation, tilt, speed, opacity, color) {
    var thetaLength = Math.PI * (0.6 + Math.random() * 0.5);
    var geo = new THREE.TorusGeometry(radius, tube, 16, 100, thetaLength);
    var mat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = rotation;
    mesh.rotation.y = tilt;
    scene.add(mesh);
    arcs.push({ mesh: mesh, speed: speed, rx: rotation, ry: tilt });
    return mesh;
  }

  createArc(3.0, 0.008, 0.0, 0.0, 0.15, 0.35, orange);
  createArc(2.6, 0.006, 1.2, 0.8, 0.22, 0.25, orange);
  createArc(3.5, 0.005, 0.5, 1.5, 0.18, 0.15, dimOrange);
  createArc(2.2, 0.01, 2.0, 0.3, 0.28, 0.4, orange);
  createArc(4.0, 0.004, 0.8, 2.2, 0.12, 0.08, white);
  createArc(1.8, 0.007, 1.8, 1.0, 0.25, 0.3, orange);
  createArc(3.3, 0.005, 0.3, 0.6, 0.14, 0.12, dimOrange);
  createArc(2.0, 0.009, 2.5, 1.8, 0.32, 0.25, orange);

  var dotCount = 200;
  var dotPositions = new Float32Array(dotCount * 3);
  var dotData = [];

  for (var i = 0; i < dotCount; i++) {
    var ringIdx = Math.floor(Math.random() * arcs.length);
    var arcRadius = [3.0, 2.6, 3.5, 2.2, 4.0, 1.8, 3.3, 2.0][ringIdx];
    var angle = Math.random() * Math.PI * 2;
    var spread = (Math.random() - 0.5) * 0.3;

    dotPositions[i * 3] = (arcRadius + spread) * Math.cos(angle);
    dotPositions[i * 3 + 1] = (arcRadius + spread) * Math.sin(angle) * (Math.random() > 0.5 ? 1 : -0.3);
    dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

    dotData.push({
      ring: ringIdx,
      angle: angle,
      radius: arcRadius + spread,
      speed: 0.002 + Math.random() * 0.008,
      zOff: (Math.random() - 0.5) * 1.5
    });
  }

  var dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));

  var dotMat = new THREE.PointsMaterial({
    color: orange,
    size: 0.025,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true
  });
  var dots = new THREE.Points(dotGeo, dotMat);
  scene.add(dots);

  var pulseGeo = new THREE.RingGeometry(0, 0.3, 32);
  var pulseMat = new THREE.MeshBasicMaterial({
    color: orange,
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide
  });
  var pulse1 = new THREE.Mesh(pulseGeo, pulseMat);
  pulse1.rotation.x = Math.PI * 0.5;
  scene.add(pulse1);

  var pulse2Geo = new THREE.RingGeometry(0, 0.15, 32);
  var pulse2Mat = new THREE.MeshBasicMaterial({
    color: orange,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide
  });
  var pulse2 = new THREE.Mesh(pulse2Geo, pulse2Mat);
  pulse2.rotation.x = Math.PI * 0.5;
  scene.add(pulse2);

  var axisGroup = new THREE.Group();
  var axises = [
    { rx: 0, ry: 0, rz: 0 },
    { rx: Math.PI * 0.35, ry: 0.6, rz: 0 },
    { rx: Math.PI * -0.2, ry: 1.2, rz: 0.4 },
  ];

  axises.forEach(function (a) {
    var g = new THREE.Group();
    g.rotation.x = a.rx;
    g.rotation.y = a.ry;
    g.rotation.z = a.rz;

    var ringGeo = new THREE.TorusGeometry(2.8, 0.003, 8, 100, Math.PI);
    var ringMat = new THREE.MeshBasicMaterial({
      color: white,
      transparent: true,
      opacity: 0.06
    });
    var ringMesh = new THREE.Mesh(ringGeo, ringMat);
    g.add(ringMesh);
    axisGroup.add(g);
  });
  scene.add(axisGroup);

  var mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function onResize() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  var heroVisible = true;
  var heroObserver = new IntersectionObserver(function (entries) {
    heroVisible = entries[0].isIntersecting;
  }, { threshold: 0 });
  if (hero) heroObserver.observe(hero);

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!heroVisible) return;

    var t = clock.getElapsedTime();

    arcs.forEach(function (arc, i) {
      var dir = i % 2 === 0 ? 1 : -1;
      arc.mesh.rotation.y = arc.ry + t * arc.speed * dir;
      arc.mesh.rotation.x = arc.rx + Math.sin(t * 0.1 + i) * 0.05;
    });

    var posArr = dotGeo.attributes.position.array;
    for (var i = 0; i < dotCount; i++) {
      dotData[i].angle += dotData[i].speed;
      posArr[i * 3] = dotData[i].radius * Math.cos(dotData[i].angle);
      posArr[i * 3 + 1] = dotData[i].radius * Math.sin(dotData[i].angle);
      posArr[i * 3 + 2] = dotData[i].zOff + Math.sin(t * 0.5 + i * 0.1) * 0.15;
    }
    dotGeo.attributes.position.needsUpdate = true;

    dots.rotation.y = t * 0.03;
    axisGroup.rotation.y = t * 0.05;

    var pulse = 0.05 + Math.sin(t * 0.8) * 0.03;
    pulseMat.opacity = pulse;
    var s = 1 + Math.sin(t * 0.5) * 0.15;
    pulse1.scale.set(s, s, s);

    var s2 = 1 + Math.sin(t * 0.7 + 1) * 0.2;
    pulse2.scale.set(s2, s2, s2);
    pulse2Mat.opacity = 0.06 + Math.sin(t * 1.2) * 0.06;

    camera.position.x += (mouseX * 0.8 - (camera.position.x - 3)) * 0.015;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.015;
    camera.lookAt(3, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();