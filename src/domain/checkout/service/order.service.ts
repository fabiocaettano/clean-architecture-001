import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";
import Order from "../entity/order";

export default class OrderService{

    static placeOrder(customer: Customer, items: OrderItem[]): Order{

        if(items.length === 0){
            throw new Error("Order must have at least one item");
        }

        const order =  new Order(uuid(),customer.id, items);

        customer.addRewardPoints(order.total()/2);

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acumulador,order) => acumulador + order.total(),0);
    }
}