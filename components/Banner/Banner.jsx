import { HStack,Stack,Text,VStack,Button } from "@chakra-ui/react"
import Link from "next/link"
const Banner = ()=>{
    return(
        <>
            <VStack p="4" spacing={5}>
                <Text textAlign={'center'} maxW={'500px'} fontWeight={'bold'} fontSize={'xx-large'}>Computerized Result Preparation System For Primary Schools</Text>
                <Text textAlign={'center'} fontSize={'sm'}>By</Text>
                <Text textAlign={'center'} fontSize={'lg'} fontWeight={'bold'} maxW={'500px'}>
                        Menebe Grace Ewonubari
                        CEAP/N-COM/2021/2602
                </Text>
                <Text maxW={'500px'} textAlign={'center'}>
                    IN PARTIAL FULFILLMENT OF THE REQUIREMENTS FOR THE AWARD OF NATIONAL DIPLOMA (ND) IN COMPUTER SCIENCE.
                </Text>

                <Text textAlign={'center'}>              
                    OCTOBER, 2023
                </Text>
                <Link href={'/login'}>
                    <Button colorScheme="blue" >
                        Let's Begin
                    </Button>
                </Link>
                
        </VStack>
        </>
    )
}
export default Banner

