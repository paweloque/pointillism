import { state } from './state.js';

/**
 * Convert an image element to a base64 data URI.
 */
function imageToBase64(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return c.toDataURL('image/jpeg', 0.85);
}

/**
 * Generate a self-contained HTML string that renders the dot effect.
 * Embeds the source image as base64 and bakes current state as constants.
 */
export function generateExportHTML(img) {
  const dataUri = imageToBase64(img);
  const s = { ...state };

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
const CONFIG=${JSON.stringify({
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
  lightBackground: false,
})};
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
const sx=(iw-sw)*CONFIG.focalX,sy=(ih-sh)*CONFIG.focalY;
oc.drawImage(img,sx,sy,sw,sh,0,0,W,H);
return oc.getImageData(0,0,W,H);
}

function sample(img){
const id=coverFit(img);const d=id.data;dots=[];
let stride=CONFIG.stride;
const cc=Math.ceil(W/stride)*Math.ceil(H/stride);
if(cc>MAX_P){stride=Math.ceil(Math.sqrt(W*H/MAX_P));if(stride<CONFIG.stride)stride=CONFIG.stride}
const lb=CONFIG.lightBackground;
for(let y=0;y<H;y+=stride){for(let x=0;x<W;x+=stride){
const i=(y*W+x)*4;const r=d[i],g=d[i+1],b=d[i+2];
const br=(r*0.299+g*0.587+b*0.114)/255;
if(lb){if(br>1-CONFIG.threshold)continue}else{if(br<CONFIG.threshold)continue}
dots.push({ox:x,oy:y,x,y,r,g,b,size:CONFIG.baseSize+br*CONFIG.sizeScaling,alpha:0.4+br*0.6});
}}
}

function hexRgb(h){let s=h.replace("#","");if(s.length===3)s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];const v=parseInt(s,16);return[(v>>16)&255,(v>>8)&255,v&255]}

function draw(){
ctx.fillStyle=CONFIG.bgColor;ctx.fillRect(0,0,W,H);
const tR=CONFIG.tintColor&&CONFIG.tintBlend>0?hexRgb(CONFIG.tintColor):null;
const bl=tR?CONFIG.tintBlend/100:0;
for(let i=0;i<dots.length;i++){
const d=dots[i];
ctx.globalAlpha=d.alpha;
let cr=d.r,cg=d.g,cb=d.b;
if(tR){const inv=1-bl;cr=Math.round(cr*inv+tR[0]*bl);cg=Math.round(cg*inv+tR[1]*bl);cb=Math.round(cb*inv+tR[2]*bl)}
if(CONFIG.dotShape==="square"){
ctx.fillStyle="rgb("+cr+","+cg+","+cb+")";
const s=d.size*2;ctx.fillRect(d.x-d.size,d.y-d.size,s,s);
}else{
ctx.fillStyle="rgb("+cr+","+cg+","+cb+")";
ctx.beginPath();ctx.arc(d.x,d.y,d.size,0,6.2832);ctx.fill();
}
}
ctx.globalAlpha=1;
}

function animate(){
requestAnimationFrame(animate);
const ea=CONFIG.mouseEasing,rad=CONFIG.mouseRadius,str=CONFIG.mouseStrength;
for(let i=0;i<dots.length;i++){
const d=dots[i];d.x+=(d.ox-d.x)*ea;d.y+=(d.oy-d.y)*ea;
const dx=d.ox-mouse.x,dy=d.oy-mouse.y;
const dist=Math.sqrt(dx*dx+dy*dy);
if(dist<rad&&dist>0){const f=(1-dist/rad)*str;d.x+=(d.ox+dx/dist*f-d.x)*ea;d.y+=(d.oy+dy/dist*f-d.y)*ea}
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

/**
 * Trigger download of the export HTML.
 */
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
