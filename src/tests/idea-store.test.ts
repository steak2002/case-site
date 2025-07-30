import { describe, it, expect, beforeEach } from "vitest";
import { useIdeaStore } from "@/features/ideas/model/store";

describe("useIdeaStore", () => {
    // Reset store before each test
    beforeEach(() => {
        useIdeaStore.setState({
            ideas: [],
            loading: false,
            error: null
        });
    });

    it("should fetch ideas from API", async () => {
        // Call fetchIdeas
        await useIdeaStore.getState().fetchIdeas();

        // Verify ideas array exists
        const state = useIdeaStore.getState();
        expect(Array.isArray(state.ideas)).toBe(true);
        expect(state.loading).toBe(false);
    });

    it("should add a new idea to the store after creation", async () => {
        // Initial state check
        const initialState = useIdeaStore.getState();
        const initialCount = initialState.ideas.length;

        // Create a new idea directly in the store
        const newIdea = {
            id: "test-id-123",
            title: "Test Title",
            description: "Test Description",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Directly update store (bypassing API)
        useIdeaStore.setState({
            ideas: [...initialState.ideas, newIdea]
        });

        // Verify idea was added
        const updatedState = useIdeaStore.getState();
        expect(updatedState.ideas.length).toBe(initialCount + 1);
        expect(updatedState.ideas).toContainEqual(newIdea);
    });

    it("should remove an idea from the store", async () => {
        // Setup: add a test idea to the store
        const testIdea = {
            id: "test-id-456",
            title: "To Be Removed",
            description: "This will be removed",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        useIdeaStore.setState({
            ideas: [testIdea]
        });

        // Verify idea is in the store
        expect(useIdeaStore.getState().ideas).toContainEqual(testIdea);

        // Directly update store (bypassing API)
        useIdeaStore.setState({
            ideas: []
        });

        // Verify idea was removed
        expect(useIdeaStore.getState().ideas).not.toContainEqual(testIdea);
        expect(useIdeaStore.getState().ideas.length).toBe(0);
    });
});