//_init_.js
{
  function init_script(src){
    let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = false;
    return script;
  }

  document.head.appendChild(init_script('scripts/terminal.js'));
  document.head.appendChild(init_script('scripts/VGL.js'));
  document.head.appendChild(init_script('scripts/script.js'));
  document.head.appendChild(init_script('scripts/jsgif/LZWEncoder.js'));
  document.head.appendChild(init_script('scripts/jsgif/NeuQuant.js'));
  document.head.appendChild(init_script('scripts/jsgif/GIFEncoder.js'));
  document.head.appendChild(init_script('scripts/jsgif/b64.js'));

  //Deactive click on circel mouse
    document.querySelector('body').onclick = function(e) {
      if( e.which == 2 ) {
        e.preventDefault();
      }
    };
  //Deactive click on circel mouse
  //Deactive right mouse button
    document.getElementById('gr_paint').oncontextmenu = function()  { return false; };
  //Deactive select on canvas
    document.getElementById('gr_paint').onselect = function()  { return false; };

    function get_frame(){
      let img = document.createElement('canvas');
          img.width = canvas.width / 2;
          img.height = canvas.height / 2;
      let img_ctx = img.getContext("2d");
      img_ctx.scale(0.5,0.5);
      img_ctx.fillStyle = color_background;
      img_ctx.fillRect(0,0,canvas.width,canvas.height);
      img_ctx.drawImage(canvas_0,0,0);
      img_ctx.drawImage(canvas_1,0,0);
      img_ctx.drawImage(canvas_1_5,0,0);
      img_ctx.drawImage(canvas_3,0,0);
      img_ctx.drawImage(canvas,0,0);
      return(img_ctx);
    }
  document.head.appendChild(init_script('scripts/end_load.js'));
}
