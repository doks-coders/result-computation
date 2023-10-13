import { BASE_FIREBASE } from "./base_firebase";

export class BASE_DB extends BASE_FIREBASE {
    constructor() {
        super(); 
     }

     async saveOne(obj){
        return await this.saveRecord(obj)
     }

     async getOne(id){
        return await this.getOnebyId(id)
     }
     async getAll(){
        return await this.getAllRecords()
     }
}
