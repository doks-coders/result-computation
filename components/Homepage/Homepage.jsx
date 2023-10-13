import React from "react"
import { Box, Flex, Stack, HStack, VStack, Text, Image, Button,Divider, Grid,Input,InputGroup,InputLeftElement,InputRightElement} from "@chakra-ui/react"
import Link from "next/link"

const Homepage = () => {
    return (
     <>
         <Stack  justifyContent={'center'}>
            <VStack>
                <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xx-large'}>Registraton and Grading</Text>
                <Text textAlign={'center'} fontSize={'x-large'}>All in one System</Text>
                <Text textAlign={'center'} fontSize={'sm'} maxW={'500px'}>
                        Get all the detailed results from all the students, get insights and understand how well your students is doing. 
                </Text>
            </VStack>
            <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} gap="2" >
              
                <SectionsClicked
                    title={'Create Student'}
                    text = {'Create a Student Profile to upload results to'}
                    btnText = {'Create'}
                    link={'student'}
                    icon={'pi pi-user'}
                />
                <SectionsClicked
                    title={'Register Subjects'}
                    text = {'Register Subjects For Students'}
                    btnText = {'Register'}
                    link={'student-list?mode=register_subject'}
                    icon={'pi pi-book'}
                />
                <SectionsClicked
                    title={'Upload Result'}
                    text = {'Upload Result to Student Profile'}
                    btnText = {'Upload'}
                    link={'student-list?mode=upload_result'}
                    icon={'pi pi-file'}
                />
                <SectionsClicked
                    title={'View Grade'}
                    text = {'View the Grading of Students'}
                    btnText = {'View'}
                    link={'view-grade'}
                    icon={'pi pi-chart-bar'}
                />
            </Grid>

         </Stack>

        </>
    )
}
export default Homepage


const SectionsClicked=({title,text,btnText,link,icon})=>{
    return(
        <>
        <HStack m="3" justifyContent={'space-between'} borderWidth={'1px'} borderColor={'gray.300'} w="100%" spacing={'20px'} shadow={'3'} p="3" borderRadius={'10px'}>
                    <Stack>
                        <Stack color="black">
                            <Text fontSize={'2xl'} fontWeight={'semibold'}>{title}</Text>
                            <Divider></Divider>
                            <Text fontSize={'md'}>{text}</Text>
                        </Stack>
                        <Box>
                            <Link href={link}>
                                <Button colorScheme="blue">{btnText}</Button>
                            </Link>
                        </Box>
                    </Stack>
                    <Flex justifyContent={'center' } alignItems={'center'} borderRadius={'10px'} bg="blue.50" boxSize={'100px'}>
                        <Box className={icon} fontSize={'50px'}></Box>
                    </Flex>
                </HStack>
        </>
    )
}