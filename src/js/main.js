import ProductController from "./controllers/productController";
import ProductModel from "./models/productModel";
import ProductView from "./views/productView";

const app = new ProductController(new ProductModel(), new ProductView());
