import { querySelector } from "../helpers/selector";
let loader = querySelector(".loading");
let overlay = querySelector('.overlay');

const displayLoading = () => {
  loader.style.display = 'block';
};

const hideLoading = () => {
  loader.style.display = 'none';
};

const toggleOverlay = (bool) => {
  if(bool) {
    overlay.classList.toggle("hidden", bool)
  }
  else {
     overlay.classList.toggle("hidden", !bool);
  }
}

export { displayLoading, hideLoading, toggleOverlay };
