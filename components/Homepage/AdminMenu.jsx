import React, { useEffect } from "react"
import { Box, Flex, Stack, HStack, VStack, Text, Image, Button,Divider, Grid,Input,InputGroup,InputLeftElement,InputRightElement} from "@chakra-ui/react"
import Link from "next/link"
import { SectionsClicked } from "./HomepageElements"
const AdminMenu = () => {
    useEffect(()=>{
        localStorage.setItem('type','admin')
    },[])
    return (
     <>
         <Stack  justifyContent={'center'}>
            <VStack> 
                <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xx-large'}>Computerized Result Preparation System For Primary Schools</Text>
                <Text textAlign={'center'} fontSize={'x-large'}>By</Text>
                <Text textAlign={'center'} fontSize={'sm'} maxW={'500px'}>
                        Menebe Grace Ewonubari
                        CEAP/N-COM/2021/2602
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
export default AdminMenu

