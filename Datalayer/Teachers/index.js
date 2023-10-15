import { BASE_DB } from "../BASE"
export class Teachers extends BASE_DB{
    getCollectionName(){
        return 'teachers'
    }
}