import React from "react"
import { Box, Flex, Stack, HStack, VStack, Text, Image, Button,Divider, Grid,Input,InputGroup,InputLeftElement,InputRightElement} from "@chakra-ui/react"
import Link from "next/link"
import AdminMenu from "./AdminMenu"
import StudentMenu from "../StudentMenu/StudentMenu"
import TeacherMenu from "../TeacherMenu/TeacherMenu"
import Banner from "../Banner/Banner"
const Homepage = ({type}) => {
    return (
    <>
    {
        type=='student'?<StudentMenu/>:<></>
    }
    {
        type=='teacher'?<TeacherMenu/>:<></>
    }
    {
        type=='admin'?<AdminMenu/>:<></>
    }
    {
        type==''?<Banner/>:<></>
    }
    </>
    )
}
export default Homepage
