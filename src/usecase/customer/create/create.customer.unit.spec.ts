import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when street is missing", async () => {
    
    const customerRepository = MockRepository();    

    input.name = "John"
    input.address.street = "";
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);                

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });

  it("should thrown an error when number is missing", async () => {
    
    const customerRepository = MockRepository();    

    input.name = "John"
    input.address.street = "Street";
    input.address.number = 0;
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);                

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Number is required"
    );
  });

  it("should thrown an error when zip is missing", async () => {
    
    const customerRepository = MockRepository();    

    input.name = "John"
    input.address.street = "Street";
    input.address.number = 123;
    input.address.zip = "";
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);                

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Zip is required"
    );
  });

  it("should thrown an error when city is missing", async () => {
    
    const customerRepository = MockRepository();    

    input.name = "John"
    input.address.street = "Street";
    input.address.number = 123;
    input.address.zip = "zip";
    input.address.city = "";
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);                

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "City is required"
    );
  });
  
});