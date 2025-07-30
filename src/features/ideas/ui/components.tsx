'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Flex,
    Heading,
    Text,
    Spacer,
    Center,
    Spinner

} from '@chakra-ui/react';
import { useIdeaStore } from '../model/store';
import { IdeaEntity } from '@/shared/contracts/idea/types';

export const IdeaForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { createIdea, loading } = useIdeaStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title.trim() && description.trim()) {
            await createIdea({
                title,
                description
            });

            // Reset form
            setTitle('');
            setDescription('');
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Idea title"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your idea"
                    />
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={loading}
                    isDisabled={!title.trim() || !description.trim()}
                    width="full"
                >
                    Submit Idea
                </Button>
            </VStack>
        </Box>
    );
};


type IdeaCardProps = {
    idea: IdeaEntity;
};

export const IdeaCard = ({ idea }: IdeaCardProps) => {
    const { removeIdea } = useIdeaStore();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this idea?')) {
            await removeIdea(idea.id);
        }
    };

    return (
        <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
            <Flex align="center">
                <Heading size="md">{idea.title}</Heading>
                <Spacer />
                <Button size="sm" colorScheme="red" onClick={handleDelete}>
                    Delete
                </Button>
            </Flex>

            <Text color="gray.500" fontSize="sm" mt={1}>
                {new Date(idea.created_at).toLocaleDateString()}
            </Text>

            <Text mt={4}>
                {idea.description}
            </Text>
        </Box>
    );
};


export const IdeaList = () => {
    const { ideas, loading, error, fetchIdeas } = useIdeaStore();

    useEffect(() => {
        fetchIdeas();
    }, [fetchIdeas]);

    if (loading && ideas.length === 0) {
        return (
            <Center p={8}>
                <Spinner />
            </Center>
        );
    }

    if (error) {
        return (
            <Box p={4} bg="red.50" color="red.800" borderRadius="md">
                <Text>Error: {error}</Text>
            </Box>
        );
    }

    if (ideas.length === 0) {
        return (
            <Box p={4} textAlign="center">
                <Text>No ideas yet. Be the first to add one!</Text>
            </Box>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
        </VStack>
    );
};