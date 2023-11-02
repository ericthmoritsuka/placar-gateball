document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll(".jogador");
    let timerRunning = false;
    let timerPaused = false;

    const pauseButton = document.getElementById("pause");
    pauseButton.disabled = true;

    players.forEach(player => {
        const upButton = player.querySelector(".cima");
        const downButton = player.querySelector(".baixo");
        const scoreElement = player.querySelector(".pontos");
        const teamTotalElement = player.closest(".time").querySelector(".total");

        upButton.addEventListener("click", function() {
            if (timerRunning) {
                const currentScore = parseInt(scoreElement.textContent, 10);
                if (currentScore < 5){
                    scoreElement.textContent = currentScore + 1;
                    updateTeamTotal(teamTotalElement);
                }
            }
        });

        downButton.addEventListener("click", function() {
            if (timerRunning){
                const currentScore = parseInt(scoreElement.textContent, 10);
                if (currentScore > 0) {
                    scoreElement.textContent = currentScore - 1;
                    updateTeamTotal(teamTotalElement);
                }
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

    // Timer buttons, pause is set in the beginning
    const startButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");

    // Start button click event
    startButton.addEventListener("click", function() {
        if (!timer) {
            timerRunning = true;
            if (timerPaused){
                startButton.textContent = "Continuar";
                timerPaused = false;
            }
            timer = setInterval(updateTimer, 1000);
            pauseButton.disabled = false;
        }
    });

    // Pause button click event
    pauseButton.addEventListener("click", function() {
        clearInterval(timer);
        timer = null;
        timerRunning = false;
        timerPaused = true;
        startButton.textContent = "Continuar";
    });

    // Reset button click event
    resetButton.addEventListener("click", function() {
        const confirmReset = window.confirm("Você tem certeza que deseja resetar o timer e o placar?");
        if (confirmReset){
            clearInterval(timer);
            timer = null;
            timerRunning = false;
            timerPaused = false;
            startButton.textContent = "Começar"
            pauseButton.disabled = true;
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


