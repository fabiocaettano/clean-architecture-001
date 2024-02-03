import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Test create customer use case", () => {

    let sequelize : Sequelize;

    beforeEach(async() =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () =>{
        await sequelize.close(); 
    });

    it("create customer use case", async() => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);
        
        const input = {
            name: "User 1",
            address:{
                street: "Rua Um",
                number: 1,
                zip: "00001-000",
                city: "City 1"
            }
        }

        const result =  await useCase.execute(input);

        const output = {
            id: result.id,
            name: result.name,
            address: {
                street: result.address.street,
                number: result.address.number,
                zip: result.address.zip,
                city: result.address.city
            }
        }

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address :{
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        })       

    });

    
});