(() => {
  "use strict";
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => Array.from(root.querySelectorAll(s));
  let platform = new URLSearchParams(window.location.search).get('platform') === 'xbox' ? 'xbox' : 'ps5';

  function setPlatform(value) {
    platform = value === 'xbox' ? 'xbox' : 'ps5';
    $$('[data-platform]').forEach(el => {
      const active = el.dataset.platform === platform;
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    });
    const heroCover = $('.cover-corner');
    if (heroCover) heroCover.innerHTML = platform === 'ps5' ? 'PLAYSTATION 5 <span class="platform-cover-dot">●</span>' : 'XBOX SERIES X|S <span class="platform-cover-dot">●</span>';
    $$('[data-order]').forEach(el => {
      const edition = el.dataset.order;
      el.href = 'checkout.html?platform=' + platform + '&edition=' + edition;
    });
    const box = $('.format-button');
    if (box) box.href = 'checkout.html?platform=' + platform + '&edition=standard&fulfillment=box';
    $$('.platform-group .selector-caption').forEach(el => {el.textContent = platform === 'ps5' ? '01 / 02' : '02 / 02';});
  }
  $$('[data-platform]').forEach(el => el.addEventListener('click', () => setPlatform(el.dataset.platform)));
  setPlatform(platform);

  const menu = $('#menuToggle');
  const nav = $('#mainNav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    $$('a',nav).forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
    }));
  }

  const searchToggle = $('#searchToggle'), searchPanel = $('#searchPanel'), searchClose = $('#searchClose');
  function closeSearch(){ if(searchPanel) searchPanel.hidden = true; }
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', e => {e.stopPropagation();searchPanel.hidden = !searchPanel.hidden;});
    searchClose.addEventListener('click',closeSearch);
    $$('.quick-panel>a').forEach(a=>a.addEventListener('click',closeSearch));
    document.addEventListener('click',e=>{if(!searchPanel.hidden && !searchPanel.contains(e.target) && !searchToggle.contains(e.target)) closeSearch();});
  }
  document.addEventListener('keydown',e=>{
    if(e.key === 'Escape') closeSearch();
  });

  const videoDialog = $('#videoDialog');
  const videoContainer = $('#videoContainer');
  function openVideo(id) {
    if(!videoDialog || !videoContainer || !/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    videoContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
    iframe.title = 'Official Rockstar Games video';
    iframe.loading = 'eager';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);
    videoDialog.showModal();
  }
  $$('[data-video]').forEach(el => el.addEventListener('click', () => openVideo(el.dataset.video)));
  const heroTrailer = $('#heroTrailer');
  if(heroTrailer) heroTrailer.addEventListener('click',()=>openVideo('rz1B4B2yBZY'));
  function closeVideo(){ if(videoDialog && videoDialog.open) videoDialog.close(); }
  const videoClose = $('#videoClose');
  if(videoClose) videoClose.addEventListener('click',closeVideo);
  if(videoDialog){
    videoDialog.addEventListener('close',()=>{if(videoContainer) videoContainer.innerHTML='';});
    videoDialog.addEventListener('click',e=>{if(e.target===videoDialog) closeVideo();});
  }

  const gallery = $('#galleryViewport');
  const prev = $('#galleryPrev'), next=$('#galleryNext');
  function slideGallery(direction){
    if(gallery) gallery.scrollBy({left:direction * Math.min(gallery.clientWidth * .73, 700),behavior:'smooth'});
  }
  if(prev) prev.addEventListener('click',()=>slideGallery(-1));
  if(next) next.addEventListener('click',()=>slideGallery(1));
  const imageDialog = $('#imageDialog'), lightbox = $('#lightboxImage'), caption=$('#lightboxCaption');
  $$('.gallery-img').forEach(el=>el.addEventListener('click',()=>{
    if(!imageDialog || !lightbox) return;
    const img = $('img',el);
    if(!img) return;
    lightbox.src=img.currentSrc||img.src;
    lightbox.alt=img.alt;
    if(caption) caption.textContent='ROCKSTAR GAMES / ' + (el.dataset.caption||'OFFICIAL SCREENSHOT').toUpperCase();
    imageDialog.showModal();
  }));
  const imageClose = $('#imageClose');
  if(imageClose) imageClose.addEventListener('click',()=>imageDialog.close());
  if(imageDialog)imageDialog.addEventListener('click',e=>{if(e.target===imageDialog) imageDialog.close();});

  $$('.detail-expand').forEach(btn=>btn.addEventListener('click',()=>{
    const target = document.getElementById(btn.dataset.target);
    if(!target) return;
    target.hidden=!target.hidden;
    btn.setAttribute('aria-expanded',String(!target.hidden));
    const symbol=$('span',btn);
    if(symbol) symbol.textContent=target.hidden?'+':'−';
  }));

  const anchors=$$('.section-nav-inner a');
  if('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{
      const best=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(best) anchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+best.target.id));
    },{rootMargin:'-185px 0px -55% 0px',threshold:[0,.1,.4,.8]});
    ['game-details','trailers','screenshots','compare-editions','questions'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el);});
  }
  const year = $('#year');
  if(year) year.textContent = String(new Date().getFullYear());
  $$('img').filter(img=>img.src && img.src.includes('images.ctfassets.net')).forEach(img=>{
    img.addEventListener('error',()=>{
      if(!img.dataset.fallbackUsed){
        img.dataset.fallbackUsed='true';
        img.src='assets/neon-city-original.webp';
        img.style.objectFit='cover';
      }
    });
  });
})();