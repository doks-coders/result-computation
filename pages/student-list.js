import StudentList from "../components/Studentpage/StudentList"
import Head from "next/head"
import { useRouter } from "next/router";
const studentList = ({mode}) => {
    console.log(mode)
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

        <StudentList mode={mode} />
        </>
    )
}

export async function getServerSideProps({ query }) {
    const { mode } = query;
  
    return {
      props: {
        mode
      },
    };
  }
  

export default studentList

