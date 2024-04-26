
var endDate = new Date("2024-05-01T00:00:00");

function updateCountdown() {
    var now = new Date();
    var timeLeft = endDate - now;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    var countdownStr = days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây";

    document.getElementById("countdown").textContent = countdownStr;

    setTimeout(updateCountdown, 1000);
}

updateCountdown();