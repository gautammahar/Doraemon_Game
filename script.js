score = 0;
cross = true;

audio = new Audio('music/music.mp3');
audiogo = new Audio('music/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {  // For Up key
        doraemon = document.querySelector('.doraemon');
        doraemon.classList.add('animateDoraemon');
        setTimeout(() => {
            doraemon.classList.remove('animateDoraemon')
        }, 700);
    }
    if (e.keyCode == 39) { // For lefy key
        doraemon = document.querySelector('.doraemon');
        doraemonX = parseInt(window.getComputedStyle(doraemon, null).getPropertyValue('left'));
        doraemon.style.left = doraemonX + 112 + "px";
    }
    if (e.keyCode == 37) { // For Right key
        doraemon = document.querySelector('.doraemon');
        doraemonX = parseInt(window.getComputedStyle(doraemon, null).getPropertyValue('left'));
        doraemon.style.left = (doraemonX - 112) + "px";
    }
}

setInterval(() => {
    doraemon = document.querySelector('.doraemon');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(doraemon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(doraemon, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 88 && offsetY < 99) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause(); // Music Paused When game is Over 
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}