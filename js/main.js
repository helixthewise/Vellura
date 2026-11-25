// name, price (₹), fabric label, image path  -> edit these to match your products
const P=[
 ["Kasavu Handloom Saree",3499,"Cotton","images/products/product-1.jpg"],
 ["Kuthampully Cotton Saree",2799,"Handloom","images/products/product-2.jpg"],
 ["Zari Tissue Saree",4299,"Tissue","images/products/product-3.jpg"],
 ["Kanjivaram Silk Saree",11999,"Silk","images/products/product-4.jpg"],
 ["Temple Border Saree",3899,"Zari","images/products/product-5.jpg"]
];
const G=["pa","pb","pc","pd","pe"];
const card=(p,i,b)=>`<div class="cd"><div class="im"><div class="ph ${G[i]}"><span>Image</span><img src="${p[3]}" alt="${p[0]}" onerror="this.remove()"></div>${b?'<span class="bs">Bestseller</span>':''}<span class="ht">♡</span></div><div class="ci"><small>${p[2]}</small><h3>${p[0]}</h3><div class="pr"><b>₹${p[1].toLocaleString('en-IN')}</b><em>Handloom</em></div></div></div>`;
document.getElementById('g1').innerHTML=P.map((p,i)=>card(p,i,0)).join('');
document.getElementById('g2').innerHTML=P.slice().reverse().map((p,i)=>card(p,(i+2)%5,1)).join('');

// ---- Reviews carousel: swipe (touch), drag (mouse), arrows, dots, keyboard ----
(function(){
 const t=document.getElementById('rvTrack'); if(!t) return;
 const dots=[...document.querySelectorAll('#rvDots button')];
 const n=dots.length, idx=()=>Math.round(t.scrollLeft/t.clientWidth);
 const go=i=>t.scrollTo({left:Math.max(0,Math.min(n-1,i))*t.clientWidth,behavior:'smooth'});
 const mark=()=>{const i=idx();dots.forEach((d,k)=>d.classList.toggle('on',k===i))};
 t.addEventListener('scroll',mark,{passive:true});
 dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
 document.getElementById('rvPrev').addEventListener('click',()=>go(idx()-1));
 document.getElementById('rvNext').addEventListener('click',()=>go(idx()+1));
 t.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(idx()+1);if(e.key==='ArrowLeft')go(idx()-1)});
 let down=false,sx=0,sl=0,si=0;
 t.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;sx=e.clientX;sl=t.scrollLeft;si=idx();t.classList.add('drag')});
 window.addEventListener('pointermove',e=>{if(down)t.scrollLeft=sl-(e.clientX-sx)});
 window.addEventListener('pointerup',e=>{if(!down)return;down=false;t.classList.remove('drag');const d=e.clientX-sx;go(si+(d<-40?1:d>40?-1:0))});
 window.addEventListener('resize',()=>go(idx()));
})();
