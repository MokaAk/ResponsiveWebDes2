const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const progressBar = document.querySelector('.carousel-progress-bar');

let currentIndex = 0;
let itemsToShow = 1;

function updateItemsToShow() {
  itemsToShow = window.innerWidth >= 900 ? 3 : 1;
}

function updateCarousel() {
  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  if (window.innerWidth >= 900) {
    const itemWidth = items[0].offsetWidth;
    const gap = 20; // matches --grid-gap
    const offset = -currentIndex * (itemWidth + gap);
    track.style.transform = `translateX(${offset}px)`;
  } else {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  const progress = totalItems > itemsToShow
    ? (currentIndex / maxIndex) * 100
    : 100;

  progressBar.style.width = `${progress}%`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
}

prevBtn.addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  const maxIndex = Math.max(0, items.length - itemsToShow);
  currentIndex = Math.min(maxIndex, currentIndex + 1);
  updateCarousel();
});

window.addEventListener('resize', () => {
  updateItemsToShow();
  updateCarousel();
});

updateItemsToShow();
updateCarousel();
