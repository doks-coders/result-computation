import CreateResult from "../components/CreateResult/CreateResult"
import Head from "next/head"
const uploadresult = ({userid}) => {
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
        <title>{'Create Results'}</title>

      </Head>

      <CreateResult userid={userid} />
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
export default uploadresult

