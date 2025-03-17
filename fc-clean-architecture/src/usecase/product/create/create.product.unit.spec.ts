import CreateProductUsecase from "./create.product.usecase"

const input = {
    type: "a",
    name: "Product A",
    price: 5
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  describe("Unit test create product use case", () => {

    it("should create a product", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should thrown an error when name is missing", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
        input.name = "";
        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        )
    });

    it("should throw an error when type is missing", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
        input.type = "";
        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Product type not supported"
        )
    });

    it("should throw an error when type is incorrect", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
        input.type = "c";
        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Product type not supported"
        )
    });

    it("should throw an error when price musst be grater than zero", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(productRepository);
        input.name = "product a"
        input.type = "a";
        input.price = -2;
        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        )
    });

    it("should create a product b", async() => {
        const customerRepository = MockRepository();
        const createProductUseCase = new CreateProductUsecase(customerRepository);
        input.name = "produto E"
        input.type = "b";
        input.price = 40;
        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: Number(input.price * 2)
        });        
    });
  });