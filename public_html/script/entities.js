/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global ROPE_WIDTH, ROPE_HEIGHT, HELICOPTER_HEIGHT, HELICOPTER_WIDTH, BEAR_WIDTH, BEAR_HEIGHT, nrBears, bears, ICEBERG_HEIGHT, ICEBERG_WIDTH, HOME_HEIGHT, HOME_WIDTH, home */

function Helicopter(newX, newY){
    this.x = newX;
    this.y = newY;
    this.speed = 0.006;
    this.image = new Image();
    this.image.src = "resources/heli.png";
    this.rope = new Rope(newX+2*HELICOPTER_WIDTH/3, newY+HELICOPTER_HEIGHT/2);
    this.draw = function(graphics){
        this.rope.draw(graphics);
        graphics.drawImage(this.image, this.x, this.y, HELICOPTER_WIDTH, HELICOPTER_HEIGHT);
    };
    
    this.addToX = function(xDifference){
        this.x += xDifference;
        this.rope.addToX(xDifference);
    };
    this.substractFromX = function(xDifference){
        this.x -= xDifference;
        this.rope.substractFromX(xDifference);
    };
    this.addToY = function(yDifference){
        this.y += yDifference;
        this.rope.addToY(yDifference);
    };
    this.substractFromY = function(yDifference){
        this.y -= yDifference;
        this.rope.substractFromY(yDifference);
    };
    
    return this;
}

function Rope(newX, newY){
    this.x = newX;
    this.y = newY;
    
    this.boarded = false;
    
    this.bear = null;
    
    this.draw = function(graphics){
        graphics.fillStyle = "rgb(141, 81, 24)";
        graphics.fillRect(this.x, this.y, ROPE_WIDTH, ROPE_HEIGHT);
    };
    
    this.attachBear = function(bear){
        this.boarded = true;
        this.bear = bear;
    };
    
    this.dettachBear = function(safe){
        if(safe){
            this.bear.isSaved = true;
            this.bear.isHappy = true;
        }else{
            gameOver = true;
        }
        this.boarded = false;
        this.bear = null;
    };
    
    this.addToX = function(xDifference){
        this.x += xDifference;
        if(this.boarded){
            this.bear.addToX(xDifference);
        }
    };
    this.substractFromX = function(xDifference){
        this.x -= xDifference;
        if(this.boarded){
            this.bear.substractFromX(xDifference);
        }
    };
    this.addToY = function(yDifference){
        this.y += yDifference;
        if(this.boarded){
            this.bear.addToY(yDifference);
        }
    };
    this.substractFromY = function(yDifference){
        this.y -= yDifference;
        if(this.boarded){
            this.bear.substractFromY(yDifference);
        }
    };
    
    this.checkAttach = function(){
        if(!this.boarded){
            var aX = this.x + ROPE_WIDTH/2;
            var aY = this.y + 7*ROPE_HEIGHT/8;
            for(var i = 0; i < nrBears; i++){
                var aux = bears[i];
                if(!aux.isSaved){
                    var auxAX = aux.x + BEAR_WIDTH;
                    var auxAY = aux.y + BEAR_HEIGHT;
    //                alert(aX + " " + aY + "\n" + aux.x + " " + aux.y + "\n" + auxAX + " " + auxAY);
                    if(aX < auxAX && aX > aux.x && aY < auxAY && aY > aux.y){
                        this.attachBear(aux);
                        i = nrBears;
                    }
                }
            }
        }
    };
    
    this.checkDettach = function(){
        if(this.boarded){
            var auxBear = this.bear;
            var auxX = auxBear.x+BEAR_WIDTH/2;
            var auxY = auxBear.y+BEAR_HEIGHT;
            var homeX = home.x+HOME_WIDTH;
            var homeY = home.y+HOME_HEIGHT;
//            alert(auxX + " " + auxY + " " + homeX + " " + homeY + " " + home.x + " " + home.y);
            if(auxX >= home.x && auxX <= homeX && auxY >= home.y && auxY <= homeY){
                this.dettachBear(true);
            }else{
                this.dettachBear(false);
            }
        }
    };
}

function Iceberg(newX,newY,newTime){
    this.x = newX;
    this.y = newY;
    this.totalTime = newTime;
    this.time = newTime;
    
    this.opacity = 1;
    this.color = "rgba(255,255,255,"+this.opacity+")";
    
    this.updateColor = function(){
        this.opacity -= 1/this.totalTime;
        this.color = "rgba(255,255,255,"+this.opacity+")";
    };
    this.updateTime = function(timeElapsed){
        if(this.time > 0){
            this.time = this.time - timeElapsed;
            this.updateColor();
        }
        if(this.time < 0){
            this.time = 0;
        }
    };
    
    this.draw = function(graphics){
        graphics.fillStyle = this.color;
        graphics.fillRect(this.x, this.y,ICEBERG_WIDTH,ICEBERG_HEIGHT);
        graphics.font = "30px Arial";
        if(this.time < this.totalTime/4){
            graphics.fillStyle = "red";
        }else{
            graphics.fillStyle = "white";
        }
        graphics.fillText(this.time,275,40);
    };
}

function Bear(newX,newY){
    this.x = newX;
    this.y = newY;
    
    this.isHappy = false;
    this.isSaved = false;
    
    this.hImage = new Image();
    this.hImage.src = "resources/happy_bear.png";
    this.sImage = new Image();
    this.sImage.src = "resources/sad_bear.png";
    
    this.addToX = function(xDifference){
        this.x += xDifference;
    };
    this.substractFromX = function(xDifference){
        this.x -= xDifference;
    };
    this.addToY = function(yDifference){
        this.y += yDifference;
    };
    this.substractFromY = function(yDifference){
        this.y -= yDifference;
    };
    
    this.draw = function(graphics){
        if(this.isHappy){
            graphics.drawImage(this.hImage, this.x, this.y, BEAR_WIDTH, BEAR_HEIGHT);
        }else{
            graphics.drawImage(this.sImage, this.x, this.y, BEAR_WIDTH, BEAR_HEIGHT);
        }
    };
}

function Home(newX,newY){
    this.x = newX;
    this.y = newY;
    
    this.image = new Image();
    this.image.src = "resources/pancarda.png";
    
    this.draw = function(graphics){
        graphics.fillStyle = "white";
        graphics.fillRect(this.x, this.y,HOME_WIDTH,HOME_HEIGHT);
        graphics.drawImage(this.image, this.x, this.y-60);
    };
}