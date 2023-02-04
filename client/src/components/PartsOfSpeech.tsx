import * as React from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import { Ipos } from './MainContainer';
export interface IPartsOfSpeechProps {
    data: Ipos | null
}


export default function PartsOfSpeech({ data }: IPartsOfSpeechProps) {
    const calculatePercentage = (count: number) => {
        if (data?.totalWords != null)
            return ((count / data?.totalWords) * 100).toFixed(2)
    }
    return (
        <HStack spacing={10}>
            <Box borderColor={'gray.400'} borderWidth={1} borderRadius={'md'} p={8} background={'gray.100'}>
                <VStack>
                    <Text fontSize={'2xl'}>{calculatePercentage(data?.adjectives as number)} %</Text>
                    <Text fontWeight={'semibold'} >Adjectives</Text>
                </VStack>
            </Box>
            <Box borderColor={'gray.400'} borderWidth={1} borderRadius={'md'} p={8} background={'gray.100'}>
                <VStack>
                    <Text fontSize={'2xl'}>{calculatePercentage(data?.adverbs as number)} %</Text>
                    <Text fontWeight={'semibold'} >Adverbs</Text>
                </VStack>
            </Box>
            <Box borderColor={'gray.400'} borderWidth={1} borderRadius={'md'} p={8} background={'gray.100'}>
                <VStack>
                    <Text fontSize={'2xl'}>{calculatePercentage(data?.nouns as number)} %</Text>
                    <Text fontWeight={'semibold'} >Nouns</Text>
                </VStack>
            </Box>
            <Box borderColor={'gray.400'} borderWidth={1} borderRadius={'md'} p={8} background={'gray.100'}>
                <VStack>
                    <Text fontSize={'2xl'}>{calculatePercentage(data?.verbs as number)} %</Text>
                    <Text fontWeight={'semibold'} >Verbs</Text>
                </VStack>
            </Box>
        </HStack>
    );
}
