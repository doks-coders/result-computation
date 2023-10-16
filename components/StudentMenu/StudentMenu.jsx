import { useEffect, useState } from "react"
import { SectionsClicked } from "../Homepage/HomepageElements"
import { Grid,Stack,VStack,Text } from "@chakra-ui/react"
import { Students } from "../../Datalayer/Students"
const StudentMenu  = ()=>{
    const [userid,setUserId] = useState('')
    const [name,setName] = useState('')
    const [class_assigned,setClass] = useState('')
    useEffect(()=>{
        const downloadStudents = async()=>{
            const id = localStorage.getItem('userid')
            setUserId(id)
            const user = await new Students().getOne(id)
            if(user){
                const {first_name,last_name} = user
                setName(`${last_name} ${first_name}`)
                setClass(user['class_assigned'])
            }
        }
        downloadStudents()
    },[])

    return(
        <>
        <Stack p={4}>
        <VStack>
                <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xx-large'}>Welcome {name}</Text>
                <Text textAlign={'center'} fontSize={'x-large'}>Class: {class_assigned}</Text>
                
        </VStack>
        <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} gap="2" >              
            {
            /*    
            <SectionsClicked
                title={'Register Subjects'}
                text = {'Register Your Subjects For the term'}
                btnText = {'Register'}
                link={`register-subject?userid=${userid}`}
                icon={'pi pi-book'}
            />
            */
            }
            <SectionsClicked
                        title={'View Grade'}
                        text = {'View Your Grade'}
                        btnText = {'View'}
                        link={`view-student-grade?userid=${userid}`}
                        icon={'pi pi-chart-bar'}
                    />
        </Grid>
        </Stack>
        </>
    )
}
export default StudentMenu