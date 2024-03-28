import ProductController from "./controllers/productController";
import CartController from "./controllers/cartController";

const productController = new ProductController();
const cartController = new CartController();
const init = {
   productController,
   cartController
}

const app = init;

