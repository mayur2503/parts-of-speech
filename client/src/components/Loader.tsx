import * as React from 'react';
import { Box, Text, HStack, VStack } from '@chakra-ui/react'
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

    return (
        <HStack>
            <VStack>
                <Box className='loading'>Loading ...</Box>
                <Text> {counter > 10 ? `hush... it's taking long time please wait 😓😓😓` : null}</Text>
                {counter>60 ?<Text>looks like you have attached very large file. I'm working on it....</Text>:null}
                {counter>120 ?<Text>🥱🥱🥱 chill for sometime 🍺🍺🍺 </Text>:null}
            </VStack>
        </HStack>
    );
}
