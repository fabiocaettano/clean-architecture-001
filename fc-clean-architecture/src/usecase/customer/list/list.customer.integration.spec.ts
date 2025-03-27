import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "../create/create.customer.usecase";

describe("Test list customer usecase", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });    
        
        sequelize.addModels([CustomerModel]);        
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("should list all customers", async () => {
        const customerRepository = new CustomerRepository();
        const usecaseListCustomer = new ListCustomerUseCase(customerRepository);

        const usecaseCreateCustomer = new CreateCustomerUseCase(customerRepository);
        const customer1 = new Customer("123", "John");
        const address1 = new Address("Street", 123, "Zip", "City");
        customer1.changeAddress(address1);        
        await customerRepository.create(customer1);        
        await usecaseCreateCustomer
      });

});