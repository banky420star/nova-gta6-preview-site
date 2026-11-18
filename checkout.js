(() => {
  'use strict';
  const STORE = 'https://x19pam-ct.myshopify.com';
  // Do not switch to true unless verified supplier stock, rights, policies,
  // fulfillment, legitimate product listings and payments are actually live.
  const COMMERCE_READY = false;
  const platformLabel = {ps5:'PlayStation 5',xbox:'Xbox Series X|S'};
  const handles = {
    'ps5-standard-digital':'gta-vi-ps5-standard-digital',
    'ps5-ultimate-digital':'gta-vi-ps5-ultimate-digital',
    'ps5-standard-box':'gta-vi-ps5-standard-code-in-box',
    'xbox-standard-digital':'gta-vi-xbox-standard-digital',
    'xbox-ultimate-digital':'gta-vi-xbox-ultimate-digital',
    'xbox-standard-box':'gta-vi-xbox-standard-code-in-box',
  };
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const initial = new URLSearchParams(location.search);
  for (const field of ['platform','edition','fulfillment']){
    const value = initial.get(field);
    const match = $$('input[name="'+field+'"]').find(x=>x.value===value);
    if(match)match.checked=true;
  }
  function selected(name){return $('input[name="'+name+'"]:checked')?.value || '';}
  function update() {
    const platform = selected('platform');
    const edition = selected('edition');
    let fulfillment=selected('fulfillment');
    const boxOption=$('input[name="fulfillment"][value="box"]');
    if(boxOption){
      boxOption.disabled = edition === 'ultimate';
      boxOption.parentElement.style.opacity=edition==='ultimate'?'.35':'1';
      if(edition==='ultimate' && fulfillment==='box'){
        const digital=$('input[name="fulfillment"][value="digital"]');
        digital.checked=true;fulfillment='digital';
      }
    }
    const handle=handles[platform+'-'+edition+'-'+fulfillment];
    $('#orderTitle').textContent='Grand Theft Auto VI — '+(edition==='ultimate'?'Ultimate':'Standard')+' Edition';
    $('#orderPlatform').textContent=platformLabel[platform]||platform;
    $('#orderDelivery').textContent=fulfillment==='box'?'Physical box with download code, supplier verification pending':'Digital code by email, separate authorization required';
    $('#orderPrice').textContent=(edition==='ultimate'?'R 1,899*':'R 1,499*');
    $('#checkoutStatus').textContent=COMMERCE_READY && handle
      ? 'Continue to the verified product page on Shopify. Shopify will confirm live availability, shipping, taxes and payment.'
      : 'Shopify checks the published product and stock status. This selection cannot be purchased unless a real product is available for sale.';
    const action=$('#continueOrder');
    action.disabled=!(COMMERCE_READY && handle);
    action.innerHTML=COMMERCE_READY && handle?'SELECT IN SHOPIFY STORE <span>↗</span>':'CHECK PRODUCT AVAILABILITY <span>↗</span>';
    action.dataset.shopifyUrl=handle?STORE+'/products/'+encodeURIComponent(handle):'';
    history.replaceState(null,'','?platform='+encodeURIComponent(platform)+'&edition='+encodeURIComponent(edition)+'&fulfillment='+encodeURIComponent(fulfillment));
  }
  $$('input[type="radio"]').forEach(el=>el.addEventListener('change',update));
  $('#continueOrder').addEventListener('click',function(){
    if(!COMMERCE_READY || this.disabled || !this.dataset.shopifyUrl)return;
    location.assign(this.dataset.shopifyUrl);
  });
  update();
})();