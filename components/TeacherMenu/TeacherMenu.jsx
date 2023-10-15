import { useState,useEffect } from "react"
import { SectionsClicked } from "../Homepage/HomepageElements"
import { Grid,Stack,VStack,Text } from "@chakra-ui/react"
import { Teachers } from "../../Datalayer/Teachers"
const TeacherMenu  = ()=>{
    const [name,setName] = useState('')
    const [subject,setSubject] = useState('')
    useEffect(()=>{
        
        const downloadStudents = async()=>{
            const id = localStorage.getItem('userid')
            const user = await new Teachers().getOne(id)
            if(user){
                const {first_name,last_name} = user
                setName(`${last_name} ${first_name}`)
                setSubject(user['subject_assigned'])
            }
        }
        downloadStudents()
    },[])

    return(
        <>
        <Stack p={4}>
        <VStack>
                <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xx-large'}>Welcome {name}</Text>
                <Text textAlign={'center'} fontSize={'x-large'}>Subject: {subject}</Text>
        </VStack>
        <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} gap="2" >              
            <SectionsClicked
                        title={'Upload Result'}
                        text = {'Upload Result to Student Profile'}
                        btnText = {'Upload'}
                        link={'student-list?mode=upload_result'}
                        icon={'pi pi-file'}
                    />
            <SectionsClicked
                        title={'View Student\'s Grade'}
                        text = {'View Your Student\'s Grade, from your Subjects'}
                        btnText = {'View'}
                        link={'view-grade'}
                        icon={'pi pi-chart-bar'}
                    />
        </Grid>
        </Stack>
        </>
    )
}
export default TeacherMenu