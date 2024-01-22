import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendFistNotificationyWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{

    handle(event: CustomerCreatedEvent): void {
        console.log(`Send first notification  ....`);
    }
}