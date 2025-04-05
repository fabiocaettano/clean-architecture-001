import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const productA = ProductFactory.create(
  "a",
  "Product A",
  5
);

const MockRepository1 = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve()),
    find: jest.fn().mockReturnValue(Promise.resolve(productA)),    
    update: jest.fn(),
  };
};

const productB = ProductFactory.create(
  "b",
  "Product B",
  5
);

const MockRepository2 = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve()),
    find: jest.fn().mockReturnValue(Promise.resolve(productB)),    
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  
  it("should update a product A", async () => {
    const productRepository = MockRepository1();        
    const updateProductUseCase = new UpdateProductUseCase(productRepository);    
    
    const productUpdateA = await updateProductUseCase.execute({
      id: productA.id,
      name: "Product AA",
      price: 6
    } as InputUpdateProductDto);

    const output = {      
      id: expect.any(String),
      name: "Product AA",
      price: 6
    }        

    expect(output).toEqual(productUpdateA);
  });

  it("should update a product B", async () => {
    const productRepository = MockRepository2();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const updateProductB = await updateProductUseCase.execute({
      id: expect.any(String),
      name: "Product BB",
      price: 5
    } as InputUpdateProductDto);

    const output = {
      id: expect.any(String),
      name: "Product BB",
      price: 10
    }

    expect(output).toEqual(updateProductB);
  });
});
