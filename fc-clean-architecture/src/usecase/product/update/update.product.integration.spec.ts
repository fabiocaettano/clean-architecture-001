import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import FindProductUseCase from "../find/find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
                                
describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });                
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should create a productA and update to productB", async () => {
        const productRepository = new ProductRepository();
        const usecaseCreateProduct = new CreateProductUseCase(productRepository);        
        const usecaseFindProduct = new FindProductUseCase(productRepository);        
        const usecaseUpdateProduct = new UpdateProductUseCase(productRepository);
        
        // Create a product
        const input1: InputCreateProductDto = {
            name: "Product 1",
            price: 100,
            type: "a",
        };

        const result1 = await usecaseCreateProduct.execute(input1);        

        const result2 = await usecaseFindProduct.execute({ id: result1.id });

        const result3  = ProductFactory.update("b", result2.id, "Product 1 Atualizado", 100);

        const input2 : InputUpdateProductDto = {
            id: result3.id,
            name: result3.name,
            price: result3.price,
        };

        const result4 = await usecaseUpdateProduct.execute(input2);

        const output : OutputUpdateProductDto = {
            id: expect.any(String),
            name: "Product 1 Atualizado",
            price: 200,   
        }
        expect(result4).toEqual(output);
    });
});