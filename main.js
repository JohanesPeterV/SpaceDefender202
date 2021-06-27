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
        context.font='20px sans-serif';
        context.strokeStyle=this.lnColor;
        context.stroke();
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
        context.closePath();
    }

}


class Circle{
    constructor(x, y, radius, color, lnColor, speed, yBorder ,xBorder, collideAudio){
        this.yBorder=yBorder;
        this.xBorder=xBorder;
        this.collideAudio=collideAudio;
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
        context.strokeStyle=this.lnColor;
        context.lineWidth=1;
        context.stroke();
        context.closePath();
    }
    
    update(context){

        this.draw(context);

        if((this.x + this.radius) > window_width-this.xBorder){
            this.dx = this.dx * -1;
            this.collideAudio('./assets/pong.mp3');
        }

        if( this.x - this.radius < this.xBorder){
            this.dx = this.dx * -1;
            this.collideAudio('./assets/pong.mp3');
        }
        
        if(this.y - this.radius <= this.yBorder){
            this.dy = this.dy * -1;
            this.collideAudio('./assets/pong.mp3');
        }

        this.x += this.dx;
        this.y += this.dy;

    }
}

class Environment{
    SQUARE_SIZE=60;
    SQUARE_GAP=0;
    X_BORDER=(window_width-this.SQUARE_SIZE*30)/2;
    Y_BORDER=40;
    pushing=false;
    ROUND_INTERVAL=1000/30;
    hasLost=false;
    triggerRound=function(){
        this.pushSquaresDown();
        for(let i=0;i<30;i++){
            if(Math.floor(Math.random()*6)!=1)this.squares.push(new Square(this.X_BORDER+(i*(this.SQUARE_SIZE+this.SQUARE_GAP)), this.Y_BORDER+this.SQUARE_GAP, this.SQUARE_SIZE, this.SQUARE_SIZE, Math.floor((Math.random()*6)+6), 'white','#007cbd'));
        }
    }
    constructor(){
        
        this.border = new DisplaySquare(0, 0, window_width, this.Y_BORDER+this.SQUARE_SIZE, 'JPantul', '#121212','white','#121212');
        this.squares =[];
        this.triggerRound();
        setTimeout(() => {
            this.triggerRound();
        },  1000) 
        setTimeout(() => {
            this.triggerRound();
        },  2000) 
        setTimeout(() => {
            this.triggerRound();
        },  3000) 

    }
    pushSquaresDown(){
        this.pushing=true;
    }
    moveSquaresDown(){

        if(this.pushing==false)return;

        let miniPush=(this.SQUARE_SIZE+this.SQUARE_GAP)/30;
        for(let i = 0 ; i<30; i++){
            this.squares.forEach(square => {
            setTimeout(() => {
                square.y+=miniPush;
            },  i*this.ROUND_INTERVAL) 
            });
        }
        this.pushing=false;

    }
    drawSquares(context){
        this.squares.forEach(square => {
            square.draw(context);
        });
    }
    validateSquareExistance(){
        
        this.squares.forEach((square,idx) => {
            if(square.hp<=0){
                this.squares.splice(idx,1);
            }
            if(square.y>=window_height){
                this.hasLost=true;
            }
        });

    }
    
    update(context){
        
        this.drawSquares(context);
        this.validateSquareExistance();
        this.moveSquaresDown();
        this.border.draw(context);

    }


}




class Player{
    PROJECTILE_RADIUS=6;
    SHOOT_DELAY=10;
    
    PROJECTILE_INTERVAL=30;
    triggeredRound=true;

    constructor(x, y, radius, color, speed, projectileCount, environment){
        this.enabled=false;
        this.environment=environment;
        this.projectiles = [];
        this.isShooting=true;
        this.x = x;
        this.y = y;
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
        },  4000) 
        canvas.onmouseover = e =>{
            const angle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
        }
        canvas.onclick = e => {
            
            if(this.isShooting)return;
            this.enabled=false;
            setTimeout(() => {
                this.enabled=true;
            },  4000)
            this.isShooting=true;
            this.left=false;
            this.right=false;
            const angle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
            const velocity = {
                x: Math.cos(angle)*5,
                y: Math.sin(angle)*5
            }
            for(let i=0; i<projectileCount; i++){
                setTimeout(() => {
                    this.projectiles.push(
                        new Circle(player.x, player.y, this.PROJECTILE_RADIUS, '#ddffff', '#5d9cbd', velocity, environment.Y_BORDER+environment.SQUARE_SIZE, environment.X_BORDER, this.playCollision)
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

    }
    
    updatePosition(){
        if(this.isShooting)return;
        if (this.left&&this.x>=(environment.X_BORDER)*2) this.x -= this.speed;
        if (this.right&&this.x<=window_width-environment.X_BORDER-(window_width-environment.X_BORDER-1)/8) this.x += this.speed;
    }

    updateProjectiles(context){
        if(this.projectiles.length<=0&&this.enabled)this.isShooting=false;

        this.projectiles.forEach((projectile, idx) => {
            projectile.update(context);
            if(projectile.y + projectile.radius > window_height){
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
                    projectile.dy*=-1;
                    square.hp-=1;
                    this.playCollision('./assets/pong.mp3');
                }
                if (distY <= (square.height / 2)) {
                    projectile.dx*=-1;
                    square.hp-=1;
                    this.playCollision('./assets/pong.mp3');
                }
            })                
        });
    }
    updateRound(){
        if(!this.triggeredRound&&this.enabled&&this.projectiles.length<=0){
            environment.triggerRound();
            this.triggeredRound=true;
        } 
    }
    update(context){
        this.updateProjectiles(context);
        this.updatePosition();
        this.updateRound();
    }
    
    draw(context){

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=this.color;
        context.fill();
        context.lineWidth=1;
        context.stroke();
        context.closePath();
    
    }
    
}
let environment=new Environment();


let player = new Player(window_width/2, window_height-5, 10, '#5d9cbd', 9,80,environment);





const animate = () => {

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    
    player.draw(ctx);
    player.update(ctx);
    environment.update(ctx);
}




animate();






