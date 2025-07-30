import { CounterComponent } from "@/features/counter/ui/component";
import { IdeaForm, IdeaList } from "@/features/ideas/ui/components";
import { Box, Heading, Container, Divider } from "@chakra-ui/react";

export default function IdeasPage() {
    return (
        <Container maxW="container.md" py={8}>
            <Box mb={8}>
                <Heading as="h1" mb={4}>Idea Bank</Heading>
                <IdeaForm />
            </Box>

            <Divider my={8} />

            <Box>
                <Heading as="h2" mb={4} size="lg">Ideas</Heading>
                <IdeaList />
            </Box>
        </Container>
    );
}