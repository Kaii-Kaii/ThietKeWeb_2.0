function scrollToMiddle(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - window.innerHeight / 4;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

//---------------------------------

let prevScrollPos = window.pageYOffset;
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        // Cuộn lên
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
    } else {
        // Cuộn xuống
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
    }
    prevScrollPos = currentScrollPos;
});