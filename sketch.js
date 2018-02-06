var x0, x1, x2, x3, y, y0, r, maxr, minr;

var shAmount=20;

var threshold = 10;
var accChangeX = 0; 
var accChangeY = 0;
var accChangeT = 0;

var myoriginSpecies;
var myfirstSpecies;
var mysecondSpecies;
var mythirdSpecies;
var myoriginShadow;
var myfirstShadow;
var mysecondShadow;
var mythirdShadow;


//var firstLp = 100;
//var secondLp = 100;
//var thirdLp = 100;

var shakeValue = 0;
//var mic;
var soundValue = 0;
var rotateValue = 0;

var originHue = 100;
var originSize;
var originShape = 6;

var firstHue = 100;
var firstSize;
var firstShape = 6;

var secondHue = 100; 
var secondSize;
var secondShape = 6;

var thirdHue = 100; 
var thirdSize;
var thirdShape = 6;

// console debug log 
var loggo = 'nope';
var loggo2 = 'nope';
var loggo3='niende';


//counter for frames
var k=0;
//constant that remember the maximum number of frames
var c=60;
// Control counter of maximum frames that i need
var framecounter = 0;

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  //mic= new p5.AudioIn();
  //mic.start();
    
  x0 = width/2;
  x1 = width/2-height/2;
  x2 = width/2;
  x3 = width/2+height/2;
  y = height *2 /3;
  y0 = height/4;
  r = height * 2/15;
  maxr = height/6;
  minr = height/10;
    
  originSize = r;
  firstSize = r;
  secondSize = r;
  thirdSize = r;
    
  }

function draw() {
  background(240);
    
  setShakeThreshold(10);
  
  //var vol = mic.getLevel();
  var vol=0.02;
    
    
    
  //Background construction    
  environment(vol);
    
   //text(loggo,100,100); 
   //text(loggo2,100,150);
   //text(height/10,50,100);      

    /*
  //Drawing the lines
    var shiftingY = height/10;
    var shiftingX = height/7;
    strokeWeight(10);
    stroke(0);
    //line to first species
    line(x0-shiftingX,y0+shiftingY,x1+shiftingX,y-shiftingY);
    //line to second species
    line(x0,y0+shiftingX,x0,y-shiftingX);
    //line to third species
    line(x0+shiftingX,y0+shiftingY,x3-shiftingX,y-shiftingY);
    noStroke();
    */
    
 
    //the origin species
  var originshadowColore = color(360, 50, 0, 0.6);
  myoriginShadow = new Species(x0 + 10, y0 + 10, originSize, originShape, originshadowColore);
  myoriginShadow.display();
    
  var originColore = color(originHue, 50, 90, 1);
  myoriginSpecies = new Species(x0, y0, originSize, originShape, originColore);
  myoriginSpecies.display();

  //the crown
  fill(50,100,100);
  triangle(x0 - 35, y0 - originSize - 30 , x0 - 28, y0 - originSize - 5 , x0 + 28, y0 - originSize - 5);
  triangle(x0 + 35, y0 - originSize - 30 , x0 + 28, y0 - originSize - 5 , x0 - 28, y0 - originSize - 5);  
  triangle(x0, y0 - originSize -45 , x0 - 30, y0 - originSize - 5 , x0 + 30, y0 - originSize - 5);

    
    //species sensitive to shake
  var firstLp = 100 - shakeValue;
  var firstAlpha = firstLp / 100;
  var firstColore = color(firstHue, 50, 90, firstAlpha);
  
//  fill(0);
//  textSize(40);
//  textAlign(CENTER);
//  text(firstLp, x1, y+100);
   
  var firstshadowColore = color(360, 50, 0, 0.6);
  myfirstShadow = new Species(x1 + 10, y + 10, firstSize, firstShape, firstshadowColore);
  myfirstShadow.display();
    
  myfirstSpecies = new Species(x1, y, firstSize, firstShape, firstColore);
  myfirstSpecies.display();
   
    
//species sensitive to sound

  
  var secondLp = round(100-soundValue);
        
  soundValue=soundValue+0.4;
  //soundValue = round(soundValue + vol/0.05);
      
  var secondAlpha = secondLp / 100;
  var secondColore = color(secondHue, 50, 90, secondAlpha);
  
  var secondshadowColore = color(360, 50, 0, 0.6);
  mysecondShadow = new Species(x2 + 10, y + 10, secondSize, secondShape, secondshadowColore);
  mysecondShadow.display();
    
  mysecondSpecies = new Species(x2,y, secondSize, secondShape, secondColore);
//  fill(0);
//  text(secondLp, x2 ,y + 100);
//  text(vol, x2 ,y + 150);
    
  mysecondSpecies.display();

    //species sensitive to rotation
 var thirdLp = 100 - rotateValue ;  
    
 var degree = map(rotationY,-90,90,-1,1);    
 var rotateRate = abs(degree);
 if (rotateRate > 0.2) {
    var ifRotate = 1;
  } else {
    ifRotate = 0;
  }
    rotateValue = round(rotateValue + ifRotate * rotateRate / 0.8);

  
    
  var thirdAlpha = thirdLp / 100;
  var thirdColore = color(thirdHue, 50, 90, thirdAlpha);
  
//  fill(0);
//  text(thirdLp, x3, y+100);  
    
  var thirdshadowColore = color(360, 50, 0, 0.6);
  mythirdShadow = new Species(x3 + 10, y + 10, thirdSize, thirdShape, thirdshadowColore);
  mythirdShadow.display();
    
  mythirdSpecies = new Species(x3, y, thirdSize, thirdShape, thirdColore);
  mythirdSpecies.display();
 
   
    
  //to pick the only one who survive
   //fill(0);
  
     if (thirdLp <= 0){
         if (firstLp <= 0){
        loggo2 ='if 2 colpisce';
        
       originHue = secondHue;
       originSize = secondSize;
       originShape = secondShape;
                         
       firstHue = secondHue;
       firstSize = round(random(minr,maxr));
       firstShape = round(random(3,8));
        
       thirdHue = round(random(0,360)); 
       thirdSize = round(random(minr,maxr));
       thirdShape = secondShape;
        
       secondHue = round(random(0,360)); 
       secondShape = round(random(3,8)); 
 

    //to renew the hp of new generation
    shakeValue = 0;
    soundValue = 0;
    rotateValue = 0;
                 checkIfConditions(true);

     
        }
         }
    
     else {
        loggo='If 2 non verificato';
  }
    
    //SECONDO IF 
    if ((thirdLp <= 0) && (secondLp <= 0)){

     loggo2 ='if 1 colpisce';     
        
       originHue = firstHue;
       originSize = firstSize;
       originShape = firstShape;   
        
       secondHue = round(random(0,360)); 
       secondSize = firstSize;
       secondShape = round(random(3,8));
       
       thirdHue = round(random(0,360)); 
       thirdSize = round(random(minr,maxr));
       thirdShape = firstShape;
       
       firstSize = round(random(minr,maxr));
       firstShape = round(random(3,8));
       

    //to renew the hp of new generation
    shakeValue = 0;
    soundValue = 0;
    rotateValue = 0;
            checkIfConditions(true);

   
    }
    else {
        
        loggo='If 1 non verificato';
  }
 
    
     
    //TERZO IF 
    if (secondLp <= 0){
         if (firstLp <= 0){
        loggo2 ='if 2 colpisce';
        
       originHue = thirdHue;
       originSize = thirdSize;
       originShape = thirdShape; 
             
       firstHue = thirdHue;
       firstSize = round(random(minr,maxr));
       firstShape = round(random(3,8));
       
       secondHue = round(random(0,360)); 
       secondSize = thirdSize;
       secondShape = round(random(3,8));
       
       thirdHue = round(random(0,360)); 
       thirdSize = round(random(minr,maxr));
             
    //to renew the hp of new generation
    shakeValue = 0;
    soundValue = 0;
    rotateValue = 0;
    checkIfConditions(true);

        }
         }
    
     else {
        loggo='If 2 non verificato';
  }
     checkIfConditions(false);
}





function Species(X, Y, size, npoints, colore){
  //the properties fixed value
this.size = size;
this.x = X;
this.y = Y;
this.color = colore;
this.npoints = npoints;

//the methods
//this.move = function(){
//  this.x += random(-this.speed, this.speed);
//  this.y += random(-this.speed, this.speed);
//}

this.display = function(){
  fill(this.color);
  polygon(this.x, this.y, this.size,this.npoints );
    
    // This is a piece of code to be placed after the draw(). This code “enables” the polygon() instruction
function polygon(x, y, radius, npoints) {

  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
    
}
}

function deviceShaken(){
    if (shakeValue<100){
   shakeValue++; 
    }
    
    acccChangeX = abs(accelerationX - pAccelerationX);
    accChangeY = abs(accelerationY - pAccelerationY);
    accChangeT = accChangeX + accChangeY;
    
    // If device is being shaked
    if (accChangeT >= threshold) {
        shAmount = shAmount - 1;
        if (shAmount < 1) {
            shAmount = 1;
        } 
    } 
    
    // If the device is not being shaked 
    else {
    shAmount = 20;
    }
  }

//DRAW LINE FUNCTION
function checkIfConditions(control) {
    if (control==true){
        framecounter=c;
        loggo3='full';
        //Drawing the lines
    var shiftingY = height/10;
    var shiftingX = height/7;
    strokeWeight(10);
    stroke(0);
    //line to first species
    line(x0-shiftingX,y0+shiftingY,x1+shiftingX,y-shiftingY);
    //line to second species
    line(x0,y0+shiftingX,x0,y-shiftingX);
    //line to third species
    line(x0+shiftingX,y0+shiftingY,x3-shiftingX,y-shiftingY);
    noStroke();
         
    }
    else {
        if(framecounter>0){
            framecounter--;
            //Drawing the lines
    var shiftingY = height/10;
    var shiftingX = height/7;
    strokeWeight(6);
    stroke(0);
    //line to first species
    line(x0-shiftingX,y0+shiftingY,x1+shiftingX,y-shiftingY);
    //line to second species
    line(x0,y0+shiftingX,x0,y-shiftingX);
    //line to third species
    line(x0+shiftingX,y0+shiftingY,x3-shiftingX,y-shiftingY);
    noStroke();
        loggo3='emptying';
        } else {
            loggo3='no refill';
        }
    }
    
}

// building the functioning of environment
function environment(vol){
    
    //Mapping the HUE in relation with VOICE VOLUME
    var volplus = map(vol,0,1,0,1000);
    if(volplus > 100){
        volplus = 100;
    }
    var hueVol= map(volplus,0,100,60,360);   
    //var hueVol=9;
    
    //Mapping the BRIGHTNESS in relation to rotationY
    var brAmount = map(rotationY,-90,90,50,80);
    
    
    
    //Colouring (HSB,Hue up to 360,Saturation up to 100,B 100,A 1)
    noStroke();
    fill(hueVol,40,brAmount);
    
    
    //Building circles background
    for(var i=0; i<=width; i+=30){
        for(var j=0; j<=height; j+=30)
        ellipse(i,j,shAmount);
    }
    
    //CONSOLE INFORMATIONS TO HIDE AT THE END OF PROJECT
    fill(0);  
    angleMode(DEGREES);
    //text(vol,40,40);
    //text(hueVol, 40,70);
    //text(round(rotationY),40,100);
    //text(shAmount, 40,120);
    angleMode(RADIANS);
}
