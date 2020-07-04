const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


let mouse = {
    x: undefined,
    y: undefined
}

// let minRadius = 2;
let maxRadius = 40;

let colorArray = [
    '#111d5e',
    '#c70039',
    '#f37121',
    '#ffbd69',
    '#01a9b4'
]

window.addEventListener('mousemove', (event) =>{
    mouse.x = event.x;
    mouse.y = event.y;
})


window.addEventListener('resize' , () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color =  colorArray[Math.floor(Math.random()*colorArray.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.radius, 0,Math.PI * 2,false);
        c.stroke();
        c.fillStyle =  this.color;
        c.fill();
    }

    this.update = function () {
        if(this.x+this.radius > innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y+this.radius > innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }
        else{
            if(this.radius > this.minRadius){
                this.radius -= 1;
            }
        }

        this.draw();
    }
}



let circleArray = [];


function init(){
    circleArray = [];
    for( i = 0;i < 1000 ;i++){
        let radius = Math.random() * 3 + 1;
        let x = Math.random()*(innerWidth - 2*radius)+radius;
        let y = Math.random()*(innerHeight - 2*radius)+radius;
        let dx = (Math.random() - 0.5) ;
        let dy = (Math.random() - 0.5) ;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for( i = 0; i< circleArray.length ; i++){
        circleArray[i].update();
    }
    
}

init();
animate();