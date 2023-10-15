import { Box,Flex,HStack,VStack,Input,Text,Checkbox,Stack,Button,Spinner } from "@chakra-ui/react"
import { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import { app } from "../../Datalayer/BASE/base_firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Students } from "../../Datalayer/Students";
import { Teachers } from "../../Datalayer/Teachers";

const LoginAuthentication = ()=>{
    const [isTeacher,setIsTeacher] = useState(false)
    const [user_details,setUser_details] = useState({email:'',password:''})
    const [loading,setLoading] = useState(false)
    const [showLoading,setShowLoading] = useState(false)

    const updateUserDetails=(fieldName,fieldValue)=>{
        const copied = {...user_details}
        copied[fieldName] = fieldValue
        setUser_details(copied)
    }
    
    const loadingState = (isLoading)=>{
        if (isLoading){
            setShowLoading(true)
            setLoading(true)
        }else{
            setShowLoading(false)
            setLoading(false)
        }
    }
    const Login = ()=>{
        

        const auth = getAuth(app)
        const {email,password} = user_details
        const init_data = {email,profile_completed:false}
        loadingState(true)
             signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                //Password
                const id = user.uid
                init_data['id'] = id
                localStorage.setItem('userid',id)
                //localStorage.setItem('type',type)
                if(isTeacher){
                    const teacher = await new Teachers().getOne(id)
                    if(teacher){
                        localStorage.setItem('type','teacher')
                        Router.push('/?type=teacher')
                    }else{
                        alert('No Teacher Exists with those credentials')
                        loadingState(false)
                    }
                }else{
                    const student = await new Students().getOne(id)
                    if(student){
                        localStorage.setItem('type','student')
                        Router.push('/?type=student')
                    }else{
                        alert('No Student Exists with those credentials')
                        loadingState(false)
                    }
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage)
                alert('No User Exists with those credentials')
                loadingState(false)
            });
            
        
    }
    
    return(
        <>
        <Flex justifyContent={'center'} h="100vh" alignItems={'center'}>
            <Stack>
                <Stack alignItems={'center'}>
                    <Text fontSize={'xl'}>Log In</Text>
                    <Box className="pi pi-user" bg="blue.500" color="white" fontSize={'50px'} p="5" borderRadius={'full'}/>
                </Stack>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'x-small'}>EMAIL</Text>
                    <Input onChange={(e)=>updateUserDetails('email',e.currentTarget.value,)} placeholder="someone@gmail.com"/>
                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'x-small'}>PASSWORD</Text>
                    <Input type="password" onChange={(e)=>updateUserDetails('password',e.currentTarget.value,)} placeholder="*******"/>
                </Box>
                <HStack>
                    <Checkbox onChange={(e)=>setIsTeacher(e.currentTarget.checked)}/>
                    <Text>Are you a teacher?</Text>
                </HStack>
                <Flex justifyContent={'center'}>
                    <Button onClick={Login}> Login 
                    {
                        loading? <Spinner ml="2" size={'sm'}/>:<></>
                    }
                    </Button>
                </Flex>
                <Link href={'/choose-user-menu'}>
                    <Text textAlign={'center'} cursor={'pointer'} _hover={{textDecoration:'underline'}}>Create an account?</Text>
                </Link>
            </Stack>
        </Flex>
        </>
    )
}
export default LoginAuthentication