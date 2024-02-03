import CreateProductUsecase from "./create.product.usecase";

const input = {
    name: "Papel Offset",
    price: 5.00,
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };
  };

  describe("Unit test create product use case", () => {
    it("should create a product", async () =>{
        const productRepository = MockRepository(); 
        const productCreateUseCase = new CreateProductUsecase(productRepository);
        const ouput = await productCreateUseCase.execute(input);

        expect(ouput).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })
  });