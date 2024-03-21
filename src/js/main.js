import ProductController from "./controllers/product.controller";
import ProductModel from "./models/product.model";
import ProductView from "./views/product.view";

const app = new ProductController(new ProductModel() , new ProductView() );
