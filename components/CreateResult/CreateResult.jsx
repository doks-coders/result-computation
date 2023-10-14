import { Spinner,Box,HStack,VStack,Stack,Flex,Select,Text,Checkbox, Grid,Input,Button,Table,Tbody,Tr,Td,Divider,Thead,Th } from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { Results } from "../../Datalayer/Results"
import { Students } from "../../Datalayer/Students"
import { AlertModal1 } from "../Misc/AlertModals"

const CreateResult=({userid})=>{
    const [results,setResults] = useState([])

    const percentages = {
        test_score:20,
        class_work:10,
        home_work:10,
        exam:60,
    }
    const [user,setUser] = useState({name:'',class_assigned:''})
    const [searched,setSearched] = useState(false)
    const [selected_term,setSelectedTerm] = useState('')
    const [selected_session,setSelectedSession] = useState('')
    const [current_subjects,currentUserSubjects] = useState([])
    const [subject_selected,setSubjectSeleted] = useState(false)
    const [selected_subject, setSelectedSubject] = useState({
        subject_name:'',
        test_score:'',
        class_work:'',
        home_work:'',
        exam:''
    })

    //Animations State
    const [loading, setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState({mode:'',message:''})

    useEffect(()=>{
        const getUser = async ()=>{
            const student = await new Students().getOne(userid)
            const {first_name,last_name,class_assigned} = student
            setUser({
                name:`${last_name} ${first_name}`,
                class_assigned
            })

        }
        getUser()
        
    },[])
    //Search For Subjects
    const searchForSubjects=async()=>{
        const subjects = await new Results().findRecord({field:'user_id_string',
        value:`${userid}-${selected_session}-${selected_term}`,
        comparator:'==', 
        query_type:'SimpleQuery'})

        console.log(subjects)
        if(subjects.length){
            currentUserSubjects(subjects)
            setSearched(true)
        }else{
            alert('No Match')
        }
    }
    //Select Subject
    const selectSubject = (subject_name)=>{
        let subject = current_subjects.filter(val=>val.subject_name==subject_name)[0]
        setSelectedSubject(subject)
        setSubjectSeleted(true)
    }

    //Set Subject Score
    const updateSubjectScoreInput = (keyName,keyValue)=>{
        const copied = {...selected_subject}
        copied[keyName] = keyValue
        setSelectedSubject(copied)
        
    }
    const getPercentageEquivalent = (string,percentage_constant)=>{
        const [numerator,denominator]= string.split('/');
        const percentage=(numerator/denominator)* 100
        return Math.floor((percentage/100) * percentage_constant)
     }

    const sumOfAllSubjectScores = (current_subjects)=>{
        let total = 0
        current_subjects.forEach((val)=>{
            let {class_work,test_score,home_work,exam} = val
            if(class_work.toString().includes('/')){  
                class_work = getPercentageEquivalent(class_work,percentages['class_work'])
            }
            if(test_score.toString().includes('/')){
                test_score = getPercentageEquivalent(test_score,percentages['test_score'])
            }
            if(home_work.toString().includes('/')){
                home_work = getPercentageEquivalent(home_work,percentages['home_work'])
            }
            if(exam.toString().includes('/')){
                exam = getPercentageEquivalent(exam,percentages['exam'])
            }
            total += Number(class_work)+Number(test_score)+Number(home_work)+Number(exam)
        })
        return total
    }
    const saveSubjectScore = async()=>{
        const copied = [...current_subjects] //Copied student subjects state
        if(selected_subject.subject_name.length){
            //first layer
           const index = copied.findIndex(val=>val.subject_name==selected_subject.subject_name)
           //Second layer
           
           setShowModal(true)
           selected_subject['uploaded'] = true
           setLoading(true)
           await new Results().updateRecord(selected_subject,selected_subject.user_id_string+`-${selected_subject.subject_name}`)
           copied[index] = selected_subject
           currentUserSubjects(copied) //Saved student subjects state

           //Calculate Sum of All the Courses
           const student_object =  await new Students().getOne(userid)

           const sum = sumOfAllSubjectScores(copied)
           const updated_score = {}
           updated_score[selected_session+'-'+selected_term]={score:sum}
           let measured_scores = {}
           if(student_object['measured_scores']){
            measured_scores = student_object['measured_scores']
           }
           //Adds or Updates key of measured score, using sessions and time keys
           measured_scores = {...measured_scores, ...updated_score}
           //Updates Database on Firebase
           await new Students().updateRecord({measured_scores},userid)
           setLoading(false)
           setModalMessage({mode:'action',message:'Saved Result'})



        }
        
    }

  

return(
    <>
    {
        showModal?<Flex justifyContent={'center'} alignItems={"center"} zIndex={'4'}  position={'absolute'} h="100vh" w="100vw" >
        {
            loading?<Spinner/>:<AlertModal1 setShowModal={setShowModal} modalMessage={modalMessage}/>
        }
        
    </Flex>:<></>
    }


<Stack px="10px" spacing={'20px'}>
    <HStack>
        <Box p="3" color={'white'} bg={'blue.500'} className="pi pi-user" borderRadius={'10px'}>


        </Box>
        <Box flexDir="column" spacing={'10px'}>
            <Text><b>Name:</b> {user.name}</Text>
            <Text><b>Class:</b> {user.class_assigned}</Text>
        </Box>

    </HStack>
    
    
    <HStack>
        <Stack w="100%">
            <Text fontWeight={'bold'}>TERM</Text>
            <Select onChange={(e)=>setSelectedTerm(e.currentTarget.value)} placeholder="Choose Term">
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
            </Select>
        </Stack>

        <Stack w="100%">
            <Text fontWeight={'bold'}>SESSION</Text>
            <Select onChange={(e)=>setSelectedSession(e.currentTarget.value)} placeholder="Select Session">
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
            </Select>
        </Stack>
    </HStack>
    <Flex justifyContent={'center'}>
        <Button onClick={()=>searchForSubjects()} colorScheme="blue">Search</Button>
    </Flex>

<Flex flexDir={['column','column','row']} display={searched?'flex':'none'}>
    <Stack>
        <Text fontSize={'xl'}>Uploaded Results</Text>
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Uploaded</Th>
                </Tr>
            </Thead>
                {
                     current_subjects.map(val=>(
                        <Tr onClick={()=>selectSubject(val.subject_name)} _hover={{transition:'.2s ease',backgroundColor:'gray.200'}} cursor={'pointer'}>
                            <Td>
                                <Text>{val.subject_name}</Text>
                            </Td>
                            <Td>
                                <Checkbox isChecked={val.uploaded} /> 
                            </Td>
                        </Tr>
                    ))
                }
        </Table>
    </Stack>   

    <Stack display={subject_selected?'flex':'none'} w="100%">
        <Text mt={["30px","30px","0px"]} fontWeight={'bold'} textAlign={'center'}>{selected_subject.subject_name.toUpperCase()}</Text>
        <Grid w="100%" templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)"]}>
            <Box p="3">
                <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>CLASS WORK (10%)</Text>
                <Input onChange={(e)=>updateSubjectScoreInput('class_work',e.currentTarget.value)} placeholder="0" value={selected_subject.class_work}/>
            </Box>
            <Box p="3">
                <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>HOME WORK (10%)</Text>
                <Input onChange={(e)=>updateSubjectScoreInput('home_work',e.currentTarget.value)} placeholder="0" value={selected_subject.home_work}/>
            </Box>
            <Box p="3">
                <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>TEST SCORE (20%)</Text>
                <Input onChange={(e)=>updateSubjectScoreInput('test_score',e.currentTarget.value)} placeholder="0" value={selected_subject.test_score}/>
            </Box>
            <Box p="3">
                <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>EXAM (60%)</Text>
                <Input onChange={(e)=>updateSubjectScoreInput('exam',e.currentTarget.value)} placeholder="0" value={selected_subject.exam}/>
            </Box>
            
        </Grid>
        <Flex justifyContent={'center'}>
            <Button onClick={()=>saveSubjectScore()} colorScheme="blue">Save</Button>
        </Flex>
    </Stack>
    
</Flex>
</Stack>
    </>
)
}

export default CreateResult