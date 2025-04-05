import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import { InputCreateProductDto, InputFindProductDto } from "./find.product.dto";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCaseFind = new FindProductUseCase(productRepository);
    const usecaseCreate = new CreateProductUseCase(productRepository);

    let input : InputCreateProductDto = { 
      type: "a",
      name: "Product",          
      price: 300     
    };   
    
    const result1 = await usecaseCreate.execute(input);          

    let id : InputFindProductDto = { id: result1.id };

    const output = {
      id: result1.id,
      name: "Product",          
      price: 300           
    };    

    const result2 = await useCaseFind.execute(id)  

    expect(result2).toEqual(output);
  });
});
