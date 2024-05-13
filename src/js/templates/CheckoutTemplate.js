import { cartSum } from "./CartTemplate";
let total = "";

export const orderSummery = (products) => {
  const cartSummery = cartSum(products);
  total = cartSummery.total;
  let content = "";
  products.forEach((product) => {
    content += orderSummeryTemplate(product);
  });
  return `
  ${formCheckoutTemplate()}
  <div class="cart-order">
  <p class="name-total">Order Summary</p>
  ${content}
  <p class="name-total-border">Subtotal:<span>$${total}</span></p>
  <p class="name-total-border">Shipping:<span>Free</span></p>
  <p class="name-total-border-none total">Total:<span>$${total}</span></p>
  <button type="submit" class="btn btn-checkout">Place Order</button>
  </div>
  `;
};

export const orderSummeryTemplate = (product) => {
  const { id, imgURL, name, amount, price } = product;
  return `<div>
          <div class="flex justify-content-between align-center">
            <div class="flex align-center">
              <img style="width:100px" src="${imgURL}" alt="${name}" />${name} x ${amount}
            </div>
            <p>$${parseFloat(price * amount)}</p>
          </div>
        </div>
    `;
};

export const formCheckoutTemplate = () => {
  return `<div class="form-checkout">
    <p class="title-checkout">Billing Information</p>
    <form id="form-checkout" action="javascript:void(0)">
      <div class="flex-row form-row">
        <div class="flex-col">
          <label for="fname name-label">First name</label>
          <input class="form-control form-control-sm" type="text" name="first name" placeholder="Your first name">
          <p class="mess-error">No empty</p>
        </div>
        <div class="flex-col">
          <label for="lname name-label">Last name</label>
          <input class="form-control form-control-sm" type="text" name="last name" placeholder="Your last name">
          <p class="mess-error"></p>
        </div>
        <div class="flex-col">
          <label for="lname name-label">Company name</label>
          <input class="form-control form-control-sm" type="text" name="company name" placeholder="Company name">
          <p class="mess-error"></p>
        </div>
      </div>
      <div class="form-row">
        <label for="lname name-label">Street Address</label>
        <input class="form-control form-control-sm input-default" type="text" name="address" placeholder="Email">
        <p class="mess-error"></p>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col">
          <label for="lcountry name-label">Country / Region</label>
          <input class="form-control form-control-sm" type="text" name="country" placeholder="Select">
        </div>
        <div class="flex-col">
          <label for="lstates name-label">States</label>
          <input class="form-control form-control-sm" type="text" name="states" placeholder="Selects">
        </div>
        <div class="flex-col">
          <label for="lcode name-label">Zip Code</label>
          <input class="form-control form-control-sm" type="text" name="zip code" placeholder="Zip Code">
        </div>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col">
          <label for="lemail name-label">Email</label>
          <input class="form-control form-control-sm" type="email" name="email" placeholder="Email Address">
          <p class="mess-error"></p>
        </div>
        <div class="flex-col">
          <label for="lphone name-label">Phone</label>
          <input class="form-control form-control-sm" type="text" name="phone number" placeholder="Phone number">
          <p class="mess-error"></p>
        </div>
      </div>
      <div class="form-check-input">
        <input type="checkbox" placeholder="Email Address">
        <label class="name-label">Ship to a different address</label>
      </div>
      <div class="block-info-checkout">
        <p class="title-info">Additional Information</p>
        <div>
          <p class="name-label">Order Notes (Optional)</p>
          <textarea class="form-control form-control-lg" name="note" rows="2" cols="60"
            placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
            <p class="mess-error"></p>
        </div>
      </div>
    </form>
  </div>
  `;
};
