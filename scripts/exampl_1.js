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

k = 3;
k_x = ~~(width / k);
k_y = ~~(height / k);

writln(k_x,'#0F0');
writln(k_y,'#0F0');

l = new Date();
let last = l.getSeconds() * 1000 + l.getMilliseconds();

buff = [];


for(var i = 0; i < k; i++){
  for(var j = 0; j < k; j++){
    buff[buff.length] = ['new_top',[~~(k_x / 2) + k_x * i,~~(k_y / 2) + k_y * j]];
    buff[buff.length] = ['select_top',[k * i + j + 1]];
  }
}
buff[buff.length] = ['full_graph',[Number.MAX_VALUE]];
/*/
for(var j = 0; j < k * k; j++){
  buff[buff.length] = ['dell_top',[1]];
}
//*/

function f1(i){
  l = new Date();
  let last = l.getSeconds() * 1000 + l.getMilliseconds();
  if(i < buff.length){
    window[buff[i][0]].apply(this, buff[i][1]);
    n = new Date();
    let now = n.getSeconds() * 1000 + n.getMilliseconds();
    encoder.addFrame(get_frame());
    writln(now - last);
    i++;
    setTimeout(f1,10,i);
  }else{encoder.finish();demo();}
}

f1(0);
