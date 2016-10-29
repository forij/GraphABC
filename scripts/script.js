var vector = document.getElementById('vect').checked;
var mass_active = document.getElementById('mass').checked;
var default_mass =document.getElementById('mass_1');

var vector = document.getElementById('vect').checked;
var mass_active = document.getElementById('mass').checked;
var default_mass =document.getElementById('mass_1');

options_visable = false;
move_top_bool = false;
default_mass.value = 1;


settings_dop_visible = false;
mouse_x = 0;
mouse_y = 0;
vector = false;
mass_list = []
last_dot = -1;
rez = [];
def_mass = 1;
nothing = 0;

sh = 1;
sh_reb = 0;
list_reb = [];
matrix_sm = [];
// Обнуление матрицы
for(var i = 0; i < 10000; i++ ){
	rez[i] = nothing;
}

function mirrow(){
	for (var i = 0; i < sh; i++) {
			for (var j = 0; j < sh; j++){
				if(rez[i * 100 + j + 1] != nothing){
					rez[j * 100 + i + 1] = rez[i * 100 + j + 1]
				}
			}
		}
}

function enumerator_reb(){
	sh_reb = 0;
	for (var i = 1; i < sh; i++) {
		for (var j = 1; j < sh; j++){
			if(rez[(i - 1) * 100 + j] != nothing){
				sh_reb = sh_reb + 1;
			}
		}
	}
}

function find_k_x_k_y(i,j){
	l = Math.sqrt(Math.pow((dot_list[j][0] - dot_list[i][0]),2)+(Math.pow((dot_list[j][1] - dot_list[i][1]),2))); // Find distance between a and b
	k = 1 / ((l - 20) / 20)
	k_x = (dot_list[j][0] + dot_list[i][0] * k) / (k + 1);
	k_y = (dot_list[j][1] + dot_list[i][1] * k) / (k + 1);
}

wait_reb_active = false;
wait_reb_x = -1;
wait_reb_y = -1;


function wait_reb(x,y){
	mouse_x = x;
	mouse_y = y;

	x = x - (window.innerWidth / 2) + 640;
	x = ~~x;
	y = y - 80;

	wait_reb_x = x;
	wait_reb_y = y;

	l_min = Number.MAX_VALUE;

	if(last_dot != -1){
		for(let i = 1; i < sh; i++){
			l = Math.sqrt((Math.pow((dot_list[i][0] - x),2))+(Math.pow((dot_list[i][1] - y),2)));
			if( l_min > l && l < top_radius){
				l_min = l;
				wait_reb_x = dot_list[i][0];
				wait_reb_y = dot_list[i][1];
			}
		}
		wait_reb_active = true;
		ctx_l2.beginPath();
		clear(ctx_l2);
		if(vector){draw_dot(wait_reb_x,wait_reb_y,"green",ctx_l2);}else{draw_dot(wait_reb_x,wait_reb_y,"black",ctx_l2);}
		ctx_l2.lineWidth = width_line;
		ctx_l2.strokeStyle = color_reb;
		draw_line(last_dot_x,last_dot_y,wait_reb_x,wait_reb_y,ctx_l2)
		ctx_l2.stroke();
		if(mass_active){
			ctx_l2.font= "25px Verdana";
			ctx_l2.fillStyle = '#ff0000';
			ctx_l2.fillText(def_mass,wait_reb_x + 20,wait_reb_y);
		}
	}else{wait_reb_active = false; clear(ctx_l2);}
}

var left_mouse_b = false;

function output_martix_sm(){
	innerHTMLContent = "<span> " + (sh - 1) + "<br>";
	for (var i = 1; i < sh; i++) {
		for (var j = 1; j < sh; j++){
			innerHTMLContent = innerHTMLContent + " " + rez[(i - 1) * 100 + j];
		}
		innerHTMLContent = innerHTMLContent + "<br>";
	}
	innerHTMLContent = innerHTMLContent + "</span>";
	matrix_out.innerHTML = innerHTMLContent;
}

function output_matrix_reb(){

	vector = document.getElementById('vect').checked;
	mass_active = document.getElementById('mass').checked;

	list_reb = [];

	if(vector){

		enumerator_reb();

		innerHTMLContent = "<span> " + sh_reb  + "<br>";

		for (let i = 0; i < sh; i++) {
			for (let j = 1; j < sh; j++){
				if(rez[(j - 1) * 100 + i] != nothing){
					if(mass_active){
						innerHTMLContent = innerHTMLContent + " " + i + " " + j + " " + rez[(j - 1) * 100 + i] + "<br>";
						list_reb[list_reb.length] = [i,j,rez[(j - 1) * 100 + i]];
					}else{
						innerHTMLContent = innerHTMLContent + " " + i + " " + j + "<br>";
						list_reb[list_reb.length] = [i,j];
					}
				}
			}
		}
		matrix_reb.innerHTML = innerHTMLContent;
	}else{
		mirrow();

		enumerator_reb();

		innerHTMLContent = "<span> " + sh_reb / 2 + "<br>";
		for (let i = 1; i < sh; i++) {
			for (let j = i; j < sh; j++){
				if(rez[(i - 1) * 100 + j] != nothing){
					if(mass_active){
						innerHTMLContent = innerHTMLContent + " " + i + " " + j + " " + rez[(i - 1) * 100 + j] + "<br>";
						list_reb[list_reb.length] = [i,j,rez[(j - 1) * 100 + i]];
					}else{
						innerHTMLContent = innerHTMLContent + " " + i + " " + j + "<br>";
						list_reb[list_reb.length] = [i,j];
					}
				}
			}
		}
		matrix_reb.innerHTML = innerHTMLContent;
	}
	output_martix_sm();
}

function Select(selected_ob){
    var target = document.getElementById(selected_ob).getElementsByTagName('span')[0];
    var rng, sel;
    if (document.createRange) {
      rng = document.createRange();
      rng.selectNode(target)
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(rng);
    } else {
      var rng = document.body.createTextRange();
      rng.moveToElementText(target);
      rng.select();
    }
}

function load_graph(){
	mass_active = document.getElementById('mass').checked;
	if(mass_active){
		if(default_mass.value != ''){
			//alert(default_mass.value);
			if(default_mass.value > -1000){
				def_mass = default_mass.value;
			}else{
				default_mass.value =  -100;
				def_mass = -100;
			}
		}else{
			default_mass.value =  1;
			def_mass = 1;
		}
	}else{
		def_mass = 1;
	}

	for(var i = 1; i < sh; i++){
		for(var j = 1; j < sh; j++){
			if(rez[(i - 1) * 100 + j] != 0){
				rez[(i - 1) * 100 + j] = def_mass;
			}
		}
	}

	output_matrix_reb();
}

move_top_index = -1;

function move_top_abc(x1,y1){
	x1 = x1 - (window.innerWidth / 2) + 640;
	y1 = y1 - 80;

	if(move_top_index == -1){
		l_min = Number.MAX_VALUE;
		for (var i = 1; i < sh; i++) {
			l = Math.sqrt((Math.pow((dot_list[i][0] - x1),2))+(Math.pow((dot_list[i][1] - y1),2)));
			if( l_min > l && l < top_radius ){
				l_min = l;
				move_top_index = i;
			}
		}
		if(l_min != Number.MAX_VALUE){
			move_top(move_top_index,x1,y1);
			redraw_circel(move_top_index,true);
			redraw_line(move_top_index);
			if(move_top_index != -1){
				redraw_line(move_top_index,true,ctx_l2,ctx_l2);
				ctx_l3.font= "25px Verdana";
				draw_circel(x1,y1,move_top_index,top_color,0.1,top_radius ,false,ctx_l2);
			}
		}
	}else{
		move_top(move_top_index,x1,y1);
		redraw_line(move_top_index,true,ctx_l2,ctx_l2);
		draw_circel(x1,y1,move_top_index,top_color,0.1,top_radius ,false,ctx_l2);
	}
}

function handler_event_keydown(event_keycode) {
	if(mass_active){
		switch (event_keycode) {
	    	case  87:
	            def_mass++;
	            if(def_mass == nothing ){
	            	def_mass++;
	    		}
	            break;
	        case 38:
	            def_mass++;
	            if(def_mass == nothing ){
	            	def_mass++;
	    		}
	            break;
	        case 83:
	            def_mass--;
	            if(def_mass == nothing ){
	            	def_mass--;
	    		}
	            break;
	        case 40:
	            def_mass--;
	            if(def_mass == nothing ){
	            	def_mass--;
	    		}
	            break;
	    }
	    if(def_mass >= 100){def_mass = 99}
	    if(def_mass <= -100){def_mass = -99}
	    mass_next_reb_output.style.visibility = 'visible';
	    mass_next_reb_output.innerHTML = def_mass;
	}else{
		mass_next_reb_output.style.visibility = 'hidden';
	}

    wait_reb(mouse_x,mouse_y);
}

function distance_to_segment(x1,y1,i,j){
	//Init (x1,y1) (x2,y2)
	top1_x = dot_list[i][0];
	top1_y = dot_list[i][1];

	top2_x = dot_list[j][0];
	top2_y = dot_list[j][1];

	x1_x = Math.abs(x1 - top1_x);
	x2_x = Math.abs(top2_x - x1);
	x1_x2 = Math.abs(top2_x - top1_x);

	y1_y = Math.abs(y1 - top1_y);
	y2_y = Math.abs(top2_y - y1);
	y1_y2 = Math.abs(top2_y - top1_y);

	k = 15;

	//ritln(((x1_x2 + k) >= (x1_x + x2_x)),"#0F0");
	//writln(((y1_y2 + 1) >= (y1_y + y2_y)),"#0F0");

	if( ((y1_y2 + k) >= (y1_y + y2_y)) && ((x1_x2 + k) >= (x1_x + x2_x)) ){
		var AB = Math.pow(top1_x - top2_x,2) + Math.pow(top1_y - top2_y,2);
		var AC = Math.pow(top1_x - x1,2) + Math.pow(top1_y - y1,2);
		var CB = Math.pow(x1 - top2_x,2) + Math.pow(y1 - top2_y,2);

		var cosA = ( AC + AB - CB ) / ( 2 * Math.sqrt(AC) * Math.sqrt(AB) );

		var A = Math.acos(cosA);

		return Math.sqrt(AC) * Math.sin(A);
	}else{
	 	return -1;
	}
}

setupDownloadLink = function(link,type_output_date){
	switch (type_output_date) {
		case 'matrix':
			output_date = (sh - 1) + "\n";
			for (var i = 1; i < sh; i++) {
				for (var j = 1; j < sh; j++){
					output_date += rez[(i - 1) * 100 + j] + " ";
				}
				output_date += "\n";
			}
			link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(output_date);
			break;
		case 'm_reb':
			if(vector){
				enumerator_reb();
				output_date = sh_reb  + "\n";

				for (var i = 0; i < sh; i++) {
					for (var j = 1; j < sh; j++){
						if(rez[(j - 1) * 100 + i] != nothing){
							if(mass_active){
								output_date = output_date + " " + i + " " + j + " " +rez[(j - 1) * 100 + i] + "\n";
							}else{
								output_date = output_date + " " + i + " " + j + "\n";
							}
						}
					}
				}
			}else{
				mirrow();
				enumerator_reb();
				output_date = sh_reb / 2 + "\n";
				for (var i = 1; i < sh; i++) {
					for (var j = i; j < sh; j++){
						if(rez[(i - 1) * 100 + j] != nothing){
							if(mass_active){
								output_date = output_date + i + " " + j + " " + rez[(i - 1) * 100 + j] + "\n";
							}else{
								output_date = output_date + i + " " + j + "\n";
							}
						}
					}
				}
			}
			link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(output_date);
			break;
		case 'canvas':
			let img = document.createElement('canvas');
					img.width = canvas.width;
					img.height = canvas.height;
			let img_ctx = img.getContext("2d");

			img_ctx.fillStyle = color_background;
			img_ctx.fillRect(0,0,canvas.width,canvas.height);
			img_ctx.drawImage(canvas_0,0,0);
			img_ctx.drawImage(canvas_1_5,0,0);
			img_ctx.drawImage(canvas_3,0,0);

			link.href = img.toDataURL();
    	link.download = 'GraphABC.png';
			break;
	}
}

var mode_value = 1;

// Обработка клика
function update(x,y,new_t = false,mode1){

	x = x - (window.innerWidth / 2)  + 640;
	x = ~~x;
	y = y - 80;

	if(typeof mode1 == "undefined"){
		mode1 = mode.value;
	}

	switch(parseInt(mode1)){
		case 1:
		l = 0;
		l_min = 1000000;
		new_dot = sh;
		for (var i = 1; i < sh; i++) {
			l = Math.sqrt((Math.pow((dot_list[i][0] - x),2))+(Math.pow((dot_list[i][1] - y),2)));
			if( l_min > l && l < top_radius * 2){
				l_min = l;
				new_dot = i;
			}

		}

		if(new_dot == sh){
			if(new_dot >= 100){
				alert("Кількість вершин не повинна перевищювати 100 !")
			}else{
				if(new_t){
					ctx_l3.font = "25px Verdana";
					draw_circel(x,y,sh);
					writln("new_top " + x + ' ' + y);
					sh++;
				}
			}
			last_dot = -1;
		}else{
			if(last_dot != -1 && new_dot != last_dot){
				if(l_min < top_radius){
					new_reb(last_dot,new_dot,def_mass);
					if(vector){
						writln("Reb [ " + last_dot + ' => ' + new_dot + ' ] created');
					}else{
						writln("Reb [ " + last_dot + ' <==> ' + new_dot + ' ] created');
					}
				}
				last_dot = -1;
			}else{
				last_dot = new_dot;
				last_dot_x = dot_list[last_dot][0];
				last_dot_y = dot_list[last_dot][1];
			}
		}
		break;
		case 2:
			selct_t = -1;
			l_min = 1000000;
			for (var i = 1; i < sh; i++) {
				l = Math.sqrt((Math.pow((dot_list[i][0] - x),2))+(Math.pow((dot_list[i][1] - y),2)));
				if( l_min > l && l < (top_radius )){
					l_min = l;
					selct_t = i;
				}
			}

			if(selct_t != -1){
				if(!select_map.has(selct_t)){
					select_top(selct_t);
				}else{
					deselect_top(selct_t);
				}
			}
		break;
		case 3:
			l_min = 100000000;
			del_r = -1;

			for (var i = 1; i < sh; i++) {
				l = Math.sqrt((Math.pow((dot_list[i][0] - x),2))+(Math.pow((dot_list[i][1] - y),2)));
				if( l_min > l && l < top_radius){
					l_min = l;
					selct_t = i;
				}
			}

			if(l_min != 100000000){
				dell_top(selct_t);
			}else{
				for(var i = 0; i < list_reb.length; i++){
					distance_to_reb = distance_to_segment(x,y,list_reb[i][0],list_reb[i][1]);
					if(l_min > distance_to_reb && distance_to_reb < 30 && distance_to_reb != -1){
						//writln(list_reb[i][0] + " " + list_reb[i][1] + " " + distance_to_reb);
						l_min = distance_to_reb;
						del_r = [list_reb[i][0] ,list_reb[i][1]];
					}
				}
				if(l_min != 100000000){
					del_reb(del_r[0],del_r[1]);
				}
			}
		break;
	}
	output_matrix_reb();
}

function help_menu_visible(){
	if(help_menu.style.height === '500px'){
		help_menu.style.height = '40px';
		help_menu.style.left = '-210px';
	}else{
		help_menu.style.height = '500px';
		help_menu.style.left = '0px';
	}
}

function turn(ob,sp){
	if(ob.style.maxHeight === '30pt'){
		ob.style.maxHeight = '200pt';
		sp.innerHTML = '˄'
	}else{
		ob.style.maxHeight = '30pt';
		sp.innerHTML = '˅'
	}
}
