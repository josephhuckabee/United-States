document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slideshow-container .slide");
    let currentIndex = 0;
  
    function showNextSlide() {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }
  
    setInterval(showNextSlide, 3000); // change every 3 seconds
  });