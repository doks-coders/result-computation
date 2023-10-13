import ViewResult from "../components/ViewResult/ViewResult"
import Head from "next/head"
const landingpage = ({userid,session,selected_class,selected_term})=>{
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

        <ViewResult userid={userid} session={session} selected_class={selected_class} selected_term={selected_term}/>
        </>
    )
}

export async function getServerSideProps({ query }) {
  const { userid,session,selected_class,selected_term} = query;

  return {
    props: {
      userid,
      session,
      selected_class,
      selected_term
    },
  };
}

export default landingpage