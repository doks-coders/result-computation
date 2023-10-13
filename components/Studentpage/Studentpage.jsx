import React, { useState } from "react"
import { Box, Flex, Stack, HStack, VStack, Text, Image, Button, Grid,Input, Select,InputGroup,InputLeftElement,InputRightElement, Textarea} from "@chakra-ui/react"
import { Students } from "../../Datalayer/Students"
import { getRandomString } from "../../constants"
const Studentpage=()=>{
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
        const data = {...guardian_data,...student_data}
        data['id'] = getRandomString(10)
        await new Students().saveOne(data)
        alert('User Created')
    }

    
    return(
        <>

        <Flex flexDir={['column','row','row']}>
            <Stack flexBasis="50%">
                <Text px="3" textAlign={'center'}>PUPIL PERSONAL DATA</Text>
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
                        <option value="JSS1">JSS1</option>
                        <option value="JSS2">JSS2</option>
                        <option value="JSS3">JSS3</option>
                        <option value="SSS1">SSS1</option>
                        <option value="SSS2">SSS2</option>
                        <option value="SSS3">SSS3</option>
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
  