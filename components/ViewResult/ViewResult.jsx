import { useEffect, useState } from "react"
import { Box,HStack,VStack,Table,Th,Tr,Td,Thead,Tbody } from "@chakra-ui/react"
import { Results } from "../../Datalayer/Results"
import { Students } from "../../Datalayer/Students"
const ViewResult=({userid,selected_class,session,selected_term})=>{

    const [results_formatted, setResultsFormatted] = useState([])
    const [student_details,setStudentDetails] = useState({
        first_name:'',
        last_name:'',
        class_assigned:''
    })
    const percentages = {
        test_score:20,
        class_work:10,
        home_work:10,
        exam:60,
    }

    useEffect(()=>{
        const setGrades = async ()=>{
        const student = await new Students().getOne(userid)
        const {first_name,last_name,class_assigned} = student
        setStudentDetails({first_name,last_name,class_assigned})

        const results = await new Results().findRecord({field:'user_id_string',
        value:`${userid}-${session}-${selected_term}`,
        comparator:'==', 
        query_type:'SimpleQuery'})

        let copied = [...results]
        copied = copied.map((val)=>{
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
            let total = Number(class_work)+Number(test_score)+Number(home_work)+Number(exam)
            let grade = getGrade(total)
            val = {...val,...{class_work,test_score,home_work,exam,total,grade}} 
            
            return val
        })
        setResultsFormatted(copied)
        }
        setGrades()
    },[])
    const is_within = (min,max,val)=>{
       return val>min-1 && val<max+1
    }
    const getGrade=(total)=>{
        if(is_within(80,100,total)){
            return 'A'
        }
        if(is_within(70,79,total)){
            return 'B'
        }
        if(is_within(60,69,total)){
            return 'C'
        }
        if(is_within(50,59,total)){
            return 'D'
        }
        if(is_within(40,49,total)){
            return 'D'
        }
        if(is_within(0,39,total)){
            return 'E'
        }
    }
    const getPercentageEquivalent = (string,percentage_constant)=>{
        const [numerator,denominator]= string.split('/');
        const percentage=(numerator/denominator)* 100
        return Math.floor((percentage/100) * percentage_constant)
     }

    return(
        <>
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            Subject
                        </Th>
                        <Th>
                            Classwork (10%)
                        </Th>
                        <Th>
                            Homework (10%)
                        </Th>
                        <Th>
                            Test (20%)
                        </Th>
                        <Th>
                            Exam (60%)
                        </Th>
                        <Th>
                            Total
                        </Th>
                        <Th>
                            Grade
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        results_formatted.map(val=>(
                            <Tr>
                                <Td>
                                    {val.subject_name}
                                </Td>
                                <Td>
                                    {val.class_work}
                                </Td>
                                <Td>
                                    {val.home_work}
                                </Td>
                                <Td>
                                    {val.test_score}
                                </Td>
                                <Td>
                                    {val.exam}
                                </Td>
                                <Td>
                                    {val.total}
                                </Td>
                                <Td>
                                    {val.grade}
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>

            <Table mt={'50px'} maxW="500px" variant={'striped'} borderWidth={'0.5px'}>
                    <Tr>
                        <Td>
                            Name:
                        </Td>
                        <Td>
                            {student_details.first_name} {student_details.last_name}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            Class:
                        </Td>
                        <Td>
                            {student_details.class_assigned} 
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            Session:
                        </Td>
                        <Td>
                            {session} 
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            Term:
                        </Td>
                        <Td>
                            {selected_term} 
                        </Td>
                    </Tr>
            </Table>
        </Box>
        </>
    )
    }
    
    export default ViewResult