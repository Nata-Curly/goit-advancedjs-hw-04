var x=Object.defineProperty;var S=(t,e,o)=>e in t?x(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var f=(t,e,o)=>S(t,typeof e!="symbol"?e+"":e,o);import{a as g,S as w,i as n}from"./assets/vendor-D73Uttp0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const P="35898178-628df3d5ceb1661a68afdf1ae";g.defaults.baseURL="https://pixabay.com/api/";async function p({query:t,page:e,perPage:o}){return(await g.get("",{params:{key:P,q:t,page:e,per_page:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}function y(t){return t.map(({webformatURL:e,largeImageURL:o,tags:s,likes:r,views:a,comments:l,downloads:v})=>`<li class="gallery-item">
  <a class="gallery-link" href="${o}">
    <img class="gallery-image" src="${e}" alt="${s}" />
    <div class="info">
         <p class="info-item"><b>Likes</b> ${r}</p>
          <p class="info-item"><b>Views</b> ${a}</p>
          <p class="info-item"><b>Comments</b> ${l}</p>
          <p class="info-item"><b>Downloads</b> ${v}</p>
          </div>
  </a>
</li>`).join("")}const d=class d{constructor(e){this.button=e,this.prevText=""}disable(){this.button.disabled=!0}enable(){this.button.disabled=!1}hide(){this.button.classList.add(d.HIDDEN_CLASS)}show(){this.button.classList.remove(d.HIDDEN_CLASS)}setLoading(){this.disable(),this.prevText=this.button.textContent,this.button.textContent="Loading..."}setNorman(){this.button.textContent=this.prevText,this.enable()}};f(d,"HIDDEN_CLASS","is-hidden");let m=d;const b=new w(".gallery a",{captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250,enableKeyboard:!0,animationSlide:!0,overlay:!0}),D=document.querySelector(".search-form"),u=document.querySelector(".gallery"),h=document.querySelector(".load-more"),c=new m(h),i={page:1,per_page:20,maxPage:1,query:""};console.log(i);function E(){u.innerHTML='<div class="loader"></div>'}D.addEventListener("submit",H);async function H(t){t.preventDefault(),c.hide(),i.page=1;const e=t.currentTarget,o=e.elements.query.value.trim();if(E(),o===""){e.reset(),n.warning({title:"Warning",message:"You should enter something to start the search!"});return}i.query=o;try{const s=await p(i);if(console.log(s),s.total===0){u.innerHTML="",n.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"});return}i.maxPage=Math.ceil(s.totalHits/i.per_page),console.log(i),u.innerHTML=y(s.hits),n.success({title:"OK",message:`Hooray! We found ${s.totalHits} photos of ${o.trim()}.`}),b.refresh(),i.maxPage>i.page&&(c.show(),h.addEventListener("click",L))}catch(s){n.error({title:"Error",message:s.message})}finally{e.reset()}}async function L(){c.setLoading(),i.page+=1;try{const t=await p(i),e=y(t.hits);u.insertAdjacentHTML("beforeend",e),b.refresh(),window.scrollBy({top:560,behavior:"smooth"}),c.setNorman(),i.maxPage===i.page&&(c.hide(),h.removeEventListener("click",L),n.info({title:"Info!",message:"We're sorry, but you've reached the end of search results."}))}catch(t){n.error({title:"Error",message:t.message})}}
//# sourceMappingURL=index.js.map
