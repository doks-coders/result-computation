import React,{useState} from "react"
import { Box,Flex,HStack,VStack,Stack,Text,Button } from "@chakra-ui/react"
import { iconDivStyle } from "../../constants"
import Link from "next/link"
import Router from "next/router"
const ChooseUserMenu = ()=>{
    return(
        <>
        <Stack p="4" h="100vh" justifyContent={'center'}>
            <VStack spacing={5}>
                <HStack borderWidth={'2px'} borderRadius={'10px'} p="4" spacing={5}>
                    <Box className="pi pi-user" {...iconDivStyle}/>
                    <Stack>
                        <Text fontSize={'2xl'}>Create Parent Account</Text>
                        <Text>Register as a parent</Text>
                        <Link href={'/sign-up?type=student'}>
                            <Button>Create Account</Button>
                        </Link>
                    </Stack>
                </HStack>
                <HStack borderWidth={'2px'} borderRadius={'10px'} p="4" spacing={5}>
                    <Box className="pi pi-user" {...iconDivStyle}/>
                    <Stack>
                        <Text fontSize={'2xl'}>Create Teacher Account</Text>
                        <Text>Register as a teacher</Text>
                        <Link href={"/sign-up?type=teacher"}>
                            <Button>Create Account</Button>
                        </Link>
                    </Stack>
                </HStack>
            </VStack>
        </Stack>
        </>
    )
}
export default ChooseUserMenu