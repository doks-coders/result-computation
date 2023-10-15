import StudentViewResult from "../components/ViewResult/StudentViewResult";
import Head from "next/head"
const landingpage = ({userid})=>{
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
    <title>{'View Grade'}</title>
    
   </Head>

        <StudentViewResult/>
        </>
    )
}
export async function getServerSideProps({ query }) {
  const { userid } = query;

  return {
    props: {
      userid
    },
  };
}

export default landingpage