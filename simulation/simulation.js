var image = new Image();
image.src = "./simulation/box.svg";
var disk = new Image();
disk.src = "./simulation/disk.svg";

const landh = 50;
var degree = 0;
const l = 0.057, g = 9.8, m1 = 0.83, m2 = 0.53, d = 0.000687, I1 = 0.0047, I2 = 0.00048;
const M = (m1*l+m2*l)*g;
const I = I1 + m1 * l**2 + m2*l**2 + I2;
var c=0.0014;
var q1=0, q1d=0, q1dd=0, q2=0, q2d=0, q2dd=0;
var dt=0.01;
var u =0, controlflag = 0;
var kp = 0.5, kd =0.05;
var time = 0;
var degt=[],ddegt=[],inpt=[];
var TIMEWIDTH = 1000, LINECLI=100;
var drawtimer;
var tim=0;
var timerflag=0;

    setInterval(function waveplot(){
        var cnv = document.getElementById('plot');
        
        var ampwidth = (cnv.height-20)/2;
        
        if (cnv.getContext){        
            var ctx = cnv.getContext('2d');
            var i;
            var originx = 10;
            var originy = cnv.height/2;
            var maxamp = 45;
            
            ctx.clearRect(0,0,cnv.width,cnv.height);
            ctx.beginPath();
            //水平方向の破線
            for(let j=0;j<cnv.height;j+=ampwidth){
                for (var i = -10; i < cnv.width; i++) {
                    if((i+5)%20==0) ctx.fillRect(i, originy-ampwidth+j-1/2, 10,1);
                }   
            }
            //垂直方向の破線
            for(let j=0;j<cnv.width;j+=(cnv.width-20) /(TIMEWIDTH/LINECLI)){
                for (var i = -10; i < cnv.height; i++) {
                    if((i+5)%20==0) ctx.fillRect(originx+j-1/2,i,1,10);
                }   
            }
            ctx.stroke();
            
            if(time<=TIMEWIDTH){
                ctx.moveTo(originx,originy-degt[0] * ampwidth / maxamp);
            }else{
                ctx.moveTo(originx,originy-degt[(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
            }
            
            for(i =0; i<degt.length; i++){
                if(time<=TIMEWIDTH){
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-degt[i] * ampwidth / maxamp);
                }else{
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-degt[i+(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
                }
            }
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            ++tim;
        }

    },100);
    
        setInterval(function waveplot(){
        var cnv = document.getElementById('plot2');
        
        var ampwidth = (cnv.height-20)/2;
        
        if (cnv.getContext){        
            var ctx = cnv.getContext('2d');
            var i;
            var originx = 10;
            var originy = cnv.height/2;
            var maxamp = 450;
            
            ctx.clearRect(0,0,cnv.width,cnv.height);
            ctx.beginPath();
            //水平方向の破線
            for(let j=0;j<cnv.height;j+=ampwidth){
                for (var i = -10; i < cnv.width; i++) {
                    if((i+5)%20==0) ctx.fillRect(i, originy-ampwidth+j-1/2, 10,1);
                }   
            }
            //垂直方向の破線
            for(let j=0;j<cnv.width;j+=(cnv.width-20) /(TIMEWIDTH/LINECLI)){
                for (var i = -10; i < cnv.height; i++) {
                    if((i+5)%20==0) ctx.fillRect(originx+j-1/2,i,1,10);
                }   
            }
            ctx.stroke();
    
            if(time<=TIMEWIDTH){
                ctx.moveTo(originx,originy-ddegt[0] * ampwidth / maxamp);
            }else{
                ctx.moveTo(originx,originy-ddegt[(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
            }
            for(i =0; i<degt.length; i++){
                if(time<=TIMEWIDTH){
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-ddegt[i] * ampwidth / maxamp);
                }else{
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-ddegt[i+(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
                }
            }
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            ++tim;
        }

    },100);

        setInterval(function waveplot(){
        var cnv = document.getElementById('plot3');
        
        var ampwidth = (cnv.height-20)/2;
        
        if (cnv.getContext){        
            var ctx = cnv.getContext('2d');
            var i;
            var originx = 10;
            var originy = cnv.height/2;
            var maxamp = 2;
            
            ctx.clearRect(0,0,cnv.width,cnv.height);
            ctx.beginPath();
            //水平方向の破線
            for(let j=0;j<cnv.height;j+=ampwidth){
                for (var i = -10; i < cnv.width; i++) {
                    if((i+5)%20==0) ctx.fillRect(i, originy-ampwidth+j-1/2, 10,1);
                }   
            }
            //垂直方向の破線
            for(let j=0;j<cnv.width;j+=(cnv.width-20) /(TIMEWIDTH/LINECLI)){
                for (var i = -10; i < cnv.height; i++) {
                    if((i+5)%20==0) ctx.fillRect(originx+j-1/2,i,1,10);
                }   
            }
            ctx.stroke();
            
            if(time<=TIMEWIDTH){
                ctx.moveTo(originx,originy-inpt[0] * ampwidth / maxamp);
            }else{
                ctx.moveTo(originx,originy-inpt[(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
            }
            
            for(i =0; i<degt.length; i++){
                if(time<=TIMEWIDTH){
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-inpt[i] * ampwidth / maxamp);
                }else{
                    ctx.lineTo( i * (cnv.width-20) / TIMEWIDTH  +originx, originy-inpt[i+(degt.length-TIMEWIDTH)] * ampwidth / maxamp);
                }
            }
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            ++tim;
        }

    },100);
    
    
function reset(){
    controlflag = 1;
    q1=Math.PI/4;
    q1d=0;
    q1dd=0;
    q2=0;
    q2d=0;
    q2dd=0;

    time=0;
    degt=[];
    ddegt=[];
    inpt=[];
    if(timerflag==1){
        
    }else{
        a();
    }
}

function datasave(){
    const data = degt;
    clearInterval(drawtimer);
    document.forms.data.value = "";
    var wwtxt = "時間[ms]\t角度[deg]\t角速度[deg/s]\t入力トルク[Nm]\n";
    for(let i=0;i<data.length;i++){
        wwtxt+= ((i*dt).toFixed(4)+"\t"+degt[i].toFixed(3) + "\t" + ddegt[i].toFixed(3) +"\t" +inpt[i].toFixed(3)+ "\n");
    }
    
    document.forms.data.value = wwtxt;
    timerflag=0;
}

function a(){
    timerflag = 1;
    drawtimer = setInterval(function draw(){
    var canvas = document.getElementById('simulation');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        var dispw = canvas.width;
        var disph = canvas.height;

        var diskreg=0;


        //地面の描画
        var lingrad = ctx.createLinearGradient(0,disph-50,0,disph);
        lingrad.addColorStop(0.5, '#26C000');
        lingrad.addColorStop(1, '#fff');
        // assign gradients to fill and stroke styles
        ctx.fillStyle = lingrad;
        // draw shapes
        ctx.fillRect(0,disph-landh,dispw,disph);

        //ロボットの描画
        function drawacrobox(degree,diskdeg){
            ctx.save() ;
            ctx.clearRect(0,0,dispw,disph-landh);
            if(degree>=90){
                degree=90;
                ctx.fillStyle = "#f00";
                ctx.font = "50px Script"
                ctx.fillText("床と接触しています！",15,65);
            }else if(degree<=0){
                degree=0;
                ctx.fillStyle = "#f00";
                ctx.font = "50px Script"
                ctx.fillText("床と接触しています！",15,65);
            }
            ctx.translate( dispw/2, disph-landh );
            ctx.rotate( degree * Math.PI / 180 ) ;
            ctx.translate( -dispw/2, -(disph-landh)) ;
            var imgw = 150, imgh = 150;
            var vieww = dispw/3, viewh = vieww;
            ctx.drawImage(image, 0,0,imgw,imgh,dispw/2-vieww,disph-viewh-landh,vieww,viewh);

            const iml = 151 / Math.sqrt(2)+12;
            ctx.translate( dispw/2, disph-landh );
            ctx.rotate( -degree * Math.PI / 180 ) ;
            ctx.translate( -dispw/2, -(disph-landh)) ;

            ctx.translate(dispw/2-iml*Math.cos((45+degree) * Math.PI / 180),
                          disph-landh-iml*Math.sin((45+degree) * Math.PI / 180));

            ctx.rotate( diskdeg+degree * Math.PI / 180 );
            ctx.translate( -(dispw/2-iml*Math.cos((45+degree) * Math.PI / 180)),
                          -(disph-landh-iml*Math.sin((45+degree) * Math.PI / 180)));
            imgw = 121, imgh = 121;
            vieww *= 121/151, viewh *= 121/151; 
            ctx.drawImage(disk, 0,0,imgw,imgh,
                          dispw/2-iml*Math.cos((45+degree) * Math.PI / 180)-vieww/2,
                          disph-landh-iml*Math.sin((45+degree) * Math.PI / 180)-viewh/2,
                          vieww,viewh);
            ctx.restore();

            ctx.font = "20px Script";
            ctx.fillStyle = '#000';
            ctx.fillText("q1="+(q1 * 180/Math.PI).toFixed(2)+"°",dispw-120,disph-260);

        }

        degree = 45-q1*180/Math.PI; 
        degt[time]=q1*180/Math.PI;
        ddegt[time]=q1d*180/Math.PI;
        inpt[time]=u;
        ++time;
//        if(time>TIMEWIDTH){
//            time=0;
//        }
        diskdeg = 45-q2*180/Math.PI; 
        drawacrobox(degree,diskdeg);

        if(controlflag==1){               
            u = -(kp * q1 + kd * q1d);
            if(Math.abs(u)>2){
                u = Math.sign(u)*0.1;
            }
        }else{
            u = 0;
        }


        q1dd = (M*Math.sin(q1) + (d-c)*q2d + u)/(I-I2);
        q2dd = (-u + (c-d)*q2d)/I2 - q1dd;

        q1d += dt*q1dd;
        q2d += dt*q2dd;

        q1 += dt*q1d;
        q2 += dt*q2d;
        
        
        if(q1<-Math.PI/4){
            q1=-Math.PI/4;
            q1d*=-0.95;
            q1dd=0;
        }

        if(q1>Math.PI/4){
            q1=Math.PI/4;
            q1d*=-0.95;
            q1dd=0;
        }


    }
  },10);
  }