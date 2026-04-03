import { state } from './state.js';
import { hexLuminance } from './sampler.js';

function imageToBase64(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return c.toDataURL('image/jpeg', 0.85);
}

export function generateExportHTML(img) {
  const dataUri = imageToBase64(img);
  const s = { ...state };

  const config = JSON.stringify({
    stride: s.stride,
    threshold: s.threshold,
    baseSize: s.dotSize,
    sizeScaling: s.sizeScaling,
    bgColor: s.bgColor,
    dotShape: s.dotShape,
    tintColor: s.tintColor,
    tintBlend: s.tintBlend,
    mouseRadius: s.mouseRadius,
    mouseStrength: s.mouseStrength,
    mouseEasing: s.mouseEasing,
    focalX: s.focalX,
    focalY: s.focalY,
    lightBackground: hexLuminance(s.bgColor) >= 0.5,
    breathing: s.breathing,
    breatheIntensity: s.breatheIntensity,
    sway: s.sway,
    swayIntensity: s.swayIntensity,
    rise: s.rise,
    riseSpeedMultiplier: s.riseSpeedMultiplier,
    escape: s.escape,
    sparkle: s.sparkle,
    sparkleSpeed: s.sparkleSpeed,
    brownian: s.brownian,
    brownianStrength: s.brownianStrength,
    hueRotate: s.hueRotate,
    hueRotateSpeed: s.hueRotateSpeed,
    interactionEnabled: s.interactionEnabled,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>pointilism</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${s.bgColor};overflow:hidden;height:100vh}
canvas{width:100%;height:100%;display:block}
</style>
</head>
<body>
<canvas id="scene"></canvas>
<script>
(function(){
const C=${config};
const MAX_P=50000;
const canvas=document.getElementById("scene");
const ctx=canvas.getContext("2d");
let dots=[],W=0,H=0;
const mouse={x:-9999,y:-9999};
canvas.addEventListener("mousemove",e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
canvas.addEventListener("mouseleave",()=>{mouse.x=-9999;mouse.y=-9999});
canvas.addEventListener("touchmove",e=>{e.preventDefault();const t=e.touches[0];const r=canvas.getBoundingClientRect();mouse.x=t.clientX-r.left;mouse.y=t.clientY-r.top},{passive:false});
canvas.addEventListener("touchend",()=>{mouse.x=-9999;mouse.y=-9999});

function resize(){const r=canvas.getBoundingClientRect();W=Math.round(r.width);H=Math.round(r.height);canvas.width=W;canvas.height=H}

function coverFit(img){
const off=document.createElement("canvas");off.width=W;off.height=H;
const oc=off.getContext("2d");
const iw=img.naturalWidth,ih=img.naturalHeight;
const sc=Math.max(W/iw,H/ih),sw=W/sc,sh=H/sc;
oc.drawImage(img,(iw-sw)*C.focalX,(ih-sh)*C.focalY,sw,sh,0,0,W,H);
return oc.getImageData(0,0,W,H);
}

function sample(img){
const id=coverFit(img);const d=id.data;dots=[];
let stride=C.stride;
const cc=Math.ceil(W/stride)*Math.ceil(H/stride);
if(cc>MAX_P){stride=Math.ceil(Math.sqrt(W*H/MAX_P));if(stride<C.stride)stride=C.stride}
for(let y=0;y<H;y+=stride){for(let x=0;x<W;x+=stride){
const i=(y*W+x)*4;const r=d[i],g=d[i+1],b=d[i+2];
const br=(r*0.299+g*0.587+b*0.114)/255;
if(C.lightBackground){if(br>1-C.threshold)continue}else{if(br<C.threshold)continue}
const e=Math.max(0,1-Math.abs(br-0.5)*1.5);
const u=Math.random(),es=u*u*u,ea=-Math.PI/2+(Math.random()-0.5)*Math.PI*1.2;
dots.push({ox:x,oy:y,x,y,r,g,b,size:C.baseSize+br*C.sizeScaling,alpha:0.4+br*0.6,
bp:Math.random()*6.2832,bf:0.00008+Math.random()*0.0001,
spx:Math.random()*6.2832,spy:Math.random()*6.2832,
sfx:0.00004+Math.random()*0.00006,sfy:0.00003+Math.random()*0.00005,
sax:0.3+e*1.2+Math.random()*0.5,say:0.2+e*0.8+Math.random()*0.4,
rs:0.0008+Math.random()*0.0012,mr:6+Math.random()*14+br*8,ro:Math.random(),
edx:Math.cos(ea)*es*30,edy:Math.sin(ea)*es*22,
ld:4000+Math.random()*8000,lo:Math.random(),
bx:0,by:0
});
}}
}

function hexRgb(h){let s=h.replace("#","");if(s.length===3)s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];const v=parseInt(s,16);return[(v>>16)&255,(v>>8)&255,v&255]}
function rotHue(r,g,b,a){const c=Math.cos(a),s=Math.sin(a);return[Math.max(0,Math.min(255,Math.round(r*(0.213+0.787*c-0.213*s)+g*(0.715-0.715*c-0.715*s)+b*(0.072-0.072*c+0.928*s)))),Math.max(0,Math.min(255,Math.round(r*(0.213-0.213*c+0.143*s)+g*(0.715+0.285*c+0.140*s)+b*(0.072-0.072*c-0.283*s)))),Math.max(0,Math.min(255,Math.round(r*(0.213-0.213*c-0.787*s)+g*(0.715-0.715*c+0.715*s)+b*(0.072+0.928*c+0.072*s))))]}
let hueAng=0;

function draw(){
ctx.fillStyle=C.bgColor;ctx.fillRect(0,0,W,H);
const tR=C.tintColor&&C.tintBlend>0?hexRgb(C.tintColor):null;
const bl=tR?C.tintBlend/100:0;
for(let i=0;i<dots.length;i++){
const d=dots[i];
let a=d.drawAlpha!==undefined?d.drawAlpha:d.alpha;
ctx.globalAlpha=a;
let cr=d.r,cg=d.g,cb=d.b;
if(tR){const inv=1-bl;cr=Math.round(cr*inv+tR[0]*bl);cg=Math.round(cg*inv+tR[1]*bl);cb=Math.round(cb*inv+tR[2]*bl)}
if(hueAng!==0){const h=rotHue(cr,cg,cb,hueAng);cr=h[0];cg=h[1];cb=h[2]}
if(C.dotShape==="soft"){const sr=d.size*2;const gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,sr);gr.addColorStop(0,"rgba("+cr+","+cg+","+cb+","+a+")");gr.addColorStop(1,"rgba("+cr+","+cg+","+cb+",0)");ctx.globalAlpha=1;ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,sr,0,6.2832);ctx.fill()}
else{ctx.fillStyle="rgb("+cr+","+cg+","+cb+")";
if(C.dotShape==="square"){const s=d.size*2;ctx.fillRect(d.x-d.size,d.y-d.size,s,s)}
else if(C.dotShape==="diamond"){ctx.beginPath();ctx.moveTo(d.x,d.y-d.size);ctx.lineTo(d.x+d.size,d.y);ctx.lineTo(d.x,d.y+d.size);ctx.lineTo(d.x-d.size,d.y);ctx.closePath();ctx.fill()}
else if(C.dotShape==="cross"){const arm=d.size*0.35;ctx.fillRect(d.x-d.size,d.y-arm,d.size*2,arm*2);ctx.fillRect(d.x-arm,d.y-d.size,arm*2,d.size*2)}
else{ctx.beginPath();ctx.arc(d.x,d.y,d.size,0,6.2832);ctx.fill()}}
}
ctx.globalAlpha=1;
}

function animate(t){
requestAnimationFrame(animate);
hueAng=C.hueRotate?(t*0.001*C.hueRotateSpeed)%6.2832:0;
const ea=C.mouseEasing;
for(let i=0;i<dots.length;i++){
const d=dots[i];let px=d.ox,py=d.oy,am=1;
if(C.sway){px+=Math.sin(t*d.sfx+d.spx)*d.sax*C.swayIntensity;py+=Math.cos(t*d.sfy+d.spy)*d.say*0.4*C.swayIntensity}
if(C.rise){const rise=(d.ro*d.mr+t*d.rs*C.riseSpeedMultiplier)%d.mr;const p=rise/d.mr;py-=rise;am*=Math.min(1,p*6)*Math.min(1,(1-p)*5);if(C.escape){const ep=Math.max(0,(p-0.65)/0.35);const ec=ep*ep;px+=d.edx*ec;py+=d.edy*ec}}
if(C.breathing){am*=(1-C.breatheIntensity)+C.breatheIntensity*Math.sin(t*d.bf+d.bp)}
if(C.sparkle){const p=(t*C.sparkleSpeed/d.ld+d.lo)%1;am*=p<0.15?p/0.15:p<0.75?1:1-(p-0.75)/0.25}
if(C.brownian){d.bx+=(Math.random()-0.5)*C.brownianStrength;d.by+=(Math.random()-0.5)*C.brownianStrength;d.bx*=0.995;d.by*=0.995;const bd=Math.sqrt(d.bx*d.bx+d.by*d.by);if(bd>8){d.bx*=8/bd;d.by*=8/bd}px+=d.bx;py+=d.by}
d.drawAlpha=d.alpha*am;
d.x+=(px-d.x)*ea;d.y+=(py-d.y)*ea;
if(C.interactionEnabled){const dx=d.ox-mouse.x,dy=d.oy-mouse.y;const dist=Math.sqrt(dx*dx+dy*dy);
if(dist<C.mouseRadius&&dist>0){const f=(1-dist/C.mouseRadius)*C.mouseStrength;d.x+=dx/dist*f*ea;d.y+=dy/dist*f*ea}}
}
draw();
}

const img=new Image();
img.onload=()=>{resize();sample(img);requestAnimationFrame(animate)};
img.src="${dataUri}";
window.addEventListener("resize",()=>{resize();if(img.complete)sample(img)});
})();
<\/script>
</body>
</html>`;
}

export function downloadExport(img) {
  const html = generateExportHTML(img);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pointilism-export.html';
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPNG(canvas) {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pointilism-export.png';
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
