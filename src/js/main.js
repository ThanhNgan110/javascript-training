import {ProductController} from "./controllers/ProductController";
import {ProductModel} from "./models/ProductModel";
import { ProductView } from "./views/ProductView";

const app = new ProductController(new ProductModel() , new ProductView() );
