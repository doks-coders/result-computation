


import categories from "../../../Database/categories"

import Studentpage from "../../../components/Studentpage/Studentpage"
import Head from "next/head"
const student = () => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />

                <meta
                    name="description"
                    content={`Student Result`}
                />
                <meta
                    charSet='utf-8'
                />
                <link rel="icon" href='./favicon.ico' />
                <title>{`Student`}</title>

            </Head>
            <Studentpage/>
        </>
    )
}


export const getStaticProps = async (context) => {
    let id = Number(context.params.id)

    return {
        props: { id }
    }
}



export default student



//serve -s out -p 8000
