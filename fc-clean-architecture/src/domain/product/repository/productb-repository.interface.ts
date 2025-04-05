import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductB from "../entity/product-b";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductB> {}
