// Creat element
const createElement =  (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
}

// Get element(s) by CSS selector:
const querySelector = (selector) => document.querySelector(selector);

export { querySelector };
