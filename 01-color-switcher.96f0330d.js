const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a;t.addEventListener("click",(function(){t.disabled=!0,a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.96f0330d.js.map
