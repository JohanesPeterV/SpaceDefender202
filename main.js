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
    }
    setBgColor(context){
        
        
        if(this.maxHp==this.hp)context.fillStyle=this.BG_COLOR_1;
        else if(this.hp>(this.maxHp*4)/5){
            context.fillStyle=this.BG_COLOR_2;
        }
        else if(this.hp>(this.maxHp*3)/5){
            context.fillStyle=this.BG_COLOR_3;
        }
        else if(this.hp>(this.maxHp*2)/5){
            context.fillStyle=this.BG_COLOR_4;
        }
        else if(this.hp>(this.maxHp*1)/5){
            context.fillStyle=this.BG_COLOR_5;
        }
        else{
            context.fillStyle=this.BG_COLOR_6
        }


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
        context.font='1vw sans-serif';
        // context.strokeStyle=this.lnColor;
        // context.stroke();
        // context.closePath();
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
        context.font='20px sans-serif';
        context.strokeStyle=this.lnColor;
        context.stroke();
        // context.closePath();
    }

}


class Circle{

    constructor(x, y, radius, color, lnColor, speed, yBorder ,xBorder, collideAudio, damage, soundPath){
        this.damage=damage;
        this.soundPath=soundPath;
        this.yBorder=yBorder;
        this.xBorder=xBorder;
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
    randomizeDir(projectile){
        var angle;
        //naik dan ke kiri
        console.log(projectile.dx);
        if(projectile.dy<0&&projectile.dx>0){
            angle= Math.atan2(Math.floor(Math.random*10), Math.floor(Math.random*10));
            console.log('naik dan ke kiri');
        }
        //naik dan ke kanan
         if(projectile.dy<0&&projectile.dx<0){
            
            console.log('naik dan ke kanan');

        }
        //turun dan ke kiri
         if(projectile.dy>0&&projectile.dx>0){

            console.log('turun dan ke kiri');

        }
        //turun dan ke kanan
         if(projectile.dy>0&&projectile.dx<0){                        
            
            console.log('turun dan ke kanan');

        }


        angle= Math.atan2(Math.floor(Math.random*10)+1, Math.floor(Math.random*10)+1);
        angle= Math.atan2(1, 1);

        projectile.dx=Math.cos(angle)*20;
        projectile.dy=Math.sin(angle)*20;
    }    
    update(context){
        this.lastX=this.x;
        this.lastY=this.y;

        this.draw(context);
        this.dx=Math.floor(this.dx);
        this.dy=Math.floor(this.dy);
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > window_width-this.xBorder){
            
            this.dx = this.dx * -1;
            this.collideAudio(this.soundPath);
            // this.randomizeDir(this);
        }

        if( this.x - this.radius <= this.xBorder){
            // this.x=this.xBorder+this.radius;
            this.dx = this.dx * -1;
            this.collideAudio(this.soundPath);
            // this.randomizeDir(this);

        }
        
        if(this.y - this.radius <= this.yBorder){
            this.y=this.yBorder+this.radius;
            this.dy = this.dy * -1;
            this.collideAudio(this.soundPath);
            // this.randomizeDir(this);

        }

    }
    disrender(context){
        context.beginPath();

        context.clearRect(this.lastX-this.radius-1, this.lastY-this.radius-1, this.radius*2+2, this.radius*2+2);
        context.closePath();

    }
}

class TrajectoryCircle{
    travelTime=0;
    constructor(x, y, radius,  speed, yBorder ,xBorder,travelTime){
        this.travelTime=travelTime;
        this.alpha=1;
        this.yBorder=yBorder;
        this.xBorder=xBorder;
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
        this.alpha-=0.0016;
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

        if(this.x + this.radius > window_width-this.xBorder){
            this.dx*=-1;
        }

        if( this.x - this.radius <= this.xBorder){
            // this.x=this.xBorder+this.radius;
            this.dx*=-1;
        }
        
        if(this.y - this.radius <= this.yBorder){
            this.y=this.yBorder+this.radius;
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

class Environment{
    SQUARE_SIZE=60;
    SQUARE_GAP=0;
    X_BORDER=(window_width-this.SQUARE_SIZE*30)/2;
    Y_BORDER=100;
    pushing=false;
    ROUND_INTERVAL=200/30;
    hasLost=false;
    triggerRound=function(){
        this.pushSquaresDown();
        for(let i=0;i<30;i++){
            if(Math.floor(Math.random()*3)!=1)this.squares.push(new Square(this.X_BORDER+(i*(this.SQUARE_SIZE+this.SQUARE_GAP)), this.Y_BORDER+this.SQUARE_GAP, this.SQUARE_SIZE, this.SQUARE_SIZE, Math.floor((Math.random()*6)+6), 'white','#007cbd'));
        }
    }
    constructor(){
        
        this.border = new DisplaySquare(0, 0, window_width, this.Y_BORDER+this.SQUARE_SIZE, 'JPantul', '#121212','white','#121212');
        this.squares =[];
        this.triggerRound();
        setTimeout(() => {
            this.triggerRound();
        },  200) 
        setTimeout(() => {
            this.triggerRound();
        },  400) 
        setTimeout(() => {
            this.triggerRound();
        },  600) 

    }
    pushSquaresDown(){
        this.pushing=true;
    }
    moveSquaresDown(){
        if(this.pushing==false)return;
        let miniPush=(this.SQUARE_SIZE+this.SQUARE_GAP)/30;
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
            }
            if(square.y>=window_height){
                this.hasLost=true;
            }
        });

    }
    
    update(context){
        
        this.drawSquares(context);
        this.validateSquareExistance(context);
        this.moveSquaresDown();
        this.border.draw(context);

    }


}




class Player{
    SHOOT_DELAY=10;
    PROJECTILE_INTERVAL=60;
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
                    let circle;
                    let randomSize=Math.floor(Math.random()*10+5);
                    let soundPath='thock.mp3';
                    if(randomSize<13){
                        soundPath='ping.mp3'
                    }
                    if(randomSize<18){
                        soundPath='pong.mp3'
                    }
                    // if(randomInt==0){
                    //     circle=new Circle(player.x, player.y+1, 7, '#e5d8b6', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,1,'./assets/ping.mp3')
                    // }else if(randomInt==1){
                    //     circle=new Circle(player.x, player.y+1, 12, '#d9b6e0', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,2,'./assets/pong.mp3')
                    // }else{
                    //     circle=new Circle(player.x, player.y+1, 22, '#8274c9', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,3,'./assets/thock.mp3')
                    // }                           
                    circle=new Circle(player.x, player.y+1, randomSize, `hsl(${Math.random()*360},50%,50%)`, '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision,Math.floor(Math.random()*3+1),'./assets/'+soundPath);
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
        
        this.playCollision = (path)=>{
            this.collisionSound = document.createElement("audio");
            this.collisionSound.src = path;
            this.collisionSound.setAttribute("preload", "auto");
            this.collisionSound.setAttribute("controls", "none");
            this.collisionSound.style.display = "none";
            document.body.appendChild(this.collisionSound);
            this.collisionSound.play();
        }
        this.initTrajectories();


    }
    
    updatePosition(){
        if(this.isShooting)return;
        if(this.left&&this.x>=(environment.X_BORDER)*2) this.x -= this.speed;
        if(this.right&&this.x<=window_width-environment.X_BORDER-(window_width-environment.X_BORDER-1)/8) this.x += this.speed;
    }

    updateProjectiles(context){
        if(this.projectiles.length<=0&&this.enabled)this.isShooting=false;

        this.projectiles.forEach((projectile, idx) => {
            projectile.update(context);
            
            if(projectile.y - projectile.radius > window_height){
                
                projectile.disrender(context);
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
                    square.hp-=projectile.damage;
                    this.playCollision(projectile.soundPath);
                    // this.randomizeDir(projectile);


                }
                if (distY <= (square.height / 2)) {
                    //- berarti kiri
                    //+ berarti kanan
                    projectile.dx*=-1;
                    square.hp-=projectile.damage;
                    this.playCollision(projectile.soundPath);
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
        for(let i=0;i<30;i++)
            this.trajectoryCircles.push(new TrajectoryCircle(this.x,this.y+1,12,this.tVelocity,environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER,i*20));
        
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
                

            
                if(circle.travelTime>600){
                    isDead=idx;
                }
            }
            circle.draw(context);

        });
        if(isDead!=-1){
            this.trajectoryCircles.splice(isDead,1);
            this.trajectoryCircles.push(new TrajectoryCircle(this.x,this.y+1,12,this.tVelocity,environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER,0));
    
        }

    }
    update(context){
        this.lastX=this.x;
        this.lastY=this.y;
        this.updateProjectiles(context);
        this.updatePosition();
        this.updateRound();
        this.updateTrajectories(context);
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=this.color;
        context.fill();
        context.closePath();
    
    }
    disrender(context){
        context.beginPath();
        context.clearRect(this.lastX-this.radius-1, this.lastY-this.radius-1, this.radius*2+2, this.radius*2+2);
        context.closePath();
    }   
}
let environment=new Environment();


let player = new Player(window_width/2, window_height-5, 25, '#5d9cbd', 9,3,environment);




const animate = () => {
    requestAnimationFrame(animate);
    // player.disrender(ctx);
    // player.disrenderProjectiles(ctx);
    
    // environment.disrender(ctx);
    ctx.fillStyle='rgba(0,0,0,0.4)';
    
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    player.draw(ctx);
    player.update(ctx);
    environment.update(ctx);

}




animate();






