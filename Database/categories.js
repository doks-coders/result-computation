import { aboutMessage } from "./aboutMessage"

let categories = [
    {title:'E Commerce Research',
    about:aboutMessage.replace('{about}',`
    This product entails the utilization of digital research processes to extract
    product information, pricing, availability, and customer reviews from online retailers.
     Allow us to elaborate on the packages available and provide an overview of how they 
    function.<br>
    `),
    image:'/Landing/image5.png',
    category:'Extraction',
    text:`Retrieve product information, pricing, availability, and customer reviews from online retailers.
    Track and compare prices across multiple e-commerce platforms`,
    handlers:'Tech Team',
    custom:false
    },    
{title:'Social Media Research',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to extract user profiles, public posts, 
followers, and engagement metrics from social media platforms.
 Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`),
image:'/Landing/image11.png',
category:'Extraction',
text:`Gather user profiles, public posts, followers, and engagement metrics from social media platforms.`,
handlers:'Tech Team',
custom:false
},


{title:'Job Listings Research',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to extract valuable information for job descriptions, titles, locations, and company information from job boards and career websites. Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`),
image:'/Landing/image10.png',
category:'Extraction',
text:`Scrape job descriptions, titles, locations, and company information from job boards and career websites,`,
handlers:'Tech Team',
custom:false},



{title:'Real Estate Research',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to retrieve property details,
 pricing, location, and amenities from real estate websites.
Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`)
,
image:'/Landing/image13.png',
category:'Extraction',
text:'Retrieve property details, pricing, location, and amenities from real estate websites. ',
handlers:'Tech Team',
custom:true},



{title:'News and Media',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to extract news articles, headlines, authors, and publication information from news websites.
Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`)
,
image:'/Landing/image12.png',
category:'Extraction',
text:'Extract news articles, headlines, authors, and publication information from news websites. ',
handlers:'Tech Team',
custom:true},
{title:'Travel Research',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to extract extract flight schedules, prices, availability, hotel details, and reviews from travel websites.
Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`)
,
image:'/Landing/image14.png',
category:'Extraction',
text:'Flight and hotel data: Extract flight schedules, prices, availability, hotel details, and reviews from travel websites ',
handlers:'Tech Team',
custom:true},

{title:'Health Research',
about:aboutMessage.replace('{about}',`
This product entails the utilization of digital research processes to retrieve nutritional data, ingredients, and dietary information for food products,  We can also collect medical studies, research papers, clinical trial data, and healthcare provider information
Allow us to elaborate on the packages available and provide an overview of how they 
function.<br>
`)
,
image:'/Landing/image15.png',
category:'Extraction',
text:'Retrieve nutritional data, ingredients, and dietary information for food products, Collect medical studies, research papers, clinical trial data, and healthcare provider information',
handlers:'Tech Team',
custom:true}




]

export default categories