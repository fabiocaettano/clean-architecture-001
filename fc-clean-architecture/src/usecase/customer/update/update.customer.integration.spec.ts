import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import UpdateCustomerUseCase from "./update.customer.usecase";
import FindCustomerUseCase from "../find/find.customer.usecase";
import { 
    InputCreateCustomerDto,
    InputUpdateCustomerDto,
    OutputUpdateCustomerDto } from "./update.customer.dto";


describe("Test update customer use case", () => {
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
        const usecaseCreateCustomer = new CreateCustomerUseCase(customerRepository);
        const usecaseUpdateCustomer = new UpdateCustomerUseCase(customerRepository);
        const usecaseFindCustomer = new FindCustomerUseCase(customerRepository);

        // Create a customer
        const input1 : InputCreateCustomerDto = {
            name: "John",
            address: {
              street: "Street",
              city: "City",
              number: 123,
              zip: "Zip",
            },
        };
        
        const result1 = await usecaseCreateCustomer.execute(input1);

        // Update the customer
        const input2 : InputUpdateCustomerDto = {
            id: result1.id,
            name: "Fabio",      
            address: {
                street: "Av Paulista",
                city: "São Paulo",
                number: 1000,
                zip: "01310-100",
            },
        };
        
        const result2 = await usecaseUpdateCustomer.execute(input2);

        // Find the customer
        const customer = await usecaseFindCustomer.execute({ id: result1.id });

        const output: OutputUpdateCustomerDto = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip,
            },
        };        

        // Assertions
        expect(result2).toEqual(output);
    });
});
