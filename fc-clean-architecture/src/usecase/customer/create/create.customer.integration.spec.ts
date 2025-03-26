import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Test create customer use case", () => {
    let sequelize : Sequelize;
    
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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);        
        await customerRepository.create(customer);        
           
        const input = {
            name: "John",
            address: {
              street: "Street",
              city: "City",
              number: 123,
              zip: "Zip",
            },
        };
        
        const result = await usecase.execute(input);

        const output = {
            id: expect.any(String),
            name: "John",
            address: {
              street: "Street",
              city: "City",
              number: 123,
              zip: "Zip",
            },
        };
      
        expect(result).toEqual(output);
    });
});
