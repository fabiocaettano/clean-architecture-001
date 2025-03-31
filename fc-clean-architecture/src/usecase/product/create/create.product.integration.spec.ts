import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";


describe("Test create product use case", () => {
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

    it("should create a product", async () => {
        
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "Product 1",
            price: 10,
            type: "a",
        }        

        const result = await usecase.execute(input);

        const output : OutputCreateProductDto = {
            id: result.id,
            name: result.name,  
            price: result.price,
        }

        expect(result).toEqual(output);
    });

    it("should thrown an error when missing is name", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "",
            price: 10,
            type: "b",
        }

        await expect(usecase.execute(input)).rejects.toThrow(
            "Name is required"
        )

    });

    it("should thrown an error when type is missing", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "Product 1",
            price: 10,
            type: "",
        }

        await expect(usecase.execute(input)).rejects.toThrow(
            "Product type not supported"
        )      
    });

    it("should thrown an error when type is incorrect", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "Product 1",
            price: 10,
            type: "c",
        }

        await expect(usecase.execute(input)).rejects.toThrow(
            "Product type not supported"
        )      
    });

    it("should thrown an error when price must be greater than zero", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "Product 1",
            price: -1,
            type: "a",
        }

        await expect(usecase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        )      
    });

    it("create a product of the type and apply price update", async() => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        let input : InputCreateProductDto = {
            name: "Product 1",
            price: 10,
            type: "b",
        }

        const result = await usecase.execute(input);

        const output : OutputCreateProductDto = {
            id: result.id,
            name: result.name,  
            price: Number(input.price * 2),
        }

        expect(result).toEqual(output);

    });

});