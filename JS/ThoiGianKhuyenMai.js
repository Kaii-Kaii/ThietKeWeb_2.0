
var endDate = new Date("2025-06-01T00:00:00");

function updateCountdown() {
    var now = new Date();
    var timeLeft = endDate - now;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    // nếu số giờ, phút, giây nhỏ hơn 10 thì thêm số 0 vào trước
    var countdownStr = days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây";
    if (hours < 10) {
        countdownStr = days + " ngày " + "0" + hours + " giờ " + minutes + " phút " + seconds + " giây";
    }
    if (minutes < 10) {
        countdownStr = days + " ngày " + hours + " giờ " + "0" + minutes + " phút " + seconds + " giây";
    }
    if (seconds < 10) {
        countdownStr = days + " ngày " + hours + " giờ " + minutes + " phút " + "0" + seconds + " giây";
    }
    document.getElementById("countdown").textContent = countdownStr;
    setTimeout(updateCountdown, 1000);
}
updateCountdown();