'use client'

import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    Stack,
    Button,
    Text,
} from '@chakra-ui/react';
import {
    MdClose,
    MdMenu
} from 'react-icons/md';
import { ColorModeToggle } from './ColorModeToggle';
import Link from 'next/link';

const Links = [
    { name: 'Home', path: '/' },
    { name: 'Counter', path: '/counter-page' },
    { name: 'Dashboard', path: '/dashboard' },
];

export function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box w="full" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    alignItems={'center'}
                    justifyContent={'center'}
                    variant={'solid'}
                    size={'md'}
                    display={{ base: 'flex', md: 'none' }} // Add this line
                    icon={isOpen ? <MdClose /> : <MdMenu />}
                    aria-label={'Open Menu'}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box fontWeight="bold">Case Site</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <Link href={link.path} key={link.name} style={{ textDecoration: 'none' }}>
                                <Text
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                >
                                    {link.name}
                                </Text>
                            </Link>
                        ))}
                    </HStack>
                </HStack>
                <ColorModeToggle />
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ base: 'flex', md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <Link href={link.path} key={link.name} style={{ textDecoration: 'none' }}>
                                <Text
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        bg: 'gray.200',
                                    }}
                                >
                                    {link.name}
                                </Text>
                            </Link>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
}