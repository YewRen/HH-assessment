import "../css/main.css";
import "../css/header.css"
import "../css/article-styles.css";
import "../css/mobile-nav.css"
import "../css/utils.css"
import "../css/footer.css"
import "../css/styles.css";
import * as bootstrap from "bootstrap";

// Sidebar function
const sidebar = document.getElementById("sidebar");
const fadePoint = 300;

document.addEventListener("scroll", () => {
  if (window.scrollY >= fadePoint) {
    sidebar.classList.add("slide-in");
  } else {
    sidebar.classList.remove("slide-in");
  }
});

// Carousel slider for article list
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const prevButtonWrapper = document.querySelector(".slider-leftbutton-wrapper");
const nextButtonWrapper = document.querySelector(".slider-rightbutton-wrapper");

let isDown = false;
let startX;
let scrollLeft;
let scrollAmount = 0;

nextButton.addEventListener("click", () => {
  scrollAmount += 302;
  slider.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
  checkButtons();
});

prevButton.addEventListener("click", () => {
  scrollAmount -= 302;
  slider.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
  checkButtons();
});

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  checkButtons()
});

slider.addEventListener("touchstart", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  checkButtons()
  e.stopPropagation();
});

document.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
  updateScrollAmount()
});

document.addEventListener("touchend", () => {
  isDown = false;
  slider.classList.remove("active");
  updateScrollAmount()
  e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 0.75; // Adjust sensitivity
  slider.scrollLeft = scrollLeft - walk;
  checkButtons()
});

document.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Adjust sensitivity
  slider.scrollLeft = scrollLeft - walk;
  checkButtons()
  e.stopPropagation();
});

function updateScrollAmount() {
  scrollAmount = slider.scrollLeft;
  checkButtons();
}

slider.addEventListener("scroll", checkButtons);

function checkButtons() {
  if (slider.scrollLeft <= 0) {
    prevButton.classList.add("disable-button");
    prevButtonWrapper.style.pointerEvents = "none";
  } else {
    prevButton.classList.remove("disable-button");
    prevButtonWrapper.style.pointerEvents = "auto";
  }

  if (slider.scrollLeft + slider.clientWidth + 1 >= slider.scrollWidth) {
    nextButton.classList.add("disable-button");
    nextButtonWrapper.style.pointerEvents = "none";
  } else {
    nextButton.classList.remove("disable-button");
    nextButtonWrapper.style.pointerEvents = "auto";
  }
}

checkButtons();

// Carousel slider for featured article list
const featuredSlider = document.querySelector(".featured-flex-container-slider");
const featuredPrevButton = document.querySelector(".featured-prev");
const featuredNextButton = document.querySelector(".featured-next");
const featuredPrevButtonWrapper = document.querySelector(".slider-featured-leftbutton-wrapper");
const featuredNextButtonWrapper = document.querySelector(".slider-featured-rightbutton-wrapper");

let isFeaturedDown = false;
let startFeaturedX;
let scrollFeaturedLeft;
let scrollFeaturedAmount = 0;

featuredNextButton.addEventListener("click", () => {
  scrollFeaturedAmount += 832;
  featuredSlider.scrollTo({
    left: scrollFeaturedAmount,
    behavior: "smooth",
  });
  checkFeaturedButtons();
});

featuredPrevButton.addEventListener("click", () => {
  scrollFeaturedAmount -= 832;
  featuredSlider.scrollTo({
    left: scrollFeaturedAmount,
    behavior: "smooth",
  });
  checkFeaturedButtons();
});

featuredSlider.addEventListener("mousedown", (e) => {
  isFeaturedDown = true;
  featuredSlider.classList.add("active");
  startFeaturedX = e.pageX - featuredSlider.offsetLeft;
  scrollFeaturedLeft = featuredSlider.scrollLeft;
  checkFeaturedButtons()
});

document.addEventListener("mouseup", () => {
  isFeaturedDown = false;
  featuredSlider.classList.remove("active");
  updateFeaturedScrollAmount()
});

document.addEventListener("mousemove", (e) => {
  if (!isFeaturedDown) return;
  e.preventDefault();
  const x = e.pageX - featuredSlider.offsetLeft;
  const walk = (x - startFeaturedX) * 0.75; // Adjust sensitivity
  featuredSlider.scrollLeft = scrollFeaturedLeft - walk;
  checkFeaturedButtons()
});

function updateFeaturedScrollAmount() {
  scrollFeaturedAmount = featuredSlider.scrollLeft;
  checkFeaturedButtons();
}

featuredSlider.addEventListener("scroll", checkFeaturedButtons);

function checkFeaturedButtons() {
  if (featuredSlider.scrollLeft <= 0) {
    featuredPrevButton.classList.add("disable-button");
    featuredPrevButtonWrapper.style.pointerEvents = "none";
  } else {
    featuredPrevButton.classList.remove("disable-button");
    featuredPrevButtonWrapper.style.pointerEvents = "auto";
  }

  if (featuredSlider.scrollLeft + featuredSlider.clientWidth + 1 >= featuredSlider.scrollWidth) {
    featuredNextButton.classList.add("disable-button");
    featuredNextButtonWrapper.style.pointerEvents = "none";
  } else {
    featuredNextButton.classList.remove("disable-button");
    featuredNextButtonWrapper.style.pointerEvents = "auto";
  }
}

checkFeaturedButtons();

// Odometer function
function runOdometer() {
  setTimeout(function () {
    odometer1.innerHTML = 12;
    odometer2.innerHTML = 23;
    odometer3.innerHTML = 34;
    odometer4.innerHTML = 46;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const odometers = document.querySelectorAll(".odometer");
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 1, // Trigger when 50% of the element is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runOdometer();
          // Optionally, stop observing after triggering once
          observer.unobserve(entry.target);
        }
      });
    }, options);

    odometers.forEach((odometer) => {
      observer.observe(odometer);
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    window.addEventListener("scroll", function () {
      const rect = section1.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isInViewport) {
        runOdometer();
        // Remove the event listener after the function is triggered
        window.removeEventListener("scroll", arguments.callee);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#sidebar",
    offset: 0
  });
});

const searchInput = document.querySelectorAll("#search-input")

searchInput.forEach((input) => {
  input.addEventListener('input', function() {
    const arrowIcon = document.getElementById('arrow-icon');
    if (this.value.trim().length > 0) {
      arrowIcon.style.display = 'inline-block';
    } else {
      arrowIcon.style.display = 'none';
    }
  });
})
