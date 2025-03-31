import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import { InputCreateCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

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

        let input1 : InputCreateCustomerDto = {      
              name: "John",
              address: {
                street: "Street",
                number: 123,
                zip: "3333",
                city: "City 3",
              },
         };   

         let input2 : InputCreateCustomerDto = {      
          name: "Mary",
          address: {
            street: "Street",
            number: 124,
            zip: "44444",
            city: "City 4",
          },          
        };   

        const result1 = await usecaseCreateCustomer.execute(input1); 

        const output1 : OutputListCustomerDto = {
          customers: [
            {
              id: result1.id,
              name: result1.name,
              address: {
                street: result1.address.street,
                city: result1.address.city,
                number: result1.address.number, 
                zip: result1.address.zip,  
              },
            },
          ],
        };
        
        const result2 = await usecaseCreateCustomer.execute(input2); 

        const output2 : OutputListCustomerDto = {
          customers: [
            {
              id: result2.id,
              name: result2.name,
              address: {
                street: result2.address.street,
                city: result2.address.city,
                number: result2.address.number, 
                zip: result2.address.zip,  
              },
            },
          ],
        };

        const result = await usecaseListCustomer.execute();
        
        expect(result.customers.length).toBe(2);
        expect(result.customers[0]).toEqual(output1.customers[0]);
        expect(result.customers[1]).toEqual(output2.customers[0]);        
    }); 
});