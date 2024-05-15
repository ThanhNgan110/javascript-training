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
  <button type="submit" form="form-checkout" class="btn btn-order">Place Order</button>
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
          <input class="form-control form-control-sm" type="text" name="First Name" placeholder="Your first name">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col">
          <label for="lname name-label">Last name</label>
          <input class="form-control form-control-sm" type="text" name="Last Name" placeholder="Your last name">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col">
          <label for="lname name-label">Company name</label>
          <input class="form-control form-control-sm" type="text" name="Company Name" placeholder="Company name">
          <p class="mess-error error"></p>
        </div>
      </div>
      <div class="form-row">
        <label for="lname name-label">Street Address</label>
        <input class="form-control form-control-sm input-default" type="text" name="Address" placeholder="Email">
        <p class="mess-error error"></p>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col">
          <label for="lcountry name-label">Country / Region</label>
          <select class="form-control form-control-sm" name="country" id="country">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          </select>
        </div>
        <div class="flex-col">
          <label for="lstates name-label">States</label>
          <select class="form-control form-control-sm" name="states" id="states">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          </select>
        </div>
        <div class="flex-col">
          <label for="lcode name-label">Zip Code</label>
          <input class="form-control form-control-sm" type="text" name="Zip Code" placeholder="Zip Code">
          <p class="mess-error error"></p>
        </div>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col">
          <label for="lemail name-label">Email</label>
          <input class="form-control form-control-sm" name="Email" placeholder="Email Address">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col">
          <label for="lphone name-label">Phone</label>
          <input class="form-control form-control-sm" type="text" name="Phone Number" placeholder="Phone number">
          <p class="mess-error error"></p>
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
          <textarea class="form-control form-control-lg" name="Note" rows="2" cols="60"
            placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
            <p class="mess-error error"></p>
        </div>
      </div>
    </form>
  </div>
  `;
};
