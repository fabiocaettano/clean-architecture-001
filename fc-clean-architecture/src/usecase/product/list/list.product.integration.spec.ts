import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import { OutputListProductDto } from "./list.product.dto";	
import Product from "../../../domain/product/entity/product";


describe("Test list product use case", () => {
    let sequelize : Sequelize;
    
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

    it("should list products", async () => {
        
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product1 = new Product("a","Product 1", 10);
        const product2 = new Product("b","Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const result = await usecase.execute();

        const output : OutputListProductDto = {
            products: [
                {
                    id: product1.id,
                    name: product1.name,
                    price: product1.price,
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price,
                }
            ]
        }

        expect(result).toEqual(output);
        expect(result.products.length).toBe(2);
    });
});