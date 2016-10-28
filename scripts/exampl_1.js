//exampl 1 basic

width = 1280;
height = 640;

//window[func_name].apply(this, date);

var encoder = new GIFEncoder();

encoder.setRepeat(0);
encoder.setDelay(50);
encoder.start();

k = 5;
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
  }
}


function f1(i){
  l = new Date();
  let last = l.getSeconds() * 1000 + l.getMilliseconds();
  if(i < buff.length){
    window[buff[i][0]].apply(this, buff[i][1]);
    full_graph();
    n = new Date();
    let now = n.getSeconds() * 1000 + n.getMilliseconds();
    writln(now - last);
  }
  i++;
  setTimeout(f1,10,i);
}

encoder.finish();

f1(0);
