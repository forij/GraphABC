function get_frame(){
  let img = document.createElement('canvas');
      img.width = canvas.width;
      img.height = canvas.height;
  let img_ctx = img.getContext("2d");

  img_ctx.fillStyle = color_background;
  img_ctx.fillRect(0,0,canvas.width,canvas.height);
  img_ctx.drawImage(canvas_0,0,0);
  img_ctx.drawImage(canvas_1_5,0,0);
  img_ctx.drawImage(canvas_3,0,0);
  return(img_ctx);
}
