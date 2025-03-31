import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";
import { InputCreateCustomerDto, InputFindCustomerDto } from "./find.customer.dto";
import CreateCustomerUseCase from "../create/create.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecaseFind = new FindCustomerUseCase(customerRepository);
    const usecaseCreate = new CreateCustomerUseCase(customerRepository);

    let input : InputCreateCustomerDto = {      
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };   
    
    const result1 = await usecaseCreate.execute(input);          

    let id : InputFindCustomerDto = { id: result1.id };

    const output = {
      id: result1.id,
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    const result2 = await usecaseFind.execute(id)  

    expect(result2).toEqual(output);
  });
});
