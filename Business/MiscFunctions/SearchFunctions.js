import { TimelineElements } from "../../Datalayer/TimelineElements"
import { OrderItemsData } from "../../Datalayer/OrderItemsData"
import { CustomerReviews } from "../../Datalayer/CustomerReviews"
import { DispatcherReviews } from "../../Datalayer/DispatcherReviews"
import { CustomerCosts } from "../../Datalayer/CustomerCosts"
import { UserOrderItemsData } from "../../Datalayer/UserOrderItemsData"
export  const searchFn = (all_items,searchInput,fn)=>{
    if (searchInput == '') {
        fn([...all_items])
    } else {
        let searched = all_items.filter(val => JSON.stringify(val).toLowerCase().indexOf(searchInput.toLowerCase()) > -1)
        fn(searched)
    }
}
//::END


export const setUserDisplayData = async({timeLineElements,dispatcher_reviews,customer_costs,order_items,id})=>{
      /******
   * 1-many Relationships, 1 id for log items 
   * 
   * timeLineElements = id for a dispatch rider
   * 
   * searchForAllItems with ids timeLine
   * 
   * timeLines are connected to logs
   * and these logs are connected to the time lines
   * 
   */
const newCurrentRecords = {}
let selected_time_elements = []
let customer_review_elements = []
let revenue_costs = []
let order_item_elements = []
/*
for (const el of timeLineElements) {
    (el.parent_id === id) ? selected_time_elements.push(el) : ''
}
for (const el of dispatcher_reviews) {
    (el.customer_id === id) ? customer_review_elements.push(el) : ''
}
for (const el of customer_costs) {
    (el.parent_id === id) ? revenue_costs.push(el) : ''
}
for( const el of order_items){
    (el.customer_id==id)? order_item_elements.push(el):''
}
*/
selected_time_elements = await  new TimelineElements().findRecord({field:'parent_id',
                                                           value:id,
                                                           comparator:'==', 
                                                           query_type:'SimpleQuery'})

customer_review_elements = await  new DispatcherReviews().findRecord({field:'customer_id',
                                                           value:id,
                                                           comparator:'==', 
                                                           query_type:'SimpleQuery'})
            
revenue_costs = await  new CustomerCosts().findRecord({field:'parent_id',
                                                           value:id,
                                                           comparator:'==', 
                                                           query_type:'SimpleQuery'})
                                                           console.log({revenue_costs,id})
                                                           
order_item_elements = await  new UserOrderItemsData().findRecord({field:'customer_id',
                                                           value:id,
                                                           comparator:'==', 
                                                           query_type:'SimpleQuery'})

newCurrentRecords['timeLineElements'] = selected_time_elements
newCurrentRecords['customerReviews'] = customer_review_elements
newCurrentRecords['revenueCosts'] = revenue_costs
newCurrentRecords['orderItems'] = order_item_elements
return newCurrentRecords
}
//::END


 /**This organises the keys in an object, it makes sure the items match the schema */
   
export const organiseItems = ({schema,object})=>{
    let organised_array={}
    try {
        for(const key of schema){
            organised_array[key] = object[key]
        }
    } catch (error) {
        throw Error('There is a problem here, most likely a key does not exist')
    }
    return {values:Object.values(organised_array),keys:Object.keys(organised_array)}
}
//::END