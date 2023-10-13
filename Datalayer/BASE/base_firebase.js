
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED, memoryLocalCache, persistentLocalCache } from '@firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { FirebaseCredentials } from "../config/credentials";
import { collection,setDoc, getDocs, addDoc, updateDoc, deleteDoc, doc,getDoc, onSnapshot, where, query } from 'firebase/firestore'
import { popKey } from "../../Business/MiscFunctions/OperationFunctions";
import { BASE_PARENT } from "./base_parent";

const app = initializeApp(new FirebaseCredentials().config)
const db = initializeFirestore(app,
{
    localCache: persistentLocalCache({})
    //cacheSizeBytes:CACHE_SIZE_UNLIMITED//  
}
);

export class BASE_FIREBASE extends BASE_PARENT{
    constructor() {
      super()
     }

    getDB() {
        return db

    }

    getCollection(id) {
        if (id) {
            return collection(this.getDB(), this.getCollectionName(), id);
        }
        return collection(this.getDB(), this.getCollectionName());
    }

    _getDoc(id) {
        if (id) {
            return doc(this.getDB(), this.getCollectionName(), id);
        }
        return doc(this.getDB(), this.getCollectionName());
    }

    async saveRecord(obj) {
        obj = this._toObj(obj)
       return await setDoc(doc(this.getCollection(), obj['id']), obj);
    }

    async updateRecord(obj, id) {
        return await updateDoc(this._getDoc(id), obj)
    }

    async deleteRecord(id) {
        return await deleteDoc(this._getDoc(id))
    }
    simpleQuery(query_obj){
        const {field,value,comparator}= query_obj
        return query(this.getCollection(), where(field, comparator, value));
    }
    async findRecord(query_obj){ //{field:value}
        const type = popKey(query_obj,'query_type')
        let q=null
        if(type=='SimpleQuery'){
            q = this.simpleQuery(query_obj)
        }
        const data = await getDocs(q);

        return data.docs.map((doc)=>({...doc.data(),firebase_id:doc.id}))
    }

    async getAllRecords(){
        const data = await getDocs(this.getCollection())
        return data.docs.map((doc)=>({...doc.data(),firebase_id:doc.id}))
    }
    async getOnebyId(id){
        const docSnap = await getDoc(this._getDoc(id));
        return docSnap.data()
    }
 
    async doFireFind(query){
        const _q = query(this.getCollection(), query)
        const data= await getDocs(_q);
        return data.docs.map((doc)=>({...doc.data(),firebase_id:doc.id}))

}

    getCollectionName(name) {
        return name
    }

}
