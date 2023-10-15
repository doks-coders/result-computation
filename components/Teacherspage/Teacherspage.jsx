import { useState } from "react"
import { Stack,Button,Text,Box,Select,Input,HStack,VStack,Textarea,Spinner,Flex } from "@chakra-ui/react"
import { AlertModal1 } from "../Misc/AlertModals"
import { modalOverlayDesign,getRandomString } from "../../constants"
import { Teachers } from "../../Datalayer/Teachers"
import Router from "next/router"
const Teacherspage = ({userid})=>{
    //Animations State
    const [loading, setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState({mode:'',message:''})

    const [teacher_data,setTeacherData] = useState({
        first_name:'',
        last_name:'',
        registration_no:'',
        subject_assigned:'',
        gender:'',
        nationality:'',
        state_of_origin:'',
        local_government:'',
        address:''
    })
    const subjects = [
        "Mathematics",
        "English",
        "Social Studies",
        "Basic science",
        /*
        "French",
        "Home Economics",
        "Agric science",
        "Civic Education",
        "Phonics",
        "Bible Knowledge",
        "Yorùbá",
        "Creative Art",
        "Quantitative Reasoning",
        "Verbal Reasoning",
        "Vocational Aptitude",
        "Computer",
        "Handwriting",
        "Spelling"
        */
    ]
    const setTeacherInputData = (fieldName,fieldValue)=>{
        const copied = {...teacher_data}
        copied[fieldName] = fieldValue
        setTeacherData(copied)
    }
    const saveTeacher = async()=>{
        const data = {...teacher_data,profile_completed:true}
        setShowModal(true)
        setLoading(true)
        
        if(userid!=''){
            data['id'] = userid
        }else{
            data['id'] = getRandomString(10)
        }
        await new Teachers().saveOne(data)
        if(userid!=''){
            Router.push('/?type=teacher')
        }
        setLoading(false)
        setModalMessage({mode:'action',message:'Saved Teacher'})
       

    }

    return(
        <>
        {
          showModal?<Flex  {...modalOverlayDesign}>
                    {
                        loading?<Spinner/>:<AlertModal1 setShowModal={setShowModal} modalMessage={modalMessage}/>
                    }
                
            </Flex>:<></>
        }

          <VStack>
          <Stack w={["100%","50%","50%"]} >
                <Text px="3" textAlign={'center'}>TEACHER PERSONAL DATA</Text>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>FIRST NAME</Text>
                    <Input onChange={(e)=>setTeacherInputData('first_name',e.currentTarget.value)}  />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>LAST NAME</Text>
                    <Input onChange={(e)=>setTeacherInputData('last_name',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>REGISTRATION NO</Text>
                    <Input onChange={(e)=>setTeacherInputData('registration_no',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>SUBJECT ASSIGNMENT</Text>
                    <Select onChange={(e)=>setTeacherInputData('subject_assigned',e.currentTarget.value)} placeholder="None" >
                        {
                            subjects.map((val)=>(
                                <option value={val}>{val}</option>
                            ))
                        }

                    </Select>
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>GENDER</Text>
                    <Select onChange={(e)=>setTeacherInputData('gender',e.currentTarget.value)} placeholder="None">
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </Select>
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>NATIONALITY</Text>
                    <Input onChange={(e)=>setTeacherInputData('nationality',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>STATE OF ORIGIN</Text>
                    <Input onChange={(e)=>setTeacherInputData('state_of_origin',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>LOCAL GOVERNMENT</Text>
                    <Input onChange={(e)=>setTeacherInputData('local_government',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>ADDRESS</Text>
                    <Textarea onChange={(e)=>setTeacherInputData('address',e.currentTarget.value)} />
                </Box>
          </Stack>
          <Button onClick={saveTeacher}>Save Profile</Button>
          </VStack>

        </>
    )
}
export default Teacherspage