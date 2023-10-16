import React, { useEffect, useState } from "react";
import { Box,Stack,Table,Th, Tbody,Tr,Td,Thead, Input,HStack,Button,Flex,Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { Students } from "../../Datalayer/Students";
const StudentList = ({mode})=>{
    const mode_routes ={
        'register_subject':'/register-subject',
        'upload_result':'/upload-result'
    }

    useEffect(()=>{
        const retrieveAllStudents = async()=>{
            setLoading(true)
            let allStudents = await new Students().getAll()
            allStudents = allStudents.filter(val=>val.registration_no)
            setItems(allStudents)
            setIncomingItems(allStudents)
            setLoading(false)
        }
        retrieveAllStudents()
        
    },[])
    let [incomingItems,setIncomingItems] = useState([])
    let [items,setItems] = useState([])
    let [loading,setLoading] = useState(false)
    let [searchText,setSearch] = useState('')
    useEffect(()=>{
        setItems(incomingItems)
    },[])

    
    const searchItemsDefault = (text)=>{
        if(text ==''){
            //Resets the list when there is no input
            setItems(incomingItems)
        }else{
            //Updates the search text when there is an input
            setSearch(text)
        }
    }

    const searchItems = ()=>{
        if(searchText !=''){
            //Search Items, Using o(n), not efficient but we are testing
            let searched_items = items.filter(val=>JSON.stringify(val).toLowerCase().indexOf(searchText.toLowerCase())>-1)
            setItems(searched_items)
        }
    }
  

    return(
        <>
        <Flex p="2" justifyContent={'left'}>
            <HStack>
            <Input onChange={(e)=>searchItemsDefault(e.currentTarget.value)} placeholder="Search Student"/>
            <Button onClick={()=>searchItems()} ml="2" className="pi pi-search"></Button>
        </HStack>
        
        </Flex>
        
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Class</Th>
                    <Th>Registration No</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                   (!loading)? <>
                     {
                    items.map(val=>(
                    <Link href={mode_routes[mode]+`?userid=${val.id}`}>
                        <Tr _hover={{backgroundColor:'gray.100',transition:'.2s ease'}} cursor={'pointer'} p="2">
                            <Td>
                            {val.last_name} {val.first_name}
                            </Td>
                            <Td>
                                {val.class_assigned}
                            </Td>
                            <Td>
                                {val.registration_no.toString().substring(0, 6)+'...'}
                            </Td>
                        </Tr>
                    </Link>
                    
                    ))
                }  
                    </>:
                    <Flex w="100vw" justifyContent={'center'}>
                        <Spinner/>
                    </Flex>
                }
                <>
                </>
                   
            </Tbody>
        </Table>
        </>
    )
}
export default StudentList