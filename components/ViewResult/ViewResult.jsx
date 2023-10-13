import { useEffect, useState } from "react"
import { Box,HStack,VStack,Table,Th,Tr,Td,Thead,Tbody } from "@chakra-ui/react"
import { Results } from "../../Datalayer/Results"
const ViewResult=({userid,selected_class,session,selected_term})=>{
    const [results,setResults] = useState([{
        subject_name:'Chemistry',
        uploaded:true,
        test_score:'4/5',
        class_work:'10/20',
        home_work:'4/4',
        exam:'50/100',
        term:'Second Term',
        session:'2022-2023',
        user_id:'345t46',
        user_id_string:'345t46-2022-2023-Second Term'
    },
    {
        subject_name:'Physics',
        uploaded:false,
        test_score:'6/40',
        class_work:'3/10',
        home_work:'5/6',
        exam:'80/100',
        term:'Second Term',
        session:'2022-2023',
        user_id:'2121332',
        user_id_string:'2121332-2022-2023-Second Term'
    },
    {
        subject_name:'Mathematics',
        uploaded:false,
        test_score:'2/3',
        class_work:'5/6',
        home_work:'40/80',
        exam:'40/100',
        term:'Second Term',
        session:'2022-2023',
        user_id:'34466796',
        user_id_string:'34466796-2022-2023-Second Term'
    },
    {
        subject_name:'English',
        uploaded:false,
        test_score:'2/4',
        class_work:'6/6',
        home_work:'8/10',
        exam:'9/10',
        term:'Second Term',
        session:'2022-2023',
        user_id:'34466796',
        user_id_string:'34466796-2022-2023-Second Term'
    },
    {
        subject_name:'Literature',
        uploaded:false,
        test_score:'5/6',
        class_work:'4/5',
        home_work:'6/7',
        exam:'10/12',
        term:'First Term',
        session:'2022-2023',
        user_id:'34466796',
        user_id_string:'34466796-2022-2023-First Term'
    }
    ])

    const [results_formatted, setResultsFormatted] = useState([])

    const percentages = {
        test_score:20,
        class_work:10,
        home_work:10,
        exam:60,
    }

    useEffect(()=>{
        const setGrades = async ()=>{
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
        </Box>
        </>
    )
    }
    
    export default ViewResult