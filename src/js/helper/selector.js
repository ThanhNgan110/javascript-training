// Retrieve an element from the DOM
export const getElement = (selector) => {
  const element = document.querySelector(`.${selector}`);
  console.log(element, selector);
  return element;
};

// export const createElement ()
