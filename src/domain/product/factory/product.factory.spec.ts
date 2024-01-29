import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("Should create a proct type A ",() => {
        const product = ProductFactory.createTypeProduct("a","Product A",1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("ProductA");
    });

    it("Should create a proct type B ",() => {
        const product = ProductFactory.createTypeProduct("b","Product B",1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error when product type is not supported", () => {
        expect(() => ProductFactory.createTypeProduct("c","Product C", 1)).toThrowError("Product type not supported");
    });
});