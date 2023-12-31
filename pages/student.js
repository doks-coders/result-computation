import Studentpage from "../components/Studentpage/Studentpage"
import Head from "next/head"
const student = ({userid})=>{

    
    return (
        <>
         <Head>
    <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
    />

    <meta
    name="description"
    />
      <meta
    charSet='utf-8'
    />
    <link rel="icon" href='./favicon.ico' />
    <title>{'Create Student'}</title>
    
   </Head>

        <Studentpage userid={userid}/>
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

export default student

