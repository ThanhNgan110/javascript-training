import { querySelector } from "../helpers/selector";
let loader = querySelector(".loading");

const displayLoading = () => {
  return loader.classList.remove("hidden");
};

const hideLoading = () => {
  return loader.classList.add("hidden");
};

export { displayLoading, hideLoading };
