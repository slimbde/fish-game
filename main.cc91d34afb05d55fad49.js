!function(t){function e(e){for(var r,a,h=e[0],o=e[1],l=e[2],c=0,u=[];c<h.length;c++)a=h[c],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&u.push(n[a][0]),n[a]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);for(f&&f(e);u.length;)u.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],r=!0,h=1;h<i.length;h++){var o=i[h];0!==n[o]&&(r=!1)}r&&(s.splice(e--,1),t=a(a.s=i[0]))}return t}var r={},n={0:0},s=[];function a(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=r,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(i,r,function(e){return t[e]}.bind(null,r));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p=".";var h=window.webpackJsonp=window.webpackJsonp||[],o=h.push.bind(h);h.push=e,h=h.slice();for(var l=0;l<h.length;l++)e(h[l]);var f=o;s.push([121,1]),i()}({121:function(t,e,i){i(122),t.exports=i(309)},308:function(t,e,i){},309:function(t,e,i){"use strict";i.r(e);i(308);var r=document.getElementById("canvas"),n=r.getContext("2d");r.width=700,r.height=500,Date.prototype.addHours=function(t){return this.setHours(this.getHours()+t),this};var s=function(t){n.clearRect(0,0,r.width,r.height),n.beginPath(),n.fillStyle="white",n.font="".concat(r.width/50,"px Georgia"),n.fillText("by Grigoriy Dolgiy © 2022",r.width/2+150,r.height/3+25),n.closePath(),n.beginPath(),n.fillStyle="white",n.font="".concat(r.width/10,"px Georgia"),n.strokeStyle="black",n.lineWidth=2,n.fillText("BUBBLES",r.width/2,r.height/2),n.strokeText("BUBBLES",r.width/2,r.height/2),n.closePath(),n.beginPath(),n.fillStyle="black",n.font="".concat(r.width/30,"px Georgia"),n.fillText("to begin a new game",r.width/2,r.height/2+25),n.fillText("click the screen",r.width/2,r.height/2+47),n.closePath(),r.onclick=function(){return t(r)}},a={x:r.width/4,y:r.height/2,click:!1};function h(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}r.addEventListener("mousedown",(function(t){a.x=t.offsetX,a.y=t.offsetY,a.click=!0})),r.addEventListener("mouseup",(function(t){a.click=!1}));var o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=0,this.y=r.height/2,this.angle=0,this.frame=0,this.frameSign=1,this.minFrame=0,this.maxFrame=11,this.spriteWidth=498,this.spriteHeight=327,this.scale=.2,this.width=this.spriteWidth*this.scale,this.height=this.spriteHeight*this.scale,this.radius=this.width/2.5,this.imgLeft=new Image,this.imgLeft.src="/img/sweem.png",this.imgRight=new Image,this.imgRight.src="/img/sweem-flipped.png"}var e,i,s;return e=t,(i=[{key:"getFramePosition",value:function(t){return{frameX:Math.round(t)%4,frameY:Math.floor(t/4)}}},{key:"update",value:function(){var t=this.x-a.x,e=this.y-a.y;a.click&&(this.angle=Math.atan2(e,t));var i=Math.PI;a.click||(this.angle>0&&this.angle<i/2&&(this.angle-=.005),this.angle>i/2&&this.angle<i&&(this.angle+=.005),this.angle<0&&this.angle>-i/2&&(this.angle+=.005),this.angle<0&&this.angle>-i&&this.angle<-i/2&&(this.angle-=.005)),a.x!==this.x&&(this.x-=t/10),a.y!==this.y&&(this.y-=e/10)}},{key:"draw",value:function(t){this.update(),t%12==0&&++this.frame,12===this.frame&&(this.frame=0);var e=this.getFramePosition(this.frame),i=e.frameX,s=e.frameY;n.clearRect(0,0,r.width,r.height),n.save(),n.translate(this.x,this.y),n.rotate(this.angle||Math.PI),n.drawImage(this.x<a.x?this.imgRight:this.imgLeft,i*this.spriteWidth,s*this.spriteHeight,this.spriteWidth,this.spriteHeight,0-this.scale*this.spriteWidth/2,0-this.scale*this.spriteHeight/2,this.width,this.height),n.restore()}}])&&h(e.prototype,i),s&&h(e,s),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=Math.random()*r.width,this.y=r.height+100,this.speed=5*Math.random()+1,this.distance=0,this.dispose=!1,this.sound=new Audio("/sound/bubble".concat(Math.random()<.5?1:2,".mp3")),this.sound.volume=.5,this.img=new Image,this.img.src=Math.random()<.5?"/img/bubble1.png":"/img/bubble2.png",this.scale=.15,this.spriteWidth=512,this.spriteHeight=512,this.width=this.spriteWidth*this.scale,this.height=this.spriteHeight*this.scale,this.radius=this.width/3,this.frame=0}var e,i,s;return e=t,(i=[{key:"getFramePosition",value:function(t){return{frameX:Math.round(t)%4,frameY:Math.floor(t/4)}}},{key:"update",value:function(t){this.y-=this.speed,this.y<0-2*this.radius&&(this.dispose=!0),Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))<this.radius+t.radius&&(this.distance-=1)}},{key:"draw",value:function(t){this.distance<0&&t%6==0&&++this.frame;var e=this.getFramePosition(this.frame),i=e.frameX,r=e.frameY;n.drawImage(this.img,i*this.spriteWidth,r*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x-this.scale*this.spriteWidth/2,this.y-this.scale*this.spriteHeight/2,this.width,this.height)}}])&&l(e.prototype,i),s&&l(e,s),Object.defineProperty(e,"prototype",{writable:!1}),t}(),c=[],u="",d=0,g=0,p=new AbortController,m=new o,y=!1,w=new Audio("./sound/underwater.mp3");w.volume=.5,w.loop=!0;var b=function t(e){e.signal.aborted||(m.draw(g),d+=function(t,e){var i=0;t%50==0&&c.push(new f);for(var r=0;r<c.length;){var n=c[r];n.dispose?c.splice(r,1):(n.distance<0&&(-1===n.distance&&(n.sound.play(),++i),n.frame>6&&(n.dispose=!0)),n.update(e),n.draw(t),++r)}return i}(g,m),function(t,e,i){n.fillStyle="black",n.font="15px Georgia",n.fillText("player: "+t,10,20),n.fillText((new Date).addHours(5).toISOString().slice(11,19),r.width-70,20),n.font="30px Georgia",n.fillText("score: "+e,10,50),n.fillStyle="red",n.font="20px Georgia",n.fillText("end game",r.width-100,40),i&&(n.strokeStyle="red"),i&&(n.lineWidth=2),i&&n.strokeText("end game",r.width-100,40),e<3&&(n.font="50px Georgia",n.fillStyle="#ffffff85",n.fillText("COLLECT BUBBLES",r.width/5,100));var s=localStorage.getItem("scores");if(s){n.font="15px Georgia",n.fillStyle="white";var a=80;n.fillText("RATING:",10,a),n.fillStyle="yellow";var h=JSON.parse(s);Object.keys(h).forEach((function(t){a+=17,n.fillText("".concat(t,": ").concat(h[t]),10,a)}))}}(u,d,y),++g,requestAnimationFrame((function(){return t(e)})))};0===g&&s((function t(e){for(e.onclick=null;u.length<1;)if(null===(u=prompt("Please introduce yourself..."))){e.onclick=function(){return t(e)},u="";break}u&&(e.onclick=function(e){if(e.offsetX>585&&e.offsetY>25&&e.offsetY<50&&!0===confirm("really end this game?")){var i={},r=localStorage.getItem("scores");r&&(i=JSON.parse(r)),i[u]=d,localStorage.setItem("scores",JSON.stringify(i)),w.pause(),p.abort(),p=new AbortController,g=0,d=0,m=new o,u="",s(t)}},e.onmousemove=function(t){t.offsetX>585&&t.offsetY>25&&t.offsetY<50?(e.style.cursor="pointer",y=!0):(e.style.cursor="default",y=!1)},w.play(),b(p))}))}});