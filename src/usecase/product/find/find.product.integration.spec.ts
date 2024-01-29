import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product usecase", () => {

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

      it("should find a product usecase", async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("738000132","Papel Offset",5.00)
        product.changePrice(5.00);

        await productRepository.create(product);       

        const input = {
            id: "738000132",
        }

        const output = {
            id: "738000132",
            name: "Papel Offset",
            price: 5.00
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output);

      });
});