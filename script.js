document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll(".jogador");

    players.forEach(player => {
        const upButton = player.querySelector(".cima");
        const downButton = player.querySelector(".baixo");
        const scoreElement = player.querySelector(".pontos");
        const teamTotalElement = player.closest(".time").querySelector(".total");

        upButton.addEventListener("click", function() {
            const currentScore = parseInt(scoreElement.textContent, 10);
            scoreElement.textContent = currentScore + 1;
            updateTeamTotal(teamTotalElement);
        });

        downButton.addEventListener("click", function() {
            const currentScore = parseInt(scoreElement.textContent, 10);
            if (currentScore > 0) {
                scoreElement.textContent = currentScore - 1;
                updateTeamTotal(teamTotalElement);
            }
        });
    });

    function updateTeamTotal(totalElement) {
        const teamPlayers = totalElement.closest(".time").querySelectorAll(".pontos");
        let teamTotal = 0;
        teamPlayers.forEach(player => {
            teamTotal += parseInt(player.textContent, 10);
        });
        totalElement.textContent = teamTotal;
    }

    let timer;
    let minutes = 30;
    let seconds = 0;

    // Timer display elements
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    // Timer buttons
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const resetButton = document.getElementById("reset");

    // Start button click event
    startButton.addEventListener("click", function() {
        if (!timer) {
            timer = setInterval(updateTimer, 1000);
        }
    });

    // Pause button click event
    pauseButton.addEventListener("click", function() {
        clearInterval(timer);
        timer = null;
    });

    // Reset button click event
    resetButton.addEventListener("click", function() {
        const confirmReset = window.confirm("Are you sure you want to reset the scores and the timer?");
        if (confirmReset){
            clearInterval(timer);
            timer = null;
            minutes = 30;
            seconds = 0;
            updateTimerDisplay();
            resetScores();
        }
    });

    function playAlertSound() {
        const alertSound = document.getElementById("timer-alert");
        alertSound.play();
    }

    function updateTimer() {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            timer = null;
            playAlertSound();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
        }
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    function resetScores() {
        const scores = document.querySelectorAll(".pontos");
        scores.forEach(score => {
            score.textContent = "0";
        });

        const teamTotals = document.querySelectorAll(".total");
        teamTotals.forEach(total => {
            total.textContent = "0";
        }
        );
    }

});


