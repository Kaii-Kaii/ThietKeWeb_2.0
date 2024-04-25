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