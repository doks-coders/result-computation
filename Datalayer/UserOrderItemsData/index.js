import { BASE_DB } from "../BASE"

export class UserOrderItemsData extends BASE_DB{
    getCollectionName(){
        return 'user_order_items_data' 
    }
    
}