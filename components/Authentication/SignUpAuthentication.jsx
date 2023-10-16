import { Box,Flex,HStack,VStack,Input,Text,Checkbox,Stack,Button,Spinner } from "@chakra-ui/react"
import { useState } from "react"
import Router from "next/router"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Datalayer/BASE/base_firebase";
import { Students } from "../../Datalayer/Students";
import { Teachers } from "../../Datalayer/Teachers";
const SignUpAuthentication = ({type})=>{
    const [user_details,setUser_details] = useState({email:'',password:'',password_retype:''})
    const [loading,setLoading] = useState(false)
    const [showLoading,setShowLoading] = useState(false)
    const updateUserDetails=(fieldName,fieldValue)=>{
        const copied = {...user_details}
        copied[fieldName] = fieldValue
        setUser_details(copied)
    }
    
    const signUpUser = async()=>{
        const {email,password_retype,password} = user_details
        const auth = getAuth(app)

        const init_data = {email,profile_completed:false,password}
        if(password_retype==password){
            setShowLoading(true)
            setLoading(true)
             createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                //Password
                const id = user.uid
                init_data['id'] = id
                localStorage.setItem('userid',id)
                localStorage.setItem('type',type)
                if(type=='student'){
                    await new Students().saveOne(init_data)
                    Router.push(`/student?userid=${id}`)
                }
                if(type=='teacher'){
                    await new Teachers().saveOne(init_data)
                    Router.push(`/teacher?userid=${id}`)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('There is a problem with your sign up')
                setLoading(false)

            });
            
        }else{
            alert('Passwords Do not Match')
            setLoading(false)
        }
    }
    
    return(
        <>
        <Flex  justifyContent={'center'} h="100vh" alignItems={'center'}>
            <Stack>
                <Stack alignItems={'center'}>
                    <Text fontWeight={'bold'}>{type.toUpperCase()}</Text>
                    <Text fontSize={'xl'}> Sign Up</Text>
                    <Box className="pi pi-user" bg="blue.500" color="white" fontSize={'50px'} p="5" borderRadius={'full'}/>
                </Stack>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'x-small'}>EMAIL</Text>
                    <Input onChange={(e)=>updateUserDetails('email',e.currentTarget.value,)} placeholder="someone@gmail.com"/>
                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'x-small'}>PASSWORD</Text>
                    <Input type="password" onChange={(e)=>updateUserDetails('password',e.currentTarget.value)} placeholder="*******"/>
                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'x-small'}>Re-type PASSWORD</Text>
                    <Input type="password" onChange={(e)=>updateUserDetails('password_retype',e.currentTarget.value)} placeholder="*******"/>
                </Box>
            
                <Flex justifyContent={'center'}>
                    <Button colorScheme="blue" onClick={signUpUser}> Sign Up

                    {
                        loading? <Spinner ml="2" size={'sm'}/>:<></>
                    }
                     </Button>
                </Flex>
            </Stack>
        </Flex>
        </>
    )
}
export default SignUpAuthentication