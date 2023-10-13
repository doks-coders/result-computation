import { BASE_DB } from "../BASE"


export class Students extends BASE_DB{
    getCollectionName(){
        return 'students'
    }
    
    

}