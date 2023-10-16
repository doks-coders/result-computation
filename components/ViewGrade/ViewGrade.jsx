import {Select, Flex,HStack,VStack,Stack,Input,Button,Box,Text,Table,Thead,Tr,Th,Td,Tbody, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Students } from "../../Datalayer/Students"
const ViewGrade=()=>{
 
    const [session,setSession] = useState('')
    const [selected_class,setClass] = useState('')
    const [selected_term,setSelectedTerm] = useState('')
    const [loading,setLoading] = useState(false)
    const [rankedStudents,setRankedStudents] = useState([
       
    ])


    

    const setRankedStudentsOperation = async()=>{
        setLoading(true)
        let students_in_class = await new Students().findRecord({field:'class_assigned',
                                                                value:selected_class,
                                                                comparator:'==', 
                                                                query_type:'SimpleQuery'})
       //Checks if measured_scores are a key in the students                                                        
       students_in_class = students_in_class.filter(val=>val['measured_scores'])
       if(students_in_class.length){
        students_in_class = students_in_class.map(val=>{
            if(val['measured_scores']){
                let measured_scores = val['measured_scores']
                if(measured_scores[session+'-'+selected_term]){
                    val['last_measured_score'] = measured_scores[session+'-'+selected_term].score
                    return({...val})
                }else{
                    return undefined
                }                
            }
            return undefined
           })
           //Clean null values
           students_in_class = students_in_class.filter(val=>val!=undefined)
           if(students_in_class.length){

            students_in_class
            setRankedStudents(students_in_class)
            setLoading(false)
           }else{
            alert('No Student Matches this Criteria')
            setLoading(false)
           }
           
       }else{
        alert('No Student Matches this Criteria')
       }

       
       
    }
    
    
    return(
        <>
        <HStack>   
                <Select onChange={(e)=>setSession(e.currentTarget.value)} flexBasis={'50%'} placeholder="Session">
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                </Select>
                <Select onChange={(e)=>setClass(e.currentTarget.value)} flexBasis={'50%'} placeholder="Class">
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                </Select>

                <Select onChange={(e)=>setSelectedTerm(e.currentTarget.value)} flexBasis={'50%'} placeholder="Choose Term">
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                </Select>
        </HStack>

        <HStack mt="5" justifyContent={'center'}>
            <Box>
                <Button onClick={()=>setRankedStudentsOperation()}>Get Grading</Button>
            </Box>
        </HStack>

        <Table>
            <Thead>
                <Tr>
                    <Th>Ranking</Th>
                    <Th>Name</Th>
                    <Th>Class</Th>
                    <Th>Measured Score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                   (!loading)?<>
                    {
                    rankedStudents.map((val,index)=>(
                        <Link href={`view-result?userid=${val.id}&session=${session}&selected_class=${selected_class}&selected_term=${selected_term}`}>
                            <Tr cursor={'pointer'} _hover={{bg:'gray.100',transition:'.2s ease'}}>
                                <Th>{index+1}</Th>
                                <Td>{val.last_name} {val.first_name}</Td>
                                <Td>{val.class_assigned}</Td>
                                <Td>{val.last_measured_score}</Td>
                            </Tr>
                        </Link>
                    ))
                }
                </>:<Flex justifyContent={'center'} w="100vw"><Spinner/></Flex>
                
                }
                
                
            </Tbody>
        </Table>
        </>
    )
    }
    
    export default ViewGrade


    export const getAllStudentsRanked = async({selected_class,session,selected_term})=>{
        let students_in_class = await new Students().findRecord({field:'class_assigned',
                                                                value:selected_class,
                                                                comparator:'==', 
                                                                query_type:'SimpleQuery'})
       //Checks if measured_scores are a key in the students                                                        
       students_in_class = students_in_class.filter(val=>val['measured_scores'])
       if(students_in_class.length){
        students_in_class = students_in_class.map(val=>{
            if(val['measured_scores']){
                let measured_scores = val['measured_scores']
                if(measured_scores[session+'-'+selected_term]){
                    val['last_measured_score'] = measured_scores[session+'-'+selected_term].score
                    return({...val})
                }else{
                    return undefined
                }                
            }
            return undefined
           })
           //Clean null values
           students_in_class = students_in_class.filter(val=>val!=undefined)
           if(students_in_class.length){

            students_in_class.sort((a, b) => {
                const numA = parseInt(a.last_measured_score);
                const numB = parseInt(b.last_measured_score);
                return numB-numA;
              });
              return students_in_class
        }
        return []
       }
       return []
    }