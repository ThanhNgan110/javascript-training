import ProductController from "./controllers/product.controller";
import CartController from "./controllers/cart.controller";
import CartModel from "./models/cart.model";
import CartItemModel from "./models/cartItem.model";
import ProductModel from "./models/product.model";
import CartView from "./views/cart.view";
import ProductView from "./views/product.view";
import CartService from "./services/cart.service";
import CartItemService from "./services/cartItem.service";
import ProductService from "./services/product.service";

const cartController = new CartController(new CartModel(), new CartItemModel(), new ProductModel(), new CartView(), new ProductView(), new CartService(), new CartItemService());
const productController = new ProductController(new ProductModel(), new ProductView(), new ProductService(), new CartController());
const init = { productController, cartController};


