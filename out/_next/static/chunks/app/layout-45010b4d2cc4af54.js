(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{9599:function(e,t,n){Promise.resolve().then(n.bind(n,3728)),Promise.resolve().then(n.t.bind(n,2445,23))},3728:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r}});var i=n(7437),o=n(2265);function r(){let[e,t]=(0,o.useState)(!1),[n,r]=(0,o.useState)(!1),a=(0,o.useRef)(null),s=(0,o.useRef)();return((0,o.useEffect)(()=>{{let e=window.location.hostname;if(e.includes("github.io")||"localhost"===e){t(!0);let n=a.current;if(!n)return;let i=n.getContext("2d");if(!i)return;n.width=window.innerWidth,n.height=window.innerHeight;let o=n.width/2,u=n.height/2,l="Sooyoung♥Jungho",d=l.split("").map((e,t)=>({char:e,x:o+(Math.random()-.5)*n.width,y:u+(Math.random()-.5)*n.height,targetX:o-20*l.length/2+20*t,targetY:u,speed:.05})),c=()=>{i&&(i.clearRect(0,0,n.width,n.height),i.font="bold 3rem MadeKenfolg",i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle",d.forEach(e=>{e.x+=(e.targetX-e.x)*e.speed,e.y+=(e.targetY-e.y)*e.speed,i.fillText(e.char,e.x,e.y)}),s.current=requestAnimationFrame(c))};return c(),setTimeout(()=>{e.includes("github.io")?window.location.replace("https://sooyoung-jungho-wedding.netlify.app"+window.location.pathname):(r(!0),setTimeout(()=>{t(!1)},500))},2e3),()=>{s.current&&cancelAnimationFrame(s.current)}}}},[]),e)?(0,i.jsx)("div",{style:{position:"fixed",inset:0,background:"linear-gradient(-45deg, #0a2815, #1a4031, #204c3d, #2d5c46)",backgroundSize:"400% 400%",zIndex:9999,animation:"gradient 3s ease infinite",opacity:n?0:1,transition:"opacity 0.5s ease-out"},children:(0,i.jsx)("canvas",{ref:a,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}})}):null}},2445:function(){}},function(e){e.O(0,[971,69,744],function(){return e(e.s=9599)}),_N_E=e.O()}]);