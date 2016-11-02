//exampl 1 basic

function demo(){
  var binary_gif = encoder.stream().getData();
  var data_url = 'data:image/gif;base64,'+ encode64(binary_gif);
  document.getElementById('image').src = 'data:image/gif;base64,'+encode64(encoder.stream().getData())
}

width = 1280;
height = 640;

//window[func_name].apply(this, date);

var encoder = new GIFEncoder();

encoder.setRepeat(0);
encoder.setDelay(150);
encoder.start();

alert(matrix);
{
buff = [];

k = 2;
k_x = ~~(width / k);
k_y = ~~(height / k);

  var n = N,k = 3,p = 1;
  var st = [];
  var st_i = 0;
  var last_top = false;

function put(top){
  st[st_i] = top;
  buff[buff.length] = ['select_reb',[ st[st_i] , st[st_i - 1] ]];
  matrix[st[st_i] - 1][st[st_i - 1] - 1] = 2;
  matrix[st[st_i - 1] - 1][st[st_i] - 1] = 2;
  st_i++;
}

function get(){
  st_i--;
  buff[buff.length] = ['deselect_reb',[ st[st_i] , st[st_i - 1] ]];
  matrix[st[st_i] - 1][st[st_i - 1] - 1] = 1;
  try{
    matrix[st[st_i - 1] - 1][st[st_i] - 1] = 1;
  }catch(e){}
}

function nex_top(top){
  if(last_top){
    i = st[st_i] + 1;
  }else{
    i = 1;
  }
  while(i <= n && matrix[i - 1][top - 1] != 1){
    i++;
  }
  if(i == n + 1){
    return -1;
  }else{
    return i;
  }
}

buff = [];

function output(){
  writln(st);
}


  st[st_i] = p;
  st_i = 1;
  last_top = false;
  while(st_i > 0){
    t = nex_top(st[st_i - 1]);
    if(t != -1){
      last_top = false;
      put(t);
      if(st_i == k + 1){
        output();
        get();
        last_top = true;
      }
    }else{
      get();
      last_top = true;
    }
  }

}
/*/
for(var j = 0; j < k * k; j++){
  buff[buff.length] = ['dell_top',[1]];
}
//*/

function f1(i){
  if(i < buff.length){
    window[buff[i][0]].apply(this, buff[i][1]);
    i++;
    redraw_line();
    encoder.addFrame(get_frame());
    setTimeout(f1,10,i);
  }else{encoder.finish();demo();}
}

f1(0);
