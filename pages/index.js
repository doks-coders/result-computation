import Homepage from "../components/Homepage/Homepage"
import Head from "next/head"
const landingpage = ()=>{

    
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

        <Homepage/>
        </>
    )
}

export default landingpage

