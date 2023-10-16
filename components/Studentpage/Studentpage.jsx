import React, { useState } from "react"
import { Box, Flex, Stack, HStack, VStack, Text, Image, Button, Grid,Input, Select,InputGroup,InputLeftElement,InputRightElement, Textarea,Spinner} from "@chakra-ui/react"
import { Students } from "../../Datalayer/Students"
import { getRandomString,modalOverlayDesign } from "../../constants"
import { AlertModal1 } from "../Misc/AlertModals"
import Chance from "chance"

const Studentpage=({userid})=>{
    //Animations State
    const [loading, setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState({mode:'',message:''})

    const [student_data,setStudentData] = useState({
        first_name:'',
        last_name:'',
        registration_no:'',
        class_assigned:'',
        gender:'',
        nationality:'',
        state_of_origin:'',
        local_government:'',
        address:''
    })

    const [guardian_data,setGuardianData] = useState({
        guardian_name:'',
        phone_number:'',
        email_address:'',
        occupation:'',
        guardian_address:''
    })

    const setStudentInputData = (fieldName,fieldValue)=>{
        const copied = {...student_data}
        copied[fieldName] = fieldValue
        setStudentData(copied)
    }

    const setGuardianInputData = (fieldName,fieldValue)=>{
        const copied = {...guardian_data}
        copied[fieldName] = fieldValue
        setGuardianData(copied)
    }
    const saveStudent = async()=>{
        const data = {...guardian_data,...student_data,profile_completed:true}
        setShowModal(true)
        setLoading(true)
        

        if(userid!=''){
            data['id'] = userid
        }else{
            data['id'] = getRandomString(10)
        }
        await new Students().saveOne(data)


        setLoading(false)
        setModalMessage({mode:'action',message:'Saved Student'})
    }

    const saveDifferentStudents = async()=>{
        //Declare Number of Students in a Class
        const studentNumbers={
            'Primary 1':10,
            'Primary 2':10,
            'Primary 3':10,
            'Primary 4':10,
            'Primary 5':10,
            'Primary 6':10,
        }
        setShowModal(true)
        setLoading(true)
        for (const class_selected of Object.keys(studentNumbers)){
            const number_students =  studentNumbers[class_selected]
            for(let i=0;i<number_students;i++){ //Iterate through number of students for each class
                const chance = new Chance()
                let address = chance.address()
                let name = chance.name()
                const [first_name,last_name] = name.split(' ')
                const student_data={
                    first_name,
                    last_name,
                    registration_no:chance.natural(),
                    class_assigned:class_selected,
                    gender:chance.gender(),
                    nationality:'Nigerian',
                    state_of_origin:chance.state(),
                    local_government:'LGA',
                    address,
                }
            
                const guardian_data ={
                    guardian_name:`Mr ${last_name}`,
                    phone_number:chance.phone(),
                    email_address:chance.email(),
                    occupation:chance.company(),
                    guardian_address:address
                }
                const data ={...student_data,...guardian_data}
                if(userid!=''){
                    data['id'] = userid
                }else{
                    data['id'] = getRandomString(10)
                }
                
                await new Students().updateRecord(data,data['id'])

                if(userid!=''){
                    Router.push('/?type=student')
                }
            }
        }
        setLoading(false)
        setModalMessage({mode:'action',message:'Saved Student'})

    }

    
    
    return(
        <>
        {
          showModal?<Flex  {...modalOverlayDesign}>
                {
                    loading?<Spinner/>:<AlertModal1 route={`/?type=admin`} setShowModal={setShowModal} modalMessage={modalMessage}/>
                }
                
            </Flex>:<></>
        }

        <Flex flexDir={['column','row','row']}>
            <Stack flexBasis="50%">
                <Text px="3" textAlign={'center'}>PUPIL PERSONAL DATA</Text>
                <Button display={'none'} onClick={saveDifferentStudents}>Upload Demo Students</Button>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>FIRST NAME</Text>
                    <Input onChange={(e)=>setStudentInputData('first_name',e.currentTarget.value)}  />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>LAST NAME</Text>
                    <Input onChange={(e)=>setStudentInputData('last_name',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>REGISTRATION NO</Text>
                    <Input onChange={(e)=>setStudentInputData('registration_no',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>CLASS ASSIGNMENT</Text>
                    <Select onChange={(e)=>setStudentInputData('class_assigned',e.currentTarget.value)} placeholder="None" >
                        <option value="Primary 1">Primary 1</option>
                        <option value="Primary 2">Primary 2</option>
                        <option value="Primary 3">Primary 3</option>
                        <option value="Primary 4">Primary 4</option>
                        <option value="Primary 5">Primary 5</option>
                        <option value="Primary 6">Primary 6</option>
                    </Select>
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>GENDER</Text>
                    <Select onChange={(e)=>setStudentInputData('gender',e.currentTarget.value)} placeholder="None">
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </Select>
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>NATIONALITY</Text>
                    <Input onChange={(e)=>setStudentInputData('nationality',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>STATE OF ORIGIN</Text>
                    <Input onChange={(e)=>setStudentInputData('state_of_origin',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>LOCAL GOVERNMENT</Text>
                    <Input onChange={(e)=>setStudentInputData('local_government',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>ADDRESS</Text>
                    <Textarea onChange={(e)=>setStudentInputData('address',e.currentTarget.value)} />
                </Box>
            </Stack>

            <Stack flexBasis="50%">
                <Text px="3" textAlign={'center'}>GUARDIAN INFORMATION</Text>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>GUARDIAN NAME</Text>
                    <Input onChange={(e)=>setGuardianInputData('guardian_name',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>PHONE NUMBER</Text>
                    <Input onChange={(e)=>setGuardianInputData('phone_number',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>EMAIL ADDRESS</Text>
                    <Input onChange={(e)=>setGuardianInputData('email_address',e.currentTarget.value)} />
                </Box>
                
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>OCCUPATION</Text>
                    <Input onChange={(e)=>setGuardianInputData('occupation',e.currentTarget.value)} />
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>ADDRESS</Text>
                    <Textarea onChange={(e)=>setGuardianInputData('guardian_address',e.currentTarget.value)}/>
                </Box>
                <Box px="3">
                    <Text mb="1" fontSize={'xs'} fontWeight={'bold'}>PUPIL IMAGE</Text>
                    <Flex justifyContent={'center'}>
                        <ImageUploader/>  
                    </Flex> 
                </Box>
                
              </Stack>
        </Flex>

      
        <Flex mt="3" justifyContent={'center'}>
            <Button onClick={()=>saveStudent()} colorScheme="blue">Save Student</Button>
        </Flex>
        </>
    )
    }
    
export default Studentpage



const ImageUploader = () => {
    // File reader logic will go here
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      };
    return (
    <>
        <VStack>
            {
                imagePreviewUrl ? <Image boxSize={'100px'} objectFit={'cover'} src={imagePreviewUrl} alt="Preview" ></Image>: 
                <Box p="5" borderRadius={'10px'}  bg="black" color={'white'}>
                    <Box fontSize={'50px'} className="pi pi-camera"/>
                </Box>
            }
            <input  type="file" onChange={handleFileInputChange}/>
        </VStack>
    </>
      
    );
  };
  

