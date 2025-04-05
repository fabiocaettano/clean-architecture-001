import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputFindCustomerDto } from "../../customer/find/find.customer.dto";
import FIndProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a","Product 1", 100);

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
  };

  describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
      const repository = MockRepository();
      const useCase = new FIndProductUseCase(repository); 

      const input : InputFindCustomerDto = {
        id: product.id,
      };      
  
      const output = await useCase.execute(input);
  
      expect(output.id).toBe(product.id);
      expect(output.name).toBe(product.name);
      expect(output.price).toBe(product.price);      
      
    });   

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
          throw new Error("Product not found");
        });
        const usecase = new FIndProductUseCase(productRepository);
    
        const input = {
          id: "123",
        };
    
        expect(() => {
          return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });

  });