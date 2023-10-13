import Studentpage from "../components/Studentpage/Studentpage"
import Head from "next/head"
const student = ()=>{

    
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

        <Studentpage/>
        </>
    )
}

export default student

