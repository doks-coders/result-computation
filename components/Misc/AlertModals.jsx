import { Flex,Box,Text,Button } from "@chakra-ui/react"
import Link from "next/link"

export const AlertModal1 = ({setShowModal,modalMessage,route,routeText})=>{
    return (
    <Flex borderRadius={'10px'} justifyContent={'center'} flexDir={'column'} alignItems={'center'} bg="green.500" color="white" boxSize={'300px'}>
        <Box p="10px" fontSize={'100px'} className="pi pi-check-circle"></Box>
        <Text fontWeight={'bold'}>{modalMessage.message}</Text>
        <Button onClick={()=>setShowModal(false)} size={'sm'} mt="15px" colorScheme="yellow">Cancel</Button>
        <Link href={route?route:'/?type=admin'}>
            <Button size={'sm'} mt="10px" colorScheme="brown">{routeText?routeText:'Go to Home'}</Button>
        </Link>
    </Flex>
    )
}