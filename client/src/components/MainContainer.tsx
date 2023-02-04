import * as React from 'react';
import { Box, Center, Input, Button, HStack, VStack } from '@chakra-ui/react'
import Loader from './Loader';
import axios, { AxiosResponse } from 'axios';
import PartsOfSpeech from './PartsOfSpeech';


export interface Ipos {
    adjectives: number;
    adverbs: number;
    nouns: number;
    totalWords: number;
    verbs: number
}

export interface IMainContainerProps {
}


export default function MainContainer(props: IMainContainerProps) {
    const [data, setData] = React.useState<Ipos | null>(null)
    const [isLoding, setLoading] = React.useState(false)
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            try {
                setLoading(true)
                setData(null)
                const response = await uploadFile(formData)
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    const uploadFile = async (formData: FormData): Promise<AxiosResponse<Ipos>> => {
        return axios.post("http://localhost:5000/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    return (
        <Box p={5}>
            <VStack spacing={10}>
                <Center>
                    <Box w='500px'>
                        <HStack>
                            <Input accept='.txt' onChange={(e) => handleChange(e)} type={'file'} placeholder='Basic usage' />
                        </HStack>
                    </Box>
                </Center>
                {isLoding && <Loader isLoding={isLoding} />}
                {data && <PartsOfSpeech data={data} />}
            </VStack>
        </Box>
    );
}
