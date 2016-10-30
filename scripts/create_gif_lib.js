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
