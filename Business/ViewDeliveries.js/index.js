import { useState, useEffect } from "react"

import { order_items_data,delivery_data,customer_items } from "../../DataStorage/MainData"

const [deliveries_data,setDeliveriesData] = useState({'successful':[],'pending':[],'cancelled':[]})
useEffect(()=>{
    let data = {}
    data['successful']=delivery_data.filter(val=>val.status=="Delivered")
    data['pending']=delivery_data.filter(val=>val.status=="Pending")
    data['cancelled']=delivery_data.filter(val=>val.status=="Cancelled")
    setDeliveriesData(data)
},[])
useEffect(() => {
    /**Uses the Index Entered Key, Causes Change of the Items in the page to the array with the property */
    switch (tabNames[indexEntered]) {
        case 'All Deliveries':
                setItems(delivery_data)             
            break;
        case 'Successful':
            setItems(deliveries_data['successful'])
            break;
        case 'Pending':
            setItems(deliveries_data['pending'])
            break;
        case 'Cancelled':
            setItems(deliveries_data['cancelled'])
            break;

        default:
            break;
    }

}, [indexEntered])


const [order_items, setOrder_items] = useState(order_items_data)
const [items, setItems] = useState([itemModel])
/**This Schemas determine the order that the arrays are arranged */
const deliverItemSchema = ['order_id', 'customer_name', 'status', 'location']
const orderItemSchema = ['item', 'description', 'size', 'qty', 'cost']
const [customerDetails,setCustomerDetails] = useState([''])
const [orderDetails,setOrderDetails] = useState([''])
const [clicked,setClick] = useState(false)
const clickDeliveryItem = (id) => {
    /**Get Delivery Details**/
    let delivery_details = delivery_data.filter((val)=>val.order_id==id)[0]
    let customer = customer_items.find((val)=>val.id==delivery_details.customer_id) 
    let orders = order_items_data.filter((val)=>val.order_id==delivery_details.order_id)
    let customer_info = [`Name: ${customer['name']}`, `Address: ${customer['address']}`, `Postal Code: ${customer['postal_code']}`, `Phone Number: ${customer['phone_number']}`]
    let order_info = [`Preferred Method: ${delivery_details['preferred_method']}`, `Payment: ${delivery_details['payment']}`, `Time: ${delivery_details['time']}`]
    /**Update the View Here */
    setCustomerDetails(customer_info)
    setOrderDetails(order_info)
    setOrder_items(orders)
    setClick(true)
}