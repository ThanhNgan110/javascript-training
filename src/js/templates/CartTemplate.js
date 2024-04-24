import { ALERT_MESSAGE } from "../constants/message";
import emptyCart from "../../assets/images/cart/empty-cart.png";

export const cartSum = (products) => {
  let total = 0;
  if (products) {
    products.forEach((item) => {
      total += parseFloat(item.amount * item.price);
    });
  }
  return {
    product: products,
    total: total.toFixed(2),
  }
}

export const displayCart = (products) => {
  const { product, total } = cartSum(products);
  let isEmpty = product.length === 0;
  let contentCart = "";
  if (!isEmpty) {
    products.forEach((item) => {
      contentCart += cartTemplate(item);
    });
  } else {
    contentCart = `<div><img src=${emptyCart}/><p class="text-center">${ALERT_MESSAGE.CART_EMPTY_HEADING}</p></div>`;
  }
  return `
  ${
    isEmpty
      ? `${contentCart}`
      : `<table class="table">
  <thead>
    <tr class="col-header">
      <th class="col-product">PRODUCT</th>
      <th>PRICE</th>
      <th>QUANTITY</th>
      <th>SUBTOTAL</th>
    </tr>
  </thead>
  <tbody>
${contentCart}
  <tr class="col-btn">
  <td>
    <div class="btn-group">
      <button class="btn btn-return">Return to shop</button>
      <button class="btn btn-update-cart">Update Cart</button>
    </div>
  </td>
</tr>
</tbody>
</table>
<div class="cart-total">
<p class="name-total">Cart Total</p>
<p class="name-total-border"> Subtotal:<span>${total}$</span></p>
<p class="name-total-border">Shipping:<span>Free</span></p>
<p class="name-total-border-none total">Total:<span>${total}$</span></p>
<button class="btn btn-checkout">Proceed to checkout</button>
</div>`
  }`;
}

export const cartTemplate = (product) => {
  const { id, productId, name, price, imgURL, amount } = product;
  const subtotal = price * amount;
  return `
    <tr class="col-tbody" data-id=${id} >
      <td>
        <div class="product-item">
          <img style="width:100px" src="${imgURL}" alt="${name}" />
          <p class="product-title"> ${name}</p>
        </div>
      </td>
      <td>${price}</td>
      <td>
        <div class="input-group quantity">
          <button class="btn btn-minus" data-id=${productId}><span class="icon icon-minus"></span></button>
          <input type="text" class="input-quantity" data-id=${productId} name="input-quantity" value=${amount} readonly/>
          <button class="btn btn-plus" data-id=${productId}><span class="icon icon-plus"></span></button>
        </div>
      </td>
      <td>
        <p class="product-subtotal">${subtotal.toFixed(2)}$</p>
      </td>
      <td>
        <button class="btn btn-delete" data-id=${id} ><span class="icon icon-close"></span></button>
      </td>
    </tr>
  `;
}

export const cartNumberBadge = (products) => {
  const {product, total} = cartSum(products);
  return `
  <span class="icon icon-medium icon-cart"></span>
  <span class="icon icon-circle">${product.length}</span>
  <div class="block-total-cart">
    <p class="name-cart">Shopping cart</p>
    <p class="total-price">$${total}</p>
  </div>`
}

