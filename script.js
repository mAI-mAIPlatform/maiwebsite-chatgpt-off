// Date stamps
const d = new Date();
document.getElementById('year').textContent = d.getFullYear();
document.getElementById('pubDate').textContent = d.toLocaleDateString('fr-FR', {
  year: 'numeric', month: 'long', day: 'numeric'
});

// Subtle animated gradient dots on a canvas for depth (no frameworks)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w, h, dots;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  dots = Array.from({length: 24}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 40 + Math.random()*120,
    vx: (Math.random()-0.5)*0.4,
    vy: (Math.random()-0.5)*0.4,
    a: 0.08 + Math.random()*0.12
  }));
}
window.addEventListener('resize', resize);
resize();

function loop(){
  ctx.clearRect(0,0,w,h);
  for(const d of dots){
    d.x += d.vx; d.y += d.vy;
    if(d.x<-200||d.x>w+200) d.vx*=-1;
    if(d.y<-200||d.y>h+200) d.vy*=-1;
    const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
    g.addColorStop(0, 'rgba(255,255,255,'+d.a+')');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();
