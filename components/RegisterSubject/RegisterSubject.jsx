import { Box,HStack,VStack,Stack,Input,Text,Select,Table,Thead,Tr,Th,Td,Tbody,Checkbox,Button,Flex,Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Results } from "../../Datalayer/Results"
import { AlertModal1 } from "../Misc/AlertModals"
import { modalOverlayDesign } from "../../constants"
const RegisterSubject = ({userid})=>{
    const subjects = [
        "Mathematics",
        "English",
        "French",
        "Home Economics",
        "Social Studies",
        "Agric science",
        "Civic Education",
        "Phonics",
        "Basic science",
        "Bible Knowledge",
        "Yorùbá",
        "Creative Art",
        "Quantitative Reasoning",
        "Verbal Reasoning",
        "Vocational Aptitude",
        "Computer",
        "Handwriting",
        "Spelling"
    ]

    const [indexes,setIndexex] = useState([])
    const [session,setSession] = useState('')
    const [term,setTerm] = useState('')
    const [all_subjects_selected,setAllSubjectsSelected] = useState(false)

    //Animations
    const [loading, setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState({mode:'',message:''})

    
    const registerSubjects = async()=>{
        const subjects_selected= indexes.map(val=>subjects[val])
        let proceed=true
        if(userid ==undefined){
            alert('No User Id has been Selected')
            proceed=false
        }
        if(term==''){
            alert('No Term has been Selected')
            proceed=false
        }
        if(session==''){
            alert('No Session has been Selected')
            proceed=false
        }
        const subject_grade = subjects_selected.map(val=>{
            return({
                subject_name:val,
                uploaded:false,
                test_score:0,
                class_work:0,
                home_work:0,
                exam:0,
                term:term,
                session:session,
                user_id:userid,
                user_id_string:`${userid}-${session}-${term}`
            })
        })
        if(proceed){
            setShowModal(true)
            setLoading(true) 
            for(const subject of subject_grade){
                subject['id'] = subject.user_id_string+`-${subject.subject_name}`
                await new Results().saveOne(subject)
            }
            setLoading(false)
            setModalMessage({mode:'action',message:'Registered Subjects'})
        }
        
        
    }
    const selectAll= ()=>{
        const index=0
        const all_indexes=[]
        for (const subject of subjects){
            all_indexes.push(index)
            index++
        }
        setIndexex(all_indexes)
    }
    const getIndexes=(index,value)=>{
        let set = [...indexes]
        if(value){
            set.push(index)
        }else{
            set = set.filter((element) => element !== index);
        }
        setIndexex(set)
    }
    const areAllIndexesSelected = ()=>{
        let index=0
        let matched=[]
        for (const subject of subjects){
            if(indexes.includes(index)){
                matched.push(index)
            }
            index++
        }
        if(matched.length==subjects.length){
            return true
        }
        return false
    }
    useEffect(()=>{
        setAllSubjectsSelected(areAllIndexesSelected())
    },[indexes])
return(
    <>
    {
          showModal?<Flex {...modalOverlayDesign} >
                {
                    loading?<Spinner/>:<AlertModal1 setShowModal={setShowModal} modalMessage={modalMessage}/>
                }
                
            </Flex>:<></>
        }
    <Stack>
        <HStack>
            <Select w="100%" onChange={(e)=>setTerm(e.currentTarget.value)} placeholder="Term">
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
            </Select>
            <Select w="100%" onChange={(e)=>setSession(e.currentTarget.value)} placeholder="Session">
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
            </Select>
        </HStack>
        <Table>
            <Thead>
                <Tr>
                    <Th>
                        Subject Name
                    </Th>
                    <Th>
                        Registered
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
            <Tr>
                            <Td>
                               <Text>Select All</Text>
                            </Td>
                            <Td>
                                <Checkbox isChecked={all_subjects_selected} onChange={(e)=>selectAll()} />
                            </Td>
                            
                        </Tr>
                {
                    subjects.map((val,index)=>(
                        <Tr>
                            <Td>
                                {val}
                            </Td>
                            <Td>
                                <Checkbox isChecked={indexes.includes(index)} onChange={(e)=>getIndexes(index,e.currentTarget.checked)} placeholder={val}/>
                            </Td>
                            
                        </Tr>
                    ))
                }
                
            </Tbody>
        </Table>
        <Flex justifyContent="center">
            <Button colorScheme="blue" onClick={()=>registerSubjects()}>Register Subjects</Button>
        </Flex>
    </Stack>
    </>
)
}
export default RegisterSubject