import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("738000132","Papel OffSet",5.00);
product.changePrice(5.00);

const MockRepositoy = () => {
    return{
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find product usecase", () =>{

    it("should fin a product", async()=> {
        const productRepository =  MockRepositoy();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "738000132",
        }

        const output = {
            id: "738000132",
            name: "Papel OffSet",
            price: 5.00
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output);
    })

    it("should not find a product", async()=> {
        const productRepository =  MockRepositoy();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product Not Found");
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id : "738000132",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product Not Found");
    })
})
