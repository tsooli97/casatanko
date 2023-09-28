// Select the "Book Now" button and the footer elements in the DOM.
const bookNowBtn = document.querySelector(".book-now-btn");
const footer = document.querySelector("footer");

// Check if both the button and the footer exist in the DOM.
if (bookNowBtn && footer) {
  // Initialize the IntersectionObserver options.
  const observerOptions = {
    root: null, // Relative to the viewport.
    rootMargin: "0px", // Margin around the root.
    threshold: 0 // Target visibility percentage to trigger callback.
  };

  // Callback function to be executed when the target (footer) intersects with the root (viewport).
  const observerCallback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // If the footer is intersecting, add the class "book-now-btn-avoid-footer".
        bookNowBtn.classList.add("book-now-btn-avoid-footer");
      } else {
        // If the footer is not intersecting, remove the class "book-now-btn-avoid-footer".
        bookNowBtn.classList.remove("book-now-btn-avoid-footer");
      }
    }
  };

  // Create the IntersectionObserver instance with the callback and options.
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  // Start observing the footer element.
  observer.observe(footer);
}

// Select the modal, gallery images, modal image, caption, and close button elements in the DOM.
const modal = document.getElementById("modalView");
const galleryImages = document.querySelectorAll(".gallery img");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeModal = document.getElementsByClassName("close")[0];

// Add click event listeners to gallery images.
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    // When an image is clicked, display the modal, set the src of the modal image, and set the caption text.
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
    bookNowBtn.style.display = "none";
  });
});

// Add a click event listener to the close button.
closeModal.addEventListener("click", () => {
  // When the close button is clicked, hide the modal.
  modal.style.display = "none";
  bookNowBtn.style.display = "block";
});

// Add a click event listener to the modal background.
modal.addEventListener("click", (event) => {
  // When the modal background is clicked, hide the modal.
  if (event.target === modal) {
    modal.style.display = "none";
    bookNowBtn.style.display = "block";
  }
});

// Function to get the current image index.
function getCurrentImageIndex() {
  const src = modalImg.src;
  return Array.from(galleryImages).findIndex(img => img.src === src);
}

// Function to move to the previous image in the gallery.
function showPreviousImage() {
  modalImg.classList.add("hide-image");
  setTimeout(() => {
    const currentIndex = getCurrentImageIndex();
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const newImage = galleryImages[newIndex];
    modalImg.src = newImage.src;
    captionText.innerHTML = newImage.alt;
    modalImg.classList.remove("hide-image");
  }, 200); // Transition duration (same as in CSS).
}

// Function to move to the next image in the gallery.
function showNextImage() {
  modalImg.classList.add("hide-image");
  setTimeout(() => {
    const currentIndex = getCurrentImageIndex();
    const newIndex = (currentIndex + 1) % galleryImages.length;
    const newImage = galleryImages[newIndex];
    modalImg.src = newImage.src;
    captionText.innerHTML = newImage.alt;
    modalImg.classList.remove("hide-image");
  }, 200); // Transition duration (same as in CSS).
}

let touchStartX = null;

// Function to handle the start of the touch event.
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

// Function to handle the end of the touch event.
function handleTouchEnd(event) {
  if (!touchStartX) {
    return;
  }

  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchStartX - touchEndX;

  // Swipe threshold (in pixels).
  const threshold = 100;

  if (Math.abs(deltaX) >= threshold) {
    // Swipe right (previous image).
    if (deltaX > 0) {
      showNextImage();
    }
    // Swipe left (next image).
    else {
      showPreviousImage();
    }
  }

  touchStartX = null;
}

// Add event listeners to the modal container for touch events.
modal.addEventListener("touchstart", handleTouchStart);
modal.addEventListener("touchend", handleTouchEnd);

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

// Add event listeners to arrow buttons.
arrowLeft.addEventListener("click", showPreviousImage);
arrowRight.addEventListener("click", showNextImage);

// By Joel Isotalo