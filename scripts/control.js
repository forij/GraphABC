//Body
document.body.onload = function(event){
  if(!isMobile.any()){
    document.getElementById("load_div").style.visibility = "hidden";
    document.getElementById("basic_page").style.visibility = "visible";
  }
}

document.body.onkeydown = function(event){
  terminal_visable(event.keyCode);
  if(event.keyCode == 77){move_top_bool = false;
    move_top_index = -1;	redraw_line();
    redraw_circel(); clear(ctx_l2);
    last_dot = -1;
    move_mode = !move_mode;

    if(!move_mode){
      move_mode_button.style.margin = '3px 3px 0px 5px';
      move_mode_button.style.border = '0px double black';
    }else{
      move_mode_button.style.margin = '1px 1px 0px 4px';
      move_mode_button.style.border = '1px double black';
    }
  }

  if(input_comand != document.activeElement){handler_event_keydown(event.keyCode)}
    else{terminal_key(event.keyCode)}
}
//Body

//Canvas (gr_paint)
document.getElementById('gr_paint').onmousedown = function(event){
  if(event.which == 1 && !move_top_bool ){update(event.pageX,event.pageY,true);}
  if(!wait_reb_active && ( event.which == 2  || ( move_mode && event.which == 1) )){
    move_top_bool = true;
    move_top_abc(event.pageX,event.pageY);
  }
  if(event.which == 3 && !wait_reb_active && !move_top_bool){update(event.pageX,event.pageY,true,3);}
  return false;
}

document.getElementById('gr_paint').onmouseup = function(event){
  if(event.which == 2 || (move_mode && event.which == 1)){
    move_top_bool = false; move_top_index = -1;
    redraw_line(); redraw_circel(); clear(ctx_l2);}
  if(event.which == 1){
  if(last_dot != -1){update(event.pageX,event.pageY);} last_dot = -1; wait_reb(event.pageX,event.pageY);}
  return false;
}

document.getElementById('gr_paint').onmousemove = function(event){
  if(move_top_bool){move_top_abc(event.pageX,event.pageY);}else{
    wait_reb(event.pageX,event.pageY);
  }
}

document.getElementById('gr_paint').onkeydown = function(event){
  visual_def_mass();
}

document.getElementById('gr_paint').onmouseout = function(event){
  wait_reb_active = false; move_top_bool=false; move_top_index = -1;
  redraw_line();
  redraw_circel();
  if(event.which == 2 || (move_mode && event.which == 1)){
    move_top_bool = false; move_top_index = -1;
    redraw_line(); redraw_circel(); clear(ctx_l2);}
  if(event.which == 1){
  if(last_dot != -1){update(event.pageX,event.pageY);} last_dot = -1; wait_reb(event.pageX,event.pageY);}
  wait_reb(event.pageX,event.pageY);
}
//Canvas (gr_paint)

//hide_options onclick
document.getElementById('hide_options').onclick = function(event){
  if(options_visable){
    options_visable = false;
    Options.style.marginLeft = 'calc(50% - 10px)';
  }else{
    options_visable = true;
    Options.style.marginLeft = 'calc(50% - 255px)';
  }
}

document.getElementById('hide_options').onmouseenter = function(event){
  hide_options.style.cssText = 'background-color: rgba(0,0,0,0.4);';
}

document.getElementById('hide_options').onmouseout = function(event){
  hide_options.style.cssText = 'background-color: rgba(0,0,0,0.1);'
}
//hide_options

//toolbar
document.getElementById('move_mode_button').onclick = function(event){
  if(move_mode){
    move_mode = false;
    this.style.margin = '3px 3px 0px 5px';
    this.style.border = '0px double black';
  }else{
    move_mode = true;
    this.style.margin = '1px 1px 0px 4px';
    this.style.border = '1px double black';
  }
}
//toolbar
