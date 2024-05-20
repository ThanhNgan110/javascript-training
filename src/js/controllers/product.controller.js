import { ALERT_MESSAGE } from "../constants/message";
import { showSuccess, showError } from "../utils/toastify";
import { displayLoading, hideLoading } from "../utils/loading";
import ProductModel from "../models/product.model";
import CartModel from "../models/cart.model";
import StatesModel from "../models/states.model";
import ProductView from "../views/product.view";
import CartView from "../views/cart.view";
import ProductService from "../services/product.service";
import CartItemService from "../services/cartItem.service";
import CountryService from "../services/country.service";
import StatesService from "../services/states.service";

export default class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.cartModel = new CartModel();
    this.statesModel = new StatesModel();
    this.productView = new ProductView();
    this.cartView = new CartView();
    this.productService = new ProductService();
    this.cartItemService = new CartItemService();
    this.countryService = new CountryService();
    this.statesService = new StatesService();

    this.productView.bindSearchProducts(this.handleSearchProducts);
    this.handleRenderProductsGrid();
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.cartItemService.getAllProductsFromCart();
    this.cartModel.setCart(products);
    this.cartView.renderCart(this.cartModel.getCart());
    this.cartView.bindShowModal(
      this.cartModel.getCart(),
      this.handleUpdateCart,
      this.handleRenderCheckout
    );
    this.cartView.bindDeleteProduct(this.handleHiddenProduct);
    this.cartView.bindChangeQuantity();
    this.cartView.bindUpdateCart(this.handleUpdateCart);
    this.cartView.bindCloseModalCart();
    this.cartView.bindCheckoutCart(this.handleRenderCheckout.bind(this));
  };

  async handleRenderProductsGrid() {
    displayLoading();
    const res = await this.productService.getAllProducts();
    this.productModel.setProducts(res);
    this.productView.renderProductGrid(this.productModel.getProducts());
    this.productView.bindAddProducts(this.handleAddProduct);
    hideLoading();
  }

  handleSearchProducts = async (productName) => {
    const products = await this.productService.getAllProducts();
    this.productModel.setProducts(products);
    const result = this.productModel.searchProductByName(productName);

    if (result === null) {
      this.productView.displayMessage(
        ALERT_MESSAGE.SEARCH_PRODUCT_LIST_EMPTY_HEADING
      );
    } else {
      this.productView.displayMessage("");
    }

    this.productView.renderProductGrid(result);
    this.productView.bindAddProducts(this.handleAddProduct);
  };

  handleAddProduct = async (productId) => {
    try {
      displayLoading();
      const products = this.cartModel.getCart();
      this.cartModel.setCart(products);
      let existingProduct = this.cartModel.checkProductIdExisting(productId);
      const listProduct = this.productModel.getProducts();
      this.productModel.setProducts(listProduct);
      const product = this.productModel.getProductById(productId);

      if (!!existingProduct) {
        await this.cartItemService.updateCart({
          ...existingProduct,
          amount: existingProduct.amount + 1
        });
      } else {
        await this.cartItemService.addProductToCart(product);
      }

      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      await this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.ADD_PRODUCT_FAILED_MSG });
    }
  };

  handleHiddenProduct = (id) => {
    this.view.bindHiddenProduct(id);
  };

  handleDeleteProduct = async (deletedIds) => {
    try {
      const promises = [];
      for (let i = 0; i < deletedIds.length; i++) {
        const promise = this.cartItemService.deleteProductFromCart(
          deletedIds[i]
        );
        promises.push(promise);
      }
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  handleUpdateProduct = async (updateItems) => {
    try {
      displayLoading();
      const promises = [];
      for (let i = 0; i < updateItems.length; i++) {
        const promise = this.cartItemService.updateCart({
          id: updateItems[i].id,
          amount: updateItems[i].quantity,
        });
        promises.push(promise);
      }
      await Promise.all(promises);
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG });
      this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.UPDATE_CART_FAILED_MSG });
    }
  };

  handleUpdateCart = async (quantitys, deletedIds) => {
    await Promise.all([
      this.handleUpdateProduct(quantitys),
      this.handleDeleteProduct(deletedIds),
    ]);
  };

  hanldeGetStates = async (countryId) => {
    const states = await this.statesService.getStates();
    this.statesModel.setStates(states);
    const listState = this.statesModel.getStatesByCountry(countryId);
    this.cartView.handleRenderStates(listState);
  };

  handleRenderCheckout = async () => {
    displayLoading();
    const countries = await this.countryService.getCountry();
    const products = this.cartModel.getCart();
    this.cartView.renderFormCheckout(products);
    this.cartView.handleRenderCountry(countries);
    this.cartView.handleDefaultCountry(this.hanldeGetStates, countries);
    this.cartView.bindEventChangeCountry(this.hanldeGetStates);
    this.cartView.bindCloseModalCheckout();
    this.cartView.bindSubmitForm();
    hideLoading();
  };
}
