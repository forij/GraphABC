var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//logo.classList.add('animate');
Options.style.cssText = "transition-property: margin-left;transition-duration: 1s;transition-timing-function: linear;";
Options.style.marginLeft = 'calc(50% - 10px)';
document.getElementById('mode').value = 1;
//import_js('exampl_1.js');
if(!mass_active){
    mass_next_reb_output.style.visibility = 'hidden';
    mass_next_reb_output.innerHTML = def_mass;
}

function addScript(src){
  var script = document.createElement('script');
  script.src = src;
  script.async = false; // чтобы гарантировать порядок
  document.head.appendChild(script);
}

import_js('exampl_1.js');
