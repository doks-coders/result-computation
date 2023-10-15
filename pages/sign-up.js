import SignUpAuthentication from "../components/Authentication/SignUpAuthentication"
import Head from "next/head"
const landingpage = ({type})=>{
    return (
        <>
            <SignUpAuthentication type={type}/>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const {type} = query;
  
    return {
      props: {
       type
      },
    };
  }

export default landingpage

