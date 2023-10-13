import { BASE_DB } from "../BASE"
import { getDocs } from "firebase/firestore"

export class Results extends BASE_DB{
    getCollectionName(){
        return 'results'
    }

    async compoundQuery({subject_name,user_id_string}){
        const q = query(this.getCollection(), where("subject_name", "==", subject_name), 
        where("user_id_string", "==", user_id_string))
        const data = await getDocs(q);
        return data.docs.map((doc)=>({...doc.data(),firebase_id:doc.id}))     
    }
}