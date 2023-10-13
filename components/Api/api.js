import { getCartToken } from "../../config";
import {CustomerUsers} from '../../Datalayer/CustomerUsers'
let dev=false

//https://doks-script-pro-api.onrender.com/

//https://doks-script-pro-api-production.up.railway.app

//https://still-sunset-6305.fly.dev
let url = dev? 'http://localhost:3000':'https://doks-script-pro-api.onrender.com'
export default class API {
//doks-script-pro-api-production.up.railway.app
//http://localhost:3000/users/subscribe-user
  static async subscribeUser(item) {
    return new Promise(async (resolve, reject) => {
     item['id'] = item['email']
     let res  =await new CustomerUsers().saveOne(item)

     resolve({statusCode:200})
    })
  }


  static async getUser(item) {
    return new Promise(async (resolve, reject) => {
      try {
          console.log({item})
      let res = await fetch(`${url}/users/get-user/?email=${item.email}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
   
            return (response.json())
       
    
           
        })
        .then((responseData) => {

          return responseData;
        }).catch(err=>reject(err))
        .catch(error =>{ 
          console.warn(error)
          reject(error)
        
        });
        return resolve(res)
      } catch (error) {
        reject(error)
      }
    

    

    })
  }



  









}


/***
 *  const res = await fetch('https://hallmartsapi.herokuapp.com/shop/add/to/cart/details',
       {
           method: "POST",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body:JSON.stringify(cartItems)
       }).catch(err=>{
        console.log(err)
       })    

    try {
      return res.json()
    } catch (error) {
      return []
    }


    static async subscribeUser(item) {
    return new Promise(async (resolve, reject) => {
      let res = await fetch(`${url}/users/subscribe-user`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item)
        })
        .then((response) => response.json())
        .then((responseData) => {

          return responseData;
        })
        .catch(error =>{ 
          console.warn(error)
          reject(error)
        
        });

      return resolve(res)

    })
  }

 */