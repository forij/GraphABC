var comand = '';
var comand_set = new Set();
var xhr = new XMLHttpRequest();
var comand_mem = [];
var comand_mem_index_j = 0;
var comand_mem_index = 0;

comand_set.add('scroll_down');
comand_set.add('write');
comand_set.add('writln');
comand_set.add('import_js');
comand_set.add('write');
comand_set.add('write');

//special comand objects
	var h = { } //Object help

	var special_comand_set = new Set(); // special_comand_set stores date about all special function
		special_comand_set.add('-h');

//special comand objects

function scroll_down(){
	terminal.scrollTop = terminal.scrollHeight;
}

function write(date,color = "#FFF",_scroll_down = true){
	terminal.innerHTML = terminal.innerHTML + "<font color=" + color + ">" + date;
	if(_scroll_down){
		scroll_down();
	}
}

add_new_help(writln,function(){
	writln('Команда вывода текста в консоль Atomy','#0F0');
	writln('Аргументы');
	writln('1: контекст сообшения которое нужно вывести');
	writln('2: цвет текста');
	writln('  цвет текста ( задается при помоши Color HEX code )');
});

function writln(date,color = "#FFF",_scroll_down = true){
	terminal.innerHTML = terminal.innerHTML +  '<pre>' + "<font color=" + color + ">" + date + '</pre>';
	if(_scroll_down){
		scroll_down();
	}
}

function add_new_help(func_n,func_h){
	h[func_n.name] = func_h;
}

function load_page(){
	document.getElementById("load_div").style.visibility = "visible";
	document.getElementById("basic_page").style.visibility = "hidden";
}

function visible_home_page(){
	document.getElementById("load_div").style.visibility = "hidden";
	document.getElementById("basic_page").style.visibility = "visible";
}

function put_last_command(last_command){
	if((comand_mem_index_j + 1) < 100){
		comand_mem_index_j++;
	}else{
		comand_mem_index_j = 0;
	}
	comand_mem_index = comand_mem_index_j + 1;
	comand_mem[comand_mem_index_j] = last_command;
	//writln("Add new comand in buffer : " + last_command + " index = " + comand_mem_index_j);
}

function get_last_command(){
	comand_mem_index--;
	if(comand_mem_index < 0){
		if(typeof comand_mem[99] == "undefined"){
			comand_mem_index = comand_mem_index_j;
		}else{
			comand_mem_index = 99;
		}
	}
	if(typeof comand_mem[comand_mem_index] == "undefined"){
		return '';
	}else{
		return comand_mem[comand_mem_index];
	}
}

function get_next_command(){
	comand_mem_index++;
	if(typeof comand_mem[99] == "undefined"){
		if(comand_mem_index > comand_mem_index_j){
			comand_mem_index = 0;
		}
	}else{
		if(comand_mem_index > 99){
			comand_mem_index = 0;
		}
	}
	if(typeof comand_mem[comand_mem_index] == "undefined"){
		return '';
	}else{
		return comand_mem[comand_mem_index];
	}
}

function get_type(date){
	writln(typeof(date[0]));
}

function terminal_visable(keyCode = 192){
	if(keyCode == 192){
		if(terminal.style.visibility == 'hidden'){
			terminal.style.visibility='visible';
			comand_line.style.visibility='visible';
			input_comand.focus();
		}else{
			terminal.style.visibility='hidden';
			comand_line.style.visibility='hidden';
		}
	}
	input_comand.value = input_comand.value.replace( /`/g,'');
}

function import_js(lib){
	switch(lib[0]){
		case "'": lib = lib.slice(1,lib.length - 2);  alert(lib); break;
	}
	lib = 'scripts/' + lib;
	xhr.open('GET', lib, false);
	xhr.send();
	//writln("Import : " + lib + " success;",'#0F0');
	if (xhr.status != 200) {
	  writln( xhr.status + ': ' + xhr.statusText );
	}else{
		find_comand = xhr.responseText.split('function ');
		for(var i = 1; i < find_comand.length; i++){
			new_command = "";
			for(var j = 0; find_comand[i][j] != '('  && find_comand[i][j] != ' '; j++){
				new_command += find_comand[i][j];
			}
			//writln(new_command,"#0F0");
			comand_set.add(new_command);
		}
		var script=document.createElement('script');
			script.src = lib;
			script.async = false;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
}

function processing(keyCode) {
	if(keyCode == 13){
		put_last_command(input_comand.value);
		terminal.innerHTML = terminal.innerHTML  + "<pre>" + "<font color='red'> ~# </font>" + "<font color='white'>" + input_comand.value + "<font></pre>";

		var inputcommand = input_comand.value;
		var read_func_name = true;
		var func_name  = "";
		var date = [];
		var comand_buf = "";
		var ok = true; // if correct input date ( ok == true ) else ( ok == false)
		var error_input_data = ''; // ( ok == fasle ) error_input_data have information about error

		for(var i = 0; i < inputcommand.length; i++){
			switch(inputcommand[i]){
				case "'":{
					i++;
					while(inputcommand[i] != "'" && i < inputcommand.length){
						comand_buf += inputcommand[i];
						i++;
					}
					date[date.length] = comand_buf;
					comand_buf = "";
				}break;
				case '"':{
					i++;
					while(inputcommand[i] != '"' && i < inputcommand.length){
						comand_buf += inputcommand[i];
						i++;
					}
					date[date.length] = comand_buf;
					comand_buf = "";
				}break;
				case '-':
					while(inputcommand[i] != ' ' && i < inputcommand.length){
						comand_buf += inputcommand[i];
						i++;
					}
					if(!special_comand_set.has(comand_buf)){
						ok = false;
						error_input_data = 'Команда ( ' + comand_buf + ' ) не найдена !'
					}
					date[date.length] = comand_buf;
					comand_buf = "";
					break;
				default:{
					if(inputcommand[i] != " "){
						if(read_func_name){
							while(inputcommand[i] != " " && i < inputcommand.length){
								func_name += inputcommand[i];
								i++;
							}
							read_func_name = false;
						}else{
							while(inputcommand[i] != " " && i < inputcommand.length){
								comand_buf += inputcommand[i];
								i++;
							}
							switch(comand_buf){
								case 'true': date[date.length] = true; break;
								case 'false': date[date.length] = false; break;
								default: date[date.length] = Number(comand_buf); break;
							}
							comand_buf = "";
						}
					}
				}
			}
		}

		if(comand_set.has(func_name) && ok == true){
			try{
				switch (date[0]) {
					case '-h':
						h[func_name]();
						break;
					default:
						window[func_name].apply(this, date);
				}
			}catch(error){
				writln(error,'#F00');
			}
		}else{
			if(ok){
				writln("Function (' " + func_name + " ') not found !",'#F00');
			}else {
				writln(error_input_data,'#F00');
			}
		}
		input_comand.value = "";
		scroll_down();
		redraw_line();
		redraw_circel();
	}
}

function terminal_key(event_keycode){
	switch(event_keycode){
        case 38:
            input_comand.value = get_last_command();
            break;
        case 40:
          	input_comand.value = get_next_command();
            break;
	}
}

function processFiles(files){
 	var file = files[0];

 	if(file.type === "application/javascript"){

		var reader = new FileReader();

		reader.onload = function (e) {
			load_page();
		   	var script=document.createElement('script');
			script.text = e.target.result;
			document.getElementsByTagName('BODY')[0].appendChild(script);
		}
		reader.readAsText(file);
	}else{alert("Помилка файл повинен мати розширення '.js'")}
	visible_home_page();
}

write("Atomy Terminal v0.4","#3BCFC8");

terminal_visable();
import_js('VGL.js');
