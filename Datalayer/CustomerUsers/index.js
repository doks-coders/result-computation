import { BASE_DB } from "../BASE"


export class CustomerUsers extends BASE_DB{
    getCollectionName(){
        return 'customer_users'
    }
    
    

}