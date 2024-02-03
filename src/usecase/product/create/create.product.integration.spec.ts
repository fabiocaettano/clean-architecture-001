import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

describe("Test create product use case", () => {

    let sequelize : Sequelize;

    beforeEach(async() =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () =>{
        await sequelize.close(); 
    });

    it("create a product use case", async() => {

        const productRepository = new ProductRepository();
        const useCase = new CreateProductUsecase(productRepository);

        const input = {
            name: "Product 1",
            price: 5.00
        }

        const result = await useCase.execute(input);

        const output = {
            id: result.id,
            name: result.name,
            price: result.price
        }

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    });
});