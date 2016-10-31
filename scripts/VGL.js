//Visual graph library

//Init context
	//Layer reb and input , outut dot
		var canvas_0 = document.getElementById("layer_0"),
			ctx_l0 = canvas_0.getContext('2d');

	//Layer slect reb
		var canvas_1 = document.getElementById("layer_1"),
			ctx_l1 = canvas_1.getContext('2d');

	//Layer mass reb
		var canvas_1_5 = document.getElementById("layer_1_5"),
			ctx_l1_5 = canvas_1_5.getContext('2d');

	//Layer anim wait_reb and move_top_abc
		var canvas_2 = document.getElementById("layer_2"),
			ctx_l2 = canvas_2.getContext('2d');

	//Layer top
		var canvas_3 = document.getElementById("layer_3"),
			ctx_l3 = canvas_3.getContext('2d');

	//Layer select top
		var canvas = document.getElementById("gr_paint"),
			ctx_l4 = canvas.getContext('2d');
//Init context

ctx_l3.textAlign = "center";
ctx_l3.textBaseline = "middle";
ctx_l1_5.font = "25px Verdana";

ctx_l1_5.textAlign = "center";
ctx_l1_5.textBaseline = "middle";
ctx_l1_5.font = "15px Verdana";

ctx_l2.textAlign = "center";
ctx_l2.textBaseline = "middle";

ctx_l4.textAlign = "center";
ctx_l4.textBaseline = "middle";
ctx_l4.font = "25px Verdana";

//Select
var select_map = new Map();
var select_map_reb = new Map();
var width_select_reb = 3;
var color_select_reb = '#F14034';
var color_select_top = '#F14034';
//Select
var width_line = 2;

function _init_(){
	window.width_line = width_l.value;
	window.top_radius = top_r.value;
	window.top_color = color_t.value;
 	window.color_reb = color_r.value;
	window.color_background = color_bg.value;
	document.getElementById('layer_0').style.background = color_bg.value;
}

function default_setting(){
	color_t.value = '#1C86EE';
 	color_r.value = '#000';
	color_bg.value = '#FFFFFF';
	width_l.value = 2;
	top_r.value = 20;
	_init_();
	redraw_line();
	redraw_circel();
}

var dot_list = [];
move_top_bool = false;

_init_();

function draw_line(x1,y1,x2,y2,ctx1 = ctx_l0){
	ctx1.moveTo(x1,y1);
	ctx1.lineTo(x2,y2);
}

function draw_circel(x1,y1,num,color=top_color,width_border = 0.1 ,radius = top_radius ,VGL = false,ctx1 = ctx_l3){
	function dr_circle(){
		ctx1.beginPath();
		ctx1.lineWidth = width_border;
		ctx1.arc(x1,y1 ,radius,0,3*Math.PI);
		ctx1.fillStyle = color;
	  ctx1.fill();
	}
	if(!VGL){
		dot_list[num] = [x1,y1];
		x1 = parseInt(x1);
		y1 = parseInt(y1);
		if(color === top_color){
			dr_circle();
		}else{
			dr_circle();
		}
		ctx1.fillStyle = '#000000';
		ctx1.fillText(num,x1,y1);
	}else{
		dr_circle();
		ctx1.fillStyle = '#000000';
		ctx1.fillText(num,x1,y1);
	}
}

function draw_dot(x1,y1,color,ctx1 = ctx_l0){
	x1 = parseInt(x1);
	y1 = parseInt(y1);
	switch(color) {
 		case 'red': ctx1.fillStyle = '#FF0000';
 			break;
 		case 'green': ctx1.fillStyle = '#00FF00';
    	break;
  	default: ctx1.fillStyle = '#000000';
	}
	ctx1.beginPath();
	ctx1.arc(x1,y1,7,0,3*Math.PI);
	ctx1.fill();
}

function new_top(x1 = 0,y1 = 0) {
	if(sh < 100){
		l = 0;
		new_dot = true;
		if(new_dot){
			ctx_l3.font = "25px Verdana";
			draw_circel(x1,y1,sh);
			dot_list[sh] = [x1,y1];
			sh++;
		}
	}
	output_martix_sm();
}

function clear(ctx1=ctx_l3){
	//sh_reb = 0;
	ctx1.clearRect(0, 0, canvas.width, canvas.height);
}

//Select
	function select_top(num,color = color_select_top,text = '',pos = 'top'){
		if(num < sh){
			draw_circel(dot_list[num][0],dot_list[num][1],num,color,0.1,top_radius,false,ctx_l4);
			if(!select_map.has(num)){
				select_map.set(num,[num,color,text,pos]);
			}else{
				select_map.delete(num);
				select_map.set(num,[num,color,text,pos]);
			}
			ctx_l4.font = "18px Verdana";
			if(text == 'inf'){
				text = '∞';
			}
			switch (pos) {
				case 'top':
					ctx_l4.fillText(text,dot_list[num][0],dot_list[num][1] - parseInt(top_radius) - 5);
					break;
				case 'back':
					ctx_l4.fillText(text,dot_list[num][0],dot_list[num][1] + parseInt(top_radius) + 5);
				default:
			}
			ctx_l4.font = "25px Verdana";
		}
	}

	function deselect_top(num){
		select_map.delete(num);
		draw_circel(dot_list[num][0],dot_list[num][1],num);
		redraw_circel();
		output_matrix_reb();
	}

	function deselect_all(){
		select_map.clear();
		clear(ctx_l2);
	}

	function select_reb(i,j,width = width_select_reb,color = color_select_reb){
		if(rez[(i - 1) * 100 + j] != nothing){
			x1 = dot_list[i][0];
			y1 = dot_list[i][1];

			x2 = dot_list[j][0];
			y2 = dot_list[j][1];
			alert(1);
			ctx_l1.beginPath();
			ctx_l1.lineWidth = width;
			ctx_l1.strokeStyle = color;
			draw_line(dot_list[i][0],dot_list[i][1],dot_list[j][0],dot_list[j][1],ctx_l1);
			ctx_l1.stroke();
		}else{
			writln('Ребро ' + i + " " + j + " неіснуэ","#F00");
		}
	}

	function deselect_reb(i,j){
		select_reb(i,j,'#000');
		output_matrix_reb();
	}
//Select

function redraw_circel(except = 0){
	clear();
	clear(ctx_l4);
	ctx_l3.lineWidth = 0;
	for (var i = 1; i < sh; i++){
		if(i != except){
			if(!select_map.has(i)){
				draw_circel(dot_list[i][0],dot_list[i][1],i);
			}else{
				window['select_top'].apply(this,select_map.get(i));
			}
		}
	}
}

function redraw_line(except = 0,dr = false,ctx1 = ctx_l0,ctx2 = ctx_l1_5){
	clear(ctx1);
	clear(ctx2);
	line_list = [];
	line_sh = 0;
	circel_list = [];
	circel_sh = 0;
	ctx1.lineWidth = width_line;
	ctx1.strokeStyle = color_reb;

	function except_dr(i,j){
		if(dr){
			return ( i == except || j == except );
		}else{
			return ( i != except && j != except );
		}
	}

	ctx_l3.lineWidth = 0.1;
	for (let i = 1; i < sh; i++) {
		for (let j = 1; j < sh; j++){
			if(vector){
				if(rez[(j - 1) * 100 + i] != nothing && except_dr(i,j)){

					x1 = dot_list[i][0];
					y1 = dot_list[i][1];

					x2 = dot_list[j][0];
					y2 = dot_list[j][1];

					//Input dot
						let l = Math.sqrt(Math.pow((x1- x2),2)+(Math.pow((y1 - y2),2))); // Find distance between a and b
						let k = 1 / ((l - top_radius) / top_radius);
						let k_x = (x1 + x2 * k) / (k + 1);
						let k_y = (y1 + y2 * k) / (k + 1);
						draw_dot(k_x,k_y,"green",ctx1);
						if(rez[(i - 1) * 100 + j] == nothing){

				    let k = 1 / ((l - top_radius) / top_radius);
						let k_x = (x2 + x1 * k) / (k + 1);
						let k_y = (y2 + y1 * k) / (k + 1);

						draw_dot(k_x,k_y,"red",ctx1);
				    }
				    line_list[line_sh] = [dot_list[i][0],dot_list[i][1],dot_list[j][0],dot_list[j][1]];
				    line_sh++;
				    if(mass_active){
				    	if(rez[(i - 1) * 100 + j] == rez[(j - 1) * 100 + i]){
				    		circel_list[circel_sh] = [
							(dot_list[j][0] + dot_list[i][0]) / 2,
							(dot_list[j][1] + dot_list[i][1]) / 2,
							rez[(j - 1) * 100 + i],'#00FF00',0.1,12,true,ctx2]
							circel_sh++;
				    	}else{
				    		circel_list[circel_sh] = [
							(dot_list[j][0] + dot_list[i][0] * 3) / 4,
							(dot_list[j][1] + dot_list[i][1] * 3) / 4,
							rez[(j - 1) * 100 + i],'#00FF00',0.1,12,true,ctx2]
							circel_sh++;
							if(rez[(i - 1) * 100 + j] != 0){
								circel_list[circel_sh] = [
								(dot_list[i][0] + dot_list[j][0] * 3) / 4,
								(dot_list[i][1] + dot_list[j][1] * 3) / 4,
								rez[(i - 1) * 100 + j],'#00FF00',0.1,12,true,ctx2]
								circel_sh++;
							}else{
								circel_list[circel_sh] = [
									(dot_list[i][0] + dot_list[j][0] * 3) / 4,
									(dot_list[i][1] + dot_list[j][1] * 3) / 4,
									"X",'#FF0000',0.1,12,true,ctx2]
								circel_sh++;
							}
				    	}
					}
				}
			}else{
				if(rez[(i - 1) * 100 + j] != nothing && except_dr(i,j) && i <= sh && j <= sh){
					line_list[line_sh] = [dot_list[i][0],dot_list[i][1],dot_list[j][0],dot_list[j][1]];
				  line_sh++;
					if(mass_active){
						circel_list[circel_sh] = [
							(dot_list[i][0] + dot_list[j][0]) / 2,
							(dot_list[i][1] + dot_list[j][1]) / 2,
							rez[(i - 1) * 100 + j],'#FFFFFF',1 ,15,true,ctx2]
						circel_sh++;
					}
				}
			}
		}
	}
	ctx1.beginPath();
	for(var i = 0; i < line_sh; i++ ){
		draw_line(line_list[i][0],line_list[i][1],line_list[i][2],line_list[i][3],ctx1);
	}
	ctx1.stroke();

	ctx1.font= "15px Verdana";
	for(var i = 0; i < circel_sh; i++ ){
		if(circel_list[i][2] >= Number.MAX_VALUE){
			circel_list[i][2] = '∞';
		}
		draw_circel.apply(this, circel_list[i]);
	}
	ctx1.font= "25px Verdana";
}

function new_reb(last_dot,new_dot,mass_1 = def_mass){
	if(last_dot < sh && new_dot < sh){
		def_mass = Number(def_mass);
		if(mass_1 == 'inf'){
			mass_1 = Number.MAX_VALUE;
		}
		if(vector){
			rez[(last_dot - 1) * 100 + new_dot] = mass_1;
	//		writln("vec_reb(" + last_dot + ',' + new_dot + ')');
		}else{
			rez[(new_dot - 1) * 100 + last_dot] = mass_1;
			rez[(last_dot - 1) * 100 + new_dot] = mass_1;
	//		writln("reb(" + last_dot + ',' + new_dot + ')');
		}
	}
	redraw_line();
	output_matrix_reb();
}

function mass_reb(m){
	def_mass = m;
	output_matrix_reb();
}

function move_top(num, x1, y1,redraw_active = true){
	if(num < 100){
		dot_list[num][0] = x1;
		dot_list[num][1] = y1;
	}
	//writln("Top number : " + num + " have coordinates x:( " + x1 + " ), y:( " + y1 + ") ");
}

var run_script = false;

function del_reb(i,j,d_vector = false){
	if(i < sh && j < sh){
		if(vector){
			if(d_vector){
				rez[(i - 1) * 100 + j] = 0;
				rez[(j - 1) * 100 + i] = 0;
			}else{
				if(rez[(i - 1) * 100 + j] == 0){
					rez[(j - 1) * 100 + i] = 0;
					writln("Reb [ "+ j + " => " +i + " ] delete");
				}else{
					rez[(i - 1) * 100 + j] = 0;
					writln("Reb [ "+ i + " => " + j + " ] delete");
				}
			}
		}else{
			rez[(i - 1) * 100 + j] = 0;
			rez[(j - 1) * 100 + i] = 0;
			writln("Reb [ "+ j + " <==> " +i + " ] delete");
		}
	}else{
		writln("Reb [ " + i + " => " + j + " ] do not exist");
	}
	redraw_line();
}

function full_graph(mass_1 = 1){
	if(!mass.checked && mass_1 != 1){
		mass.checked = true;
	}
	if(mass_1 == 'inf' || mass_1 == Number.MAX_VALUE){
		mass_1 = Number.MAX_VALUE;
	}
	for (let i = 0; i < sh - 1; i++) {
			for (let j = 0; j < sh - 1; j++){
				if(i != j){
					rez[j * 100 + i + 1] = mass_1;
			}
		}
	}
	output_matrix_reb();
	redraw_line();
}

function dell_all_reb(){
	for(var i = 0; i < 10000; i++ ){
		rez[i] = 0;
	}
	writln("All reb delete");
	redraw_line();
	output_matrix_reb();
}

function matrix(i,j,wr = false){
	if(wr){writln(rez[(j - 1)* 100 + i]);}
	return rez[(j - 1)* 100 + i];
}

function dell_top(num,d_all = false){
	if(num < sh){
		for(var i = num; i < dot_list.length - 1; i++){
			dot_list[i] = dot_list[i + 1];
		}
		for(var i = 1; i < sh; i++){
			for(var j = num; j < sh; j++){
				rez[(i - 1) * 100 + j] = rez[(i - 1) * 100 + j + 1];
			}
		}
		for(var i = num; i < sh; i++){
			for(var j = 1; j < sh; j++){
				rez[(i - 1) * 100 + j] = rez[i * 100 + j];
			}
		}
		sh--;
		dot_list.pop();
		if(!d_all){
			redraw_line();
			redraw_circel();
			output_matrix_reb();
		}
	}else{writln("Top № " + num + " not found","#F00");}
}

function dell_all(){
	for(var i = sh - 1; i > 0; i--){
		dell_top(i,true);
	}
	redraw_line();
	redraw_circel();
	output_matrix_reb();
}
