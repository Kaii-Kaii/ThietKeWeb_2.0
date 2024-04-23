const banner = document.getElementById("banner");
const images = banner.querySelectorAll("img");
let currentImage = 0;
function preloadNextImage() {
    const nextImageIndex = (currentImage + 1) % images.length;
    images[nextImageIndex].style.left = "100%";
}
setInterval(() => {
    const previousImageIndex = (currentImage - 1 + images.length) % images.length;
    const nextImageIndex = (currentImage + 1) % images.length;
    images[currentImage].style.left = "-100%";
    const img = currentImage;
    setTimeout(() => {
        images[img].style.opacity = "0";
        images[img].style.left = "100%";
        setTimeout(() => {
            images[img].style.opacity = "1";
        }, 1000);
    }, 1000);
    preloadNextImage();
    images[previousImageIndex].style.left = "100%";
    currentImage = nextImageIndex;
    images[currentImage].style.left = "0";
}, 3000);
const elements = document.querySelectorAll(".adjust-position");
elements.forEach((element) => {
    // Thực hiện các điều chỉnh vị trí tùy chỉnh dựa trên nhu cầu của bạn
    element.style.bottom = "20px"; // Điều chỉnh khoảng cách từ dưới lên
    element.style.left = "20px"; // Điều chỉnh khoảng cách từ trái sang
});
