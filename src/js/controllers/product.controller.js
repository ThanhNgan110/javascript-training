import { ALERT_MESSAGE } from "../constants/message";
import { showSuccess, showError } from "../utils/toastify";
import { displayLoading, hideLoading } from "../utils/loading";
import ProductModel from "../models/product.model";
import CartModel from "../models/cart.model";
import StateModel from "../models/state.model";
import ProductView from "../views/product.view";
import CartView from "../views/cart.view";
import ProductService from "../services/product.service";
import CartItemService from "../services/cartItem.service";
import CountryService from "../services/country.service";
import StateService from "../services/state.service";

export default class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.cartModel = new CartModel();
    this.stateModel = new StateModel();
    this.productView = new ProductView();
    this.cartView = new CartView();
    this.productService = new ProductService();
    this.cartItemService = new CartItemService();
    this.countryService = new CountryService();
    this.stateService = new StateService();

    this.productView.bindSearchProducts(this.handleSearchProducts);
    this.handleRenderProductsGrid();
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.cartItemService.getAllProductsFromCart();
    this.cartModel.setCart(products);
    this.cartView.renderCart(this.cartModel.getCart());
    this.bindCartEvents();
  };

  bindCartEvents = () => {
    this.cartView.bindShowModal(
      this.cartModel.getCart(),
      this.handleUpdateCart,
      this.handleRenderCheckout
    );
    this.cartView.bindDeleteProduct(this.handleHiddenProduct);
    this.cartView.bindChangeQuantity();
    this.cartView.bindUpdateCart(this.handleUpdateCart);
    this.cartView.bindCloseModalCart();
    this.cartView.bindCheckoutCart(this.handleRenderCheckout);
  };

  handleRenderProductsGrid = async () => {
    displayLoading();
    const res = await this.productService.getAllProducts();
    this.productModel.setProducts(res);
    this.productView.renderProductGrid(this.productModel.getProducts());
    this.productView.bindAddProducts(this.handleAddProduct);
    hideLoading();
  };

  handleSearchProducts = async (productName) => {
    const products = await this.productService.getAllProducts();
    this.productModel.setProducts(products);
    const result = this.productModel.searchProductByName(productName);
    this.productView.displayMessage(
      result ? "" : ALERT_MESSAGE.SEARCH_PRODUCT_LIST_EMPTY_HEADING
    );
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
          amount: existingProduct.amount + 1,
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
      const promises = deletedIds.map((deleteId) =>
        this.cartItemService.deleteProductFromCart(deleteId)
      );

      return promises;
    } catch (error) {}
  };

  handleUpdateProduct = async (updateItems) => {
    try {
      const promises = updateItems.map((item) =>
        this.cartItemService.updateCart({ id: item.id, amount: item.quantity })
      );
      
      return promises;
    } catch (error) {
    }
  };

  handleUpdateCart = async (quantities, deletedIds) => {
    try {
      displayLoading();
      await Promise.all([
        this.handleUpdateProduct(quantities),
        this.handleDeleteProduct(deletedIds),
      ]);
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG });
      this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.UPDATE_CART_FAILED_MSG });
    }
  };

  hanldeGetStates = async (countryId) => {
    const states = await this.stateService.getState();
    this.stateModel.setState(states);
    const listState = this.stateModel.getStateByCountry(countryId);
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
