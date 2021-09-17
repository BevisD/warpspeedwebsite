//Number of Stars
let n = 200;

let stars = [];


function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    
    //Fill Star Array
    for (let i = 0; i < n; i++) {
        stars.push(new Star(p5.Vector.random2D().mult(random(10,max(width,height)/2))));      
    }
}

function draw(){
    noStroke();
    
    //Background with Alpha to create streak effect
    fill(0,20)
    rect(0,0,width,height);

    for(star of stars){
        star.display();
        star.update();
    }



}

class Star {
    constructor(s){
        this.s = s;
        this.ps= s;

        //Larger velocity for stars near edge
        this.v = s.copy().setMag(map(s.mag(),0,max(width,height)/2,0,10));
    }

    display(){
        //Brighter Stars near edge
        this.stroke = map(this.v.mag(),5,15,150,255);
        stroke(this.stroke);

        push();
        translate(width/2,height/2);
        line(this.s.x,this.s.y,this.ps.x,this.ps.y);
        pop();
    }

    update(){
        this.v = this.s.copy().setMag(map(this.s.mag(),0,max(width,height)/2,0,10));

        this.ps = this.s.copy();
        this.s.add(this.v);

        //Move stars back to centre when past edge
        if (this.s.x < -width/2 || this.s.x > width/2 || this.s.y < -height/2 || this.s.y > height/2) {
            this.s = p5.Vector.random2D().mult(random(0,max(width,height)/2));
            this.ps = this.s.copy();
        }
    }
}

//Keep full screen
function windowResized(){
    resizeCanvas(window.innerWidth,window.innerHeight)
}