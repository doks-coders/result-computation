import {Select, Flex,HStack,VStack,Stack,Input,Button,Box,Text,Table,Thead,Tr,Th,Td,Tbody } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ViewResult from "./ViewResult"
import { Students } from "../../Datalayer/Students"
const StudentViewResult=()=>{
 
    const [session,setSession] = useState('')
    const [selected_class,setClass] = useState('')
    const [selected_term,setSelectedTerm] = useState('')
    const [showStudentResult,setShowStudentResult]= useState(false)

    const [userid,setUserId] = useState('')
    useEffect(()=>{
        const getUserInfo=async()=>{
        const id = localStorage.getItem('userid')
        setUserId(id)
        const student = await new Students().getOne(id)

        try {
            setClass(student['class_assigned'])
        } catch (error) {
            alert('Are you sure you are in the correct platform?')
        }
    
        }
        getUserInfo()
        
    },[])

    const validateInformation = ()=>{
        let proceed = true
        if(session==''){
            proceed=false
            alert('Inpu Your Session')
        }
        if(selected_term==''){
            proceed=false
            alert('Input Your Session')
        }
        if(proceed){
            setShowStudentResult(true)
        }
        
    }
    
    return(
        <>
        <HStack p="4">   
                <Select onChange={(e)=>setSession(e.currentTarget.value)} flexBasis={'50%'} placeholder="Session">
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                </Select>
               

                <Select onChange={(e)=>setSelectedTerm(e.currentTarget.value)} flexBasis={'50%'} placeholder="Choose Term">
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                </Select>
        </HStack>
        {
            selected_class ?<HStack mt="5" justifyContent={'center'}>
                <Box>
                    <Button onClick={()=>validateInformation()}>Get Grading</Button>
                </Box>
            </HStack>:<></>
        }
        {
            showStudentResult?<ViewResult selected_class={selected_class} session={session} userid={userid} selected_term={selected_term}/>
        :<></>
        }

        </>
    )
    }
    
    export default StudentViewResult