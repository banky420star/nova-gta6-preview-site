(() => {
  'use strict';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const launch = new Date('2026-11-19T00:00:00+02:00').getTime();
  const display = document.querySelector('#launchCounter');
  function tick(){
    if(!display) return;
    const left=Math.max(0,launch-Date.now());
    if(left===0){display.textContent='RELEASE DAY / NOV 19';return;}
    const days=Math.floor(left/86400000);
    const hours=Math.floor((left%86400000)/3600000);
    const minutes=Math.floor((left%3600000)/60000);
    const seconds=Math.floor((left%60000)/1000);
    display.textContent=[days+'D',String(hours).padStart(2,'0')+'H',String(minutes).padStart(2,'0')+'M',String(seconds).padStart(2,'0')+'S'].join(' : ');
  }
  tick();
  setInterval(tick,1000);
  if(reduced || !('IntersectionObserver' in window))return;
  const targets=[
    ...document.querySelectorAll('.section-kicker,.details-copy h2,.details-data,.section-title-row h2,.edition-card,.benefit-notice,.format-card,.upgrade-card,.trailer-card,.faq-list,.final-call-inner,.gallery-footer')
  ];
  targets.forEach(node=>node.classList.add('reveal-on-scroll'));
  document.body.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  },{rootMargin:'0px 0px -7% 0px',threshold:.08});
  targets.forEach(el=>observer.observe(el));
})();
