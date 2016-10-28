function new_frame(){ // return canvas object with all ctx (ctx_l0,ctx_l1,ctx_l1_5,	ctx_l2,ctx_l3,ctx_l4);
  let  rez_frame = document.createElement('canvas');
  let frame_ctx = canvas.getContext("2d");
  let layer_0 = ctx_l0.getImageData(0,0,1280,640);
  let layer_3 = ctx_l3.getImageData(0,0,1280,640);
  console.log([layer_3.data[0],layer_3.data[1],layer_3.data[2],layer_3.data[3]]);
  ctx_l4.putImageData(layer_0, 0, 0);
}
