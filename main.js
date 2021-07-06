let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width
canvas.height = window_height

canvas.style.background = '#121212'
class Square{
    BG_COLOR_1='#123967';
    BG_COLOR_2='#216095';
    BG_COLOR_3='#2b79b4';
    BG_COLOR_4='#3ba3df';
    BG_COLOR_5='#81b7d9';
    BG_COLOR_6='#9ccee5';
    
    constructor(x, y, width, height, hp, txtColor, lnColor){
        this.x = x;
        this.y = y;
        this.lastX=this.x;
        this.lastY=this.y;
        this.width = width;
        this.height = height;
        this.maxHp=hp;
        this.hp = hp;
        this.txtColor=txtColor;
        this.lnColor=lnColor;
        this.color=this.BG_COLOR_1;
    }
    setBgColor(context){
        
        
        if(this.maxHp==this.hp)this.color=this.BG_COLOR_1;
        else if(this.hp>(this.maxHp*4)/5){
            this.color=this.BG_COLOR_2;
        }
        else if(this.hp>(this.maxHp*3)/5){
            this.color=this.BG_COLOR_3;
        }
        else if(this.hp>(this.maxHp*2)/5){
            this.color=this.BG_COLOR_4;
        }
        else if(this.hp>(this.maxHp*1)/5){
            this.color=this.BG_COLOR_5;
        }
        else{
            this.color=this.BG_COLOR_6
        }
        context.fillStyle=this.color;

        context.fill();
    }
    draw(context){
        context.beginPath();    
        context.rect(this.x, this.y, this.width, this.height);
        this.setBgColor(context);
        context.fillStyle =this.txtColor;
        context.fillText(this.hp, this.x + this.width/2, this.y + this.height/2);
        context.textAlign='center';
        context.textBaseline='middle';
        context.font='0.8vw sans-serif';
        // context.strokeStyle=this.lnColor;
        // context.stroke();
        context.closePath();
    }

    disrender(context){
        context.beginPath();
        context.clearRect(this.lastX-1,this.lastY-1,this.width+2,this.height+2);
        context.closePath();
    }    
    disrenderCurr(context){
        context.beginPath();
        context.clearRect(this.x-1,this.y-1,this.width+2,this.height+2);
        context.closePath();
    }

}

class DisplaySquare{
    constructor(x, y, width, height, content, bgColor, txtColor, lnColor){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = content;
        this.bgColor=bgColor;
        this.txtColor=txtColor;
        this.lnColor=lnColor;
    }   

    draw(context){
        context.beginPath();    
        context.rect(this.x, this.y, this.width, this.height)
        context.fillStyle=this.bgColor;
        context.fill();
        context.fillStyle =this.txtColor;
        context.fillText(this.content, this.x + this.width/2, this.y + this.height/2);
        context.textAlign='center';
        context.textBaseline='middle';
        context.font='0.7vw sans-serif';
        context.strokeStyle=this.lnColor;
        context.stroke();
        // context.closePath();
    }

}


class Circle{

    constructor(x, y, radius, color, lnColor, speed, collideAudio, damage, soundPath){
        this.damage=damage;
        this.soundPath=soundPath;
        this.collideAudio=collideAudio;      
        this.lastX=this.x;
        this.lastY=this.y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.lnColor = lnColor;
        this.dx = this.speed.x;
        this.dy = this.speed.y;

    }
    
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=this.color;
        context.fill();
        // context.strokeStyle=this.lnColor;
        // context.lineWidth=1;
        // context.stroke();
        context.closePath();
    }
    
    // initC(xAxis, collideColor){      
    //     for(let i=0;i<8;i++){
    //         this.splashProjectiles.push(new Particle(this.x,this.y,Math.floor(Math.random()*3+1), collideColor, {x: Math.floor(this.dx/12+((Math.random()*5-2)*!xAxis)),y: Math.floor(this.dy/12+((Math.random()*5-2)*xAxis))}));
    //     }
    // }

    // animateC(context){
    //     this.splashProjectiles.forEach((p,idx) => {
    //         p.update(context);
    //         if(p.alpha<=0)this.splashProjectiles.splice(idx,1);    
    //     });
    // }
    update(context){
        this.draw(context);
        this.lastX=this.x;
        this.lastY=this.y;
        this.dx=Math.floor(this.dx);
        this.dy=Math.floor(this.dy);
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > window_width){
            
            this.dx = this.dx * -1;
            this.collideAudio(this.soundPath,0.5);
            // this.initC(true,'white');
            // this.randomizeDir(this);
        }

        if( this.x - this.radius <= 0){
            // this.x=this.xBorder+this.radius;
            this.dx = this.dx * -1;
            this.collideAudio(this.soundPath,0.5);
            // this.initC(true,'white');

            // this.randomizeDir(this);

        }
        
        if(this.y - this.radius <= 0){
            this.y=this.radius;
            this.dy = this.dy * -1;
            this.collideAudio(this.soundPath,0.5);
            // this.initC(false,'white');

            // this.randomizeDir(this);

        }

    }
    disrender(context){
        context.beginPath();

        context.clearRect(this.lastX-this.radius-1, this.lastY-this.radius-1, this.radius*2+2, this.radius*2+2);
        context.closePath();

    }
}

class Particle{

    constructor(x, y, radius, color, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed=speed;
        this.dx = this.speed.x;
        this.dy = this.speed.y;
        this.alpha=1;
    }
    
    draw(context){
        context.save();
        context.globalAlpha=this.alpha;
        context.beginPath();
        context.rect(this.x,this.y,this.radius,this.radius);
        // context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=this.color;
        context.fill();
        context.closePath();
        context.restore();
    }
    update(context){
        this.alpha-=0.02;
        this.draw(context);
        this.dx*=0.95;
        this.dy*=0.95;
        this.dx=this.dx;
        this.dy=this.dy;
        this.x += this.dx;
        this.y += this.dy;
    }

}


class TrajectoryCircle{
    travelTime=0;
    constructor(x, y, radius,  speed, travelTime){
        this.travelTime=travelTime;
        this.alpha=1;
        this.lastX=this.x;
        this.lastY=this.y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.dx = this.speed.x;
        this.dy = this.speed.y;
    }

    update(velocity,initX,initY){
        this.alpha-=0.01;
        this.velocity=velocity;
        this.dy=velocity.y;
        this.dx=velocity.x;
        this.x=initX;
        this.y=initY;
        this.lastX=this.x;
        this.lastY=this.y;
    }
    calculate(){
        this.dx=Math.floor(this.dx);
        this.dy=Math.floor(this.dy);
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > window_width){
            this.dx*=-1;
        }

        if( this.x - this.radius <= 0){
            // this.x=this.xBorder+this.radius;
            this.dx*=-1;
        }
        
        if(this.y - this.radius <= 0){
            this.y=this.radius;
            this.dy*=-1;

        }

    }
    draw(context){
        if(this.y-this.radius>window_height)return;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=`rgba(255,255,255,${this.alpha})`;
        context.fill();
        context.closePath();
    }


}
var hasLost=false;
    

class Environment{
    
    SQUARE_SIZE=Math.floor(window_width/30);
    SQUARE_GAP=0;
    X_BORDER=(window_width-this.SQUARE_SIZE*30)/2;
    Y_BORDER=100;
    pushing=false;
    ROUND_INTERVAL=200/30;
    
    triggerRound=function(){
        let sum=25;
        let winx=(window_width-sum*this.SQUARE_SIZE)/2;
        this.pushSquaresDown();
        for(let i=0;i<sum;i++){
            if(Math.floor(Math.random()*3)!=1)this.squares.push(new Square(winx+(i*(this.SQUARE_SIZE+this.SQUARE_GAP)), -this.SQUARE_SIZE, this.SQUARE_SIZE, this.SQUARE_SIZE, Math.floor((Math.random()*12)+12), 'white','#007cbd'));
        }
    }
    constructor(){
        this.squares =[];

    }
    pushSquaresDown(){
        this.pushing=true;
    }
    moveSquaresDown(){
        if(this.pushing==false)return;
        let miniPush=(this.SQUARE_SIZE+this.SQUARE_GAP)/30;
        
        setTimeout(() => {
        
            waves++;
        },  30*this.ROUND_INTERVAL) 
        for(let i = 0 ; i<30; i++){
            this.squares.forEach(square => {
                
                square.lastY=square.y;
                square.lastX=square.x;
            setTimeout(() => {
                square.y+=miniPush;

            },  i*this.ROUND_INTERVAL) 
            });
        }
        this.pushing=false;

    }
    drawSquares(context){
        this.squares.forEach(square => {
            if(square.hp>0)square.draw(context);
        });
    }
    disrender(context){
        this.squares.forEach(square => {
            square.disrender(context);
        });


    }
    validateSquareExistance(context){
        
        this.squares.forEach((square,idx) => {
            if(square.hp<=0){
                
                square.disrenderCurr(context);
                this.squares.splice(idx,1);
                kill++;
            }
            if(square.y+square.width>=window_height){
                popup.style.display='flex';
                let waveScore=document.getElementById('wave-score');
                let killScore=document.getElementById('kill-score');
                let damageScore=document.getElementById('damage-score');
                waveScore.textContent=waves;
                killScore.textContent=kill;
                damageScore.textContent=damage;
                document.getElementById('play-again').textContent='Play Again';
                hasLost=true;
            }
        });

    }
    
    update(context){
        
        this.drawSquares(context);
        this.validateSquareExistance(context);
        this.moveSquaresDown();

    }


}




var waves;
var kill;
var damage;

class Player{
    SHOOT_DELAY=10;
    PROJECTILE_INTERVAL=120;
    triggeredRound=true;
    constructor(x, y, radius, color, speed, projectileCount, environment){

        this.trajectoryCircles = [];
        this.enabled=false;
        this.environment=environment;
        this.projectiles = [];
        this.isShooting=true;
        this.x = x;
        this.y = y;
        this.lastX=this.x;
        this.lastY=this.y;
        this.projectileCount=projectileCount;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.left = false;
        this.right = false;
        this.dx = 3 * this.speed.x;
        this.dy = 3 * this.speed.y;
        this.splashProjectiles=[];
        setTimeout(() => {
            this.isShooting=false;
            this.enabled=true;
        },  1000) 

        canvas.onclick = e => {
            if(this.isShooting)return;
            this.enabled=false;
            setTimeout(() => {
                this.enabled=true;
            },  1000)
            this.isShooting=true;
            this.left=false;
            this.right=false;
            const angle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
            const velocity = {
                x: Math.floor(Math.cos(angle)*20),
                y: Math.floor(Math.sin(angle)*20)
            }
            
            for(let i=0; i<projectileCount; i++){
                setTimeout(() => {
                    this.playCollision('assets/gunfire.mp3',0.2);
                    let circle;
                    let randomSize=Math.floor(Math.random()*10+5);
                    let soundPath='thock.mp3';
                    if(randomSize<8){
                        soundPath='ping.mp3'
                    }
                    if(randomSize<13){
                        soundPath='pong.mp3'
                    }
                    // if(randomInt==0){
                    //     circle=new Circle(player.x, player.y+1, 7, '#e5d8b6', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,1,'./assets/ping.mp3')
                    // }else if(randomInt==1){
                    //     circle=new Circle(player.x, player.y+1, 12, '#d9b6e0', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,2,'./assets/pong.mp3')
                    // }else{
                    //     circle=new Circle(player.x, player.y+1, 22, '#8274c9', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,3,'./assets/thock.mp3')
                    // }                 

                    circle=new Circle(player.x, player.y+1, randomSize, `hsl(${Math.random()*360},50%,50%)`, '#5d9cbd', velocity, this.playCollision,Math.floor(Math.random()*2+1),'./assets/'+soundPath);
                    this.projectiles.push(
                        circle
                    )

                },  i*this.PROJECTILE_INTERVAL)
            }
            setTimeout(() => {
                this.triggeredRound=false;
            },  this.PROJECTILE_INTERVAL*3)
        
        }

        window.onkeydown = (e) => {
            if(this.isShooting)return;
            switch (e.keyCode) {
              case 65:
                this.left = true;
                break;
              case 68:
                this.right = true;
                break;
            }
          };
          window.onkeyup = (e) => {
            if(this.isShooting)return;
            switch (e.keyCode) {
              case 65:
                this.left = false;
                break;
              case 68:
                this.right = false;
                break;
            }
          };
        
        this.playCollision = (path,volume)=>{
            this.collisionSound = document.createElement("audio");
            this.collisionSound.src = path;
            this.collisionSound.setAttribute("preload", "auto");
            this.collisionSound.setAttribute("controls", "none");
            this.collisionSound.style.display = "none";
            this.collisionSound.volume=volume;
            document.body.appendChild(this.collisionSound);
            this.collisionSound.play();
        }
        this.initTrajectories();


    }
    
    updatePosition(){
        if(this.isShooting)return;
        if(this.left&&this.x-this.radius>=0) this.x -= this.speed;
        if(this.right&&this.x<=window_width-environment.X_BORDER-(window_width-environment.X_BORDER-1)/8) this.x += this.speed;
    }

    updateProjectiles(context){
        if(this.projectiles.length<=0&&this.enabled)this.isShooting=false;

        this.projectiles.forEach((projectile, idx) => {
            projectile.update(context);
            
            if(projectile.y - projectile.radius > window_height){
                
                this.projectiles.splice(idx, 1);

            }
            this.environment.squares.forEach(square => {   
                var distX = Math.abs(projectile.x - square.x - square.width / 2);
                var distY = Math.abs(projectile.y - square.y - square.height / 2);
                
                if (distX > (square.width / 2 + projectile.radius)) {
                    return;    
                }
                if (distY > (square.width / 2 + projectile.radius)) {
                    return;
                }
            
                if (distX <= (square.width / 2)) {
                    //- naik
                    //+ turun  
                    projectile.dy*=-1;
                    this.playCollision(projectile.soundPath,0.5);
                    this.initC(projectile.x,projectile.y,projectile.dx,projectile.dy,false,square.color,square.hp*2);
                    square.hp-=projectile.damage;
                    damage+=projectile.damage;
                    // this.randomizeDir(projectile);


                }
                if (distY <= (square.height / 2)) {
                    //- berarti kiri
                    //+ berarti kanan
                    projectile.dx*=-1;
                    this.playCollision(projectile.soundPath,0.5);
                    this.initC(projectile.x,projectile.y,projectile.dx,projectile.dy,true,square.color,square.hp*2);
                    square.hp-=projectile.damage;
                    damage+=projectile.damage;

                    // this.randomizeDir(projectile);                    
                }
            }) 
            


            
        });
    }
    randomizeDir(projectile){
        var d=0;
        //naik dan ke kiri
        if(projectile.dy<0&&projectile.dx<0){
            d=Math.floor(Math.random()*89+271);
        }
        //naik dan ke kanan
        else if(projectile.dy<0&&projectile.dx>0){
            d=Math.floor(Math.random()*89+1);
        }
        //turun dan ke kiri
        else if(projectile.dy>0&&projectile.dx<0){
            d=Math.floor(Math.random()*89+181);
        }
        //turun dan ke kanan
        else if(projectile.dy>0&&projectile.dx>0){                        
            d=Math.floor(Math.random()*89+91);
        }
        var r = (d*180)/Math.PI;
        projectile.dx=Math.sin(r)*20;
        projectile.dy=Math.cos(r)*20;
    }
    updateRound(){
        if(!this.triggeredRound&&this.enabled&&this.projectiles.length<=0){
            environment.triggerRound();
            this.triggeredRound=true;
        } 
    }
    
    disrenderProjectiles(context){
        this.projectiles.forEach((projectile) => {
            projectile.disrender(context);
        });
    }



    initTrajectories(){
        let tAngle = Math.atan2(339 - this.y, 647 - this.x);
        this.tVelocity = {
            x: Math.floor(Math.cos(tAngle)*20),
            y: Math.floor(Math.sin(tAngle)*20)
        }

        
        
        canvas.onmousemove = e =>{
            let tAngle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
            this.tVelocity = {
                x: Math.floor(Math.cos(tAngle)*20),
                y: Math.floor(Math.sin(tAngle)*20)
            }

        }
        for(let i=0;i<10;i++)
            this.trajectoryCircles.push(new TrajectoryCircle(this.x,this.y+1,8,this.tVelocity,i*10));
        
    }
    updateTrajectories(context){
        
        if(this.isShooting)return;

        let isDead=-1;
        this.trajectoryCircles.forEach((circle,idx) => {
            let t=circle.travelTime++;
            circle.update(this.tVelocity,this.x,this.y);
            for(let i=0;i<t;i++){
                circle.calculate();
                
                this.environment.squares.forEach(square => {   
                    var distX = Math.abs(circle.x - square.x - square.width / 2);
                    var distY = Math.abs(circle.y - square.y - square.height / 2);
                    
                    if (distX > (square.width / 2 + circle.radius)) {

                    }
                    else if (distY > (square.width / 2 + circle.radius)) {
                    }
                    else{
                        if (distX <= (square.width / 2)) {
                            //+ turun  
                            circle.dy*=-1;
    
                        }
                        if (distY <= (square.height / 2)) {
                            circle.dx*=-1;
                        }
    
                    } 
                    
                })
                

            
                if(circle.travelTime>100){
                    isDead=idx;
                }
            }
            circle.draw(context);

        });
        if(isDead!=-1){
            this.trajectoryCircles.splice(isDead,1);
            this.trajectoryCircles.push(new TrajectoryCircle(this.x,this.y+1,8,this.tVelocity,0));
    
        }

    }
    initC(xStart, yStart, dx, dy, xAxis, collideColor, count){      
        for(let i=0;i<count;i++){
            this.splashProjectiles.push(new Particle(xStart,yStart,Math.floor(Math.random()*4+1), collideColor, {x: Math.floor(dx/Math.floor(Math.random()*3+2)+((Math.random()*5-2)*!xAxis)),y: Math.floor(dy/Math.floor(Math.random()*8+2)+((Math.random()*5-2)*xAxis))}));
        }
    }

    animateC(context){
        this.splashProjectiles.forEach((p,idx) => {
            p.update(context);
            if(p.alpha<=0)this.splashProjectiles.splice(idx,1);    
        });
    }

    update(context){
        this.lastX=this.x;
        this.lastY=this.y;
        this.animateC(context);
        this.updateProjectiles(context);
        this.updatePosition();
        this.updateRound();
        this.updateTrajectories(context);
    }
    draw(context){
        context.beginPath();
        context.fillStyle=this.color;

        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    
    }
    disrender(context){
        context.beginPath();
        context.clearRect(this.lastX-this.radius-1, this.lastY-this.radius-1, this.radius*2+2, this.radius*2+2);
        context.closePath();
    }   
}
let environment;




let player ;






let waveTxt=document.getElementById('wave-value');
let killTxt=document.getElementById('kill-value');
let damageTxt=document.getElementById('damage-value');



function playBg(){
    let bgMusic = document.createElement("audio");
    bgMusic.src = './assets/bgMusic.mp3';
    bgMusic.setAttribute("preload", "auto");
    bgMusic.setAttribute("controls", "none");
    bgMusic.style.display = "none";
    bgMusic.id="bg-music";
    document.body.appendChild(bgMusic);
    document.getElementById("bg-music").volume=0.05;
    document.getElementById("bg-music").loop=true;
    
    bgMusic.play();

}
function init(){
    hasLost=false;
    environment=new Environment();

    player = new Player(window_width/2, window_height-5, 20, '#5d9cbd', 9,40,environment);

    waves=0;
    kill=0;
    damage=0;
}
 
init();
const animate = () => {
    if(hasLost)return;
    requestAnimationFrame(animate);
    waveTxt.textContent=waves;
    killTxt.textContent=kill;
    damageTxt.textContent=damage;
    // player.disrender(ctx);
    // player.disrenderProjectiles(ctx);    
    // environment.disrender(ctx);
    if(player.isShooting)ctx.fillStyle='rgba(0,0,0,1)';
    if(!player.isShooting)ctx.fillStyle='rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    player.update(ctx);
    player.draw(ctx);
    environment.update(ctx);
}


let playAgainBtn=document.getElementById('play-again');
var popup=document.getElementById('popup-page');
popup.style.display='flex';


firstGame=true;
playAgainBtn.addEventListener('click', ()=>{
    if(hasLost)init();
    
    environment.triggerRound();
    setTimeout(() => {
        environment.triggerRound();
    },  200) 
    setTimeout(() => {
        environment.triggerRound();
    },  400) 
    setTimeout(() => {
        environment.triggerRound();
    },  600) 

        popup.style.display='none';
        if(firstGame)playBg();
        firstGame=false;
        animate();

    
})






