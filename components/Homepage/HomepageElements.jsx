import { HStack,Stack,Text,Divider,Flex,Box,VStack,Button } from "@chakra-ui/react"
import Link from "next/link"
export const SectionsClicked=({title,text,btnText,link,icon})=>{
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