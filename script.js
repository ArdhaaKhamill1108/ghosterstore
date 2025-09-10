(function(){
  // Neon floating shapes generator
  const bg = document.querySelector('.background');
  const shapes = ['circle','triangle','star'];

  function rand(min,max){return Math.random()*(max-min)+min}

  function createShape(){
    const el = document.createElement('div');
    const size = Math.floor(rand(18,120));
    el.className = 'float-shape';
    // random shape type
    const type = shapes[Math.floor(Math.random()*shapes.length)];
    el.dataset.type = type;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = rand(-10,100) + '%';
    el.style.top = rand(-10,90) + '%';
    el.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,243,160,0.95), rgba(255,159,59,0.22))';
    el.style.zIndex = 1;
    el.style.opacity = rand(0.25,0.9);
    el.style.transform = rotate(${rand(0,360)}deg);

    // special shapes
    if(type === 'triangle'){
      // make a triangle via clip-path
      el.style.background = 'linear-gradient(180deg, rgba(255,243,160,0.95), rgba(255,159,59,0.18))';
      el.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      el.style.borderRadius = '4px';
    }
    if(type === 'star'){
      // use an SVG star as background
      el.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,243,160,0.98), rgba(255,159,59,0.2))';
      el.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    }

    // animation
    const dur = rand(18,38);
    el.style.transition = transform ${dur}s linear, top ${dur}s linear, left ${dur}s linear, opacity 6s ease-in-out;

    bg.appendChild(el);

    // slowly move to a new random position
    setTimeout(()=>moveShape(el),50);

    // remove after long time to avoid DOM bloat
    setTimeout(()=>{if(el.parentNode) el.parentNode.removeChild(el)}, 60000);
  }

  function moveShape(el){
    if(!el) return;
    el.style.left = rand(-8,100)+'%';
    el.style.top = rand(-8,95)+'%';
    el.style.opacity = rand(0.2,0.9);
    el.style.transform = rotate(${rand(0,360)}deg) translateY(${rand(-40,40)}px);
    // repeat movement
    const t = rand(8000,26000);
    setTimeout(()=>moveShape(el), t);
  }

  // create an initial burst, then occasional new shapes
  for(let i=0;i<12;i++) createShape();
  setInterval(()=>{
    if(document.hidden) return; // avoid work when tab hidden
    createShape();
  }, 2500);

  // Simple buy button behaviour (placeholder)
  document.addEventListener('click', function(e){
    const btn = e.target.closest('button[data-app]');
    if(!btn) return;
    const app = btn.dataset.app;
    const isMonth = btn.classList.contains('outline');
    const durText = isMonth ? 'Perbulan' : 'Perminggu';
    alert(`Kamu memilih ${app} (${durText}).\n
Silakan lanjut ke proses pembayaran (fitur demo).`);
  });

})();