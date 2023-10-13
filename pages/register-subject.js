import RegisterSubject from "../components/RegisterSubject/RegisterSubject";
import Head from "next/head"
import { useRouter } from "next/router";
const registersubject = ({userid}) => {
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
            <title>{'Student List'}</title>

        </Head>

        <RegisterSubject userid={userid}/>
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
  
  

export default registersubject

