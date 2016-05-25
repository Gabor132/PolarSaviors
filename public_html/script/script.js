

/* global icebergs */
/* global focused, savior, ICEBERG_WIDTH, ICEBERG_HEIGHT,
 *  bears, BEAR_HEIGHT, HOME_WIDTH, onSubmitComment */


/* Window is loaded */
window.onload = function(){
    /* Adding listeners */
    document.body.onload = init();
    document.body.onblur = changeFocus(false);
    document.getElementById("drawingBoard").onload = changeFocus(true);
    
    document.getElementById("comment_form").onsubmit = onSubmitComment;
    
    window.onkeypress = function(event){
        var key = event.charCode ? event.charCode : event.which;
        var currentTime = (Math.random()*500)+500;
        if(key === 100){
            savior.addToX(savior.speed*currentTime);
        }else if(key === 97){
            savior.substractFromX(savior.speed*currentTime);
        }else if(key === 115){
            savior.addToY(savior.speed*currentTime);
        }else if(key === 119){
            savior.substractFromY(savior.speed*currentTime);
        }else if(key === 108){
            if(savior.rope.boarded){
                savior.rope.checkDettach();
            }else{
                savior.rope.checkAttach();
            }
        }
    };       
};

function init(){
    canvas = document.getElementById("drawingBoard");
    canvasStyle = canvas.style;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    graphics = canvas.getContext("2d");
    
    
    focused = false;


    gameOver = false;
    gameWin = false;
    
    iceberg = new Iceberg(0,canvasHeight-40,200);
    
    
    
    home = new Home(canvasWidth-HOME_WIDTH, canvasHeight-40);
    
    savior = new Helicopter(0,0);

    bears = new Array();

    nrBears = 2;
    
    var i = 0;
    while(i<nrBears){
        i++;
        bears.push(new Bear((Math.random()*100)%ICEBERG_WIDTH, canvasHeight-BEAR_HEIGHT-30));
    }
    paintUnfocused();
    update();
}

function changeFocus(focus){
    if(focus === true){
        focused = true;
        paintFocused();
    }else{
        focused = false;
        paintUnfocused();
    }
}

function update(){
    if(iceberg.time <= 0 || gameOver){
        gameOver = true;
        paintOnGameOver();
        return;
    }
    var win = true;
    for(var i = 0; i < nrBears && win; i++){
        var aux = bears[i];
        if(!aux.isSaved){
            win = false;
        }
    }
    if(win){
        gameWin = true;
        paintOnGameWin();
        return;
    }
    if(focused){
        iceberg.updateTime(1);
        if(!gameOver){
            paint();
        }
    }
    setTimeout(update,100);
}

function paint(){
    if(focused){
        paintFocused();
    }else{
        paintUnfocused();
    }
}

function paintOnGameOver(){
    graphics.fillStyle = "rgba(0, 0, 0, 0.5)";
    graphics.fillRect(0,0,canvasWidth, canvasHeight);
    graphics.strokeStyle = "rgb(145,210,193)";
    graphics.fillStyle = "rgb(145,210,193)";
    graphics.font = "50px Arial";
    graphics.strokeText("Game over",canvasWidth/2-130,canvasHeight/2);
    graphics.fillText("Game over",canvasWidth/2-130,canvasHeight/2);
}

function paintOnGameWin(){
    graphics.fillStyle = "rgba(255, 255, 255,0.5)";
    graphics.fillRect(0,0,canvasWidth, canvasHeight);
    graphics.strokeStyle = "rgb(145,210,193)";
    graphics.fillStyle = "rgb(145,210,193)";
    graphics.font = "50px Arial";
    graphics.strokeText("Winner",canvasWidth/2-75,canvasHeight/2);
    graphics.fillText("Winner",canvasWidth/2-75,canvasHeight/2);
}

function paintUnfocused(){
    paintFocused();
    graphics.fillStyle = "rgba(0, 0, 0, 0.5)";
    graphics.fillRect(0,0,canvasWidth, canvasHeight);
    graphics.strokeStyle = "rgb(145,210,193)";
    graphics.fillStyle = "rgb(145,210,193)";
    graphics.font = "50px Arial";
    graphics.strokeText("Click please",canvasWidth/2-130,canvasHeight/2);
    graphics.fillText("Click please",canvasWidth/2-130,canvasHeight/2);
}

function paintFocused(){
    graphics.fillStyle = "rgb(135,206,250)";
    graphics.fillRect(0,0,canvasWidth, canvasHeight);
    iceberg.draw(graphics);
    home.draw(graphics);
    savior.draw(graphics);
    for(var i = 0; i<nrBears; i++){
        var aux = bears[i];
        aux.draw(graphics);
    }
}



