let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width
canvas.height = window_height

canvas.style.background = '#121212'












class Square{
    constructor(x, y, width, height, hp){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
    }
    draw(context){
        context.beginPath();
    
        context.rect(this.x, this.y, this.width, this.height)
        context.fillStyle='salmon'
        context.fill();

        context.fillStyle = 'black'
        context.fillText(this.hp, this.x + this.width/2, this.y + this.height/2)
        context.textAlign='center'
        context.textBaseline='middle'
        context.font='20px sans-serif'

    
        context.stroke()
        context.closePath()
    }
}


class Circle{

    constructor(x, y, radius, color, lnColor, speed){
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
        context.fill()
        context.strokeStyle=this.lnColor;
        context.lineWidth=1;
        context.stroke();
        context.closePath();
    }
    
    update(context){

        this.draw(context);

        if((this.x + this.radius) > window_width){
            this.dx = this.dx * -1;
        }

        if( this.x - this.radius < 0){
            this.dx = this.dx * -1;
        }
        
        if(this.y - this.radius < 0){
            this.dy = this.dy * -1;
        }

        this.x += this.dx;
        this.y += this.dy;    
    }
}






class Player{
    
    constructor(x, y, radius, color, speed, projectileCount){
        this.projectiles = [];
        this.isShooting=false;
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
        canvas.onmouseover = e =>{
            const angle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
            
        }
        canvas.onclick = e => {
            this.left=false;
            this.right=false;
            if(this.isShooting)return;
            this.isShooting=true;
            const angle = Math.atan2(e.clientY - this.y, e.clientX - this.x);
            const velocity = {
                x: Math.cos(angle)*5,
                y: Math.sin(angle)*5
            }
            for(let i=0; i<projectileCount; i++){
                setTimeout(() => {
                    this.projectiles.push(
                        new Circle(player.x, player.y, 5, '#ddffff', '#5d9cbd', velocity)
                    )
                },  i*30) 
                setTimeout(()=>{
                    this.isShooting=false;
                },projectileCount*80)
            }
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
          
    }
    updatePosition(){
        if (this.left&&this.x>=0) this.x -= this.speed;
        if (this.right&&this.x<=window_width) this.x += this.speed;
    }
    updateProjectiles(context){
        this.projectiles.forEach((projectile, idx) => {
            projectile.update(context);
            if(projectile.y + projectile.radius > window_height){
                this.projectiles.splice(idx, 1);
            }
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
            }
            if (distY <= (square.height / 2)) {
                projectile.dx*=-1;
                square.hp-=1;
            }
        })
    }

    update(context){
        this.updateProjectiles(context);
        this.updatePosition();
    }
    draw(context){

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle=this.color;
        context.fill()
        context.lineWidth=1;
        context.stroke();
        context.closePath();
    
    }
    
}

let square = new Square(30, 30, 30, 30, 30);

let player = new Player(window_width/2, window_height-5, 10, '#5d9cbd', 9,1);


const squares =[];



const animate = () => {

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    if(square.hp>=0)square.draw(ctx);
    
    player.draw(ctx);
    player.update(ctx);
    
}




animate();






