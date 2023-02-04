import * as React from 'react';
import { Box, Center, Input, Text, HStack, VStack } from '@chakra-ui/react'
export interface ILoaderProps {
    isLoding: boolean
}

export default function Loader(props: ILoaderProps) {
    const [counter, setCounter] = React.useState(0)
    const counterRef = React.useRef<any>(null)
    React.useEffect(() => {
        counterRef.current = setInterval(() => {
            setCounter((prevValue) => prevValue + 1)
        }, 1000)

        return () => {
            if (counterRef.current) {
                clearInterval(counterRef.current)
            }
        }
    }, [])

    React.useEffect(() => {
        console.log('counter', counter)
    }, [counter])

    return (
        <HStack>
            <VStack>
                <Box className='loading'>Loading ...</Box>
                <Text> {counter > 10 ? `hush... it's taking long time please wait 😓😓😓` : null}</Text>
            </VStack>
        </HStack>
    );
}
