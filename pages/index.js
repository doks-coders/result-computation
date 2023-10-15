import Homepage from "../components/Homepage/Homepage"
import Head from "next/head"
const landingpage = ({type})=>{

    
    return (
        <>
         <Head>
    <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
    />

    <meta
    name="description"
    content={`Harness the Web: DOKS Script Pro, Your Web Automation and Data Extraction Companion!`}
    />
      <meta
    charSet='utf-8'
    />
    <link rel="icon" href='./favicon.ico' />
    <title>{'Doks Script Pro'}</title>
    
   </Head>

        <Homepage type={type}/>
        </>
    )
}

export async function getServerSideProps({ query }) {
  const {type} = query;
  let typeSelected
  if(!type){
    typeSelected =''
  }else{
    typeSelected=type
  }
  return {
    props: {
     type:typeSelected
    },
  };
}

export default landingpage

