//Converting Firebase Id to Normal Id

import {getRandomString} from '../../constants/index'
export class BASE_PARENT{
    constructor() {
  
     }
 _toObj(obj){
 if (!('id' in obj)){
    obj['id'] = getRandomString()
 }
 return obj
 
 }
}