const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;e.disabled=!0,t.addEventListener("click",(function(t){d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!1,t.target.disabled=!e.disabled})),e.addEventListener("click",(function(a){clearInterval(d),t.disabled=!1,e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.b25b3d1e.js.map