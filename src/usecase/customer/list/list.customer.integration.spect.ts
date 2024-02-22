import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_objects/adresses";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Test list customer usecase", () => {

    it("should list a customers", async () => {

        const customerRepository = new CustomerRepository();
        const usecase  = new ListCustomerUseCase(customerRepository);

        const customer1 = new Customer("123", "John");
        const address1 = new Address("Street", 123, "Zip", "City");
        customer1.changeAddress(address1);

        const customer2 = new Customer("124", "Mary");
        const address2 = new Address("Street", 124, "Zip", "City");
        customer2.changeAddress(address2);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const output = await usecase.execute({});  
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});