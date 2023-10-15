
import Teacherspage from "../components/Teacherspage/Teacherspage"
import Head from "next/head"
const teachers = ({userid})=>{

    
    return (
        <>
        <Teacherspage userid={userid}/>
        </>
    )
}
export async function getServerSideProps({ query }) {
    let id;
    if(query['userid']){
      id = query['userid']
    }else{
      id=""
    }
  
    return {
      props: {
        userid:id
      },
    };
  }
  

export default teachers

