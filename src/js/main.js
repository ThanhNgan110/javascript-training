import ProductController from "./controllers/product.controller";
import CartController from "./controllers/cart.controller";

const productController = new ProductController();
// const cartController = new CartController();
// const init = { productController, cartController };
const init = { productController};
const app = init;

