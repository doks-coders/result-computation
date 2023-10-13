//Converting Firebase Id to Normal Id
import { v4 as uuidv4 } from 'uuid';
import { BASE_FIREBASE } from './base_firebase';

export class BASE_PARENT{
    constructor() {
  
     }
 _toObj(obj){
 if (!('id' in obj)){
    obj['id'] = uuidv4()
 }
 return obj
 
 }
}