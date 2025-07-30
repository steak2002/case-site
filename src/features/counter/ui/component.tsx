import { Button, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useCounterStore } from "../model/store";
import { useEffect } from "react";

export function CounterComponent() {
    const { counter, loading, error, initialize, increment } = useCounterStore();

    // Initialize when component mounts
    useEffect(() => {
        initialize();
    }, [initialize]);

    if (loading && !counter) {
        return (
            <VStack>
                <Spinner size="xl" />
                <Text>Loading counter...</Text>
            </VStack>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    return (
        <VStack>
            <Text fontSize="2xl">Count: {counter?.count || 0}</Text>
            <Button
                colorScheme="blue"
                onClick={increment}
                isLoading={loading}
            >
                Increment
            </Button>

            {counter && (
                <Text fontSize="xs" color="gray.500">
                    Last updated: {new Date(counter.updated_at).toLocaleString()}
                </Text>
            )}
        </VStack>
    );
}