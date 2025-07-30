'use client'

import { CounterComponent } from "@/features/counter/ui/component";
import { Box, Heading, VStack } from "@chakra-ui/react";

export default function TestPage() {
    return (
        <Box p={8}>
            <VStack spacing={6} align="center">
                <Heading size="lg">Test Page</Heading>
                <CounterComponent />
            </VStack>
        </Box>
    );
}