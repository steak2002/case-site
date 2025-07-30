import { describe, expect, it } from "vitest";
import { IdeaService } from "@/domain/idea/service";


describe("IdeaService", () => {

    describe("getIdeas", () => {
        it("should return an array of ideas", async () => {
            const service = IdeaService.getInstance();
            const ideas = await service.getIdeas();
            expect(Array.isArray(ideas)).toBe(true);
            if (ideas.length === 0) {
                return
            }
            expect(ideas[0]).toHaveProperty("id");
            expect(ideas[0]).toHaveProperty("title");
            expect(ideas[0]).toHaveProperty("description");
            expect(ideas[0]).toHaveProperty("created_at");
        });
    });

    describe("createIdea", () => {
        it("should create a new idea in database", async () => {
            const service = IdeaService.getInstance();

            // Get intial count of ideas
            const initialIdeas = await service.getIdeas();
            const initialCount = initialIdeas.length;

            const newIdea = { title: "Test Idea", description: "Idea description" };
            const createdIdea = await service.createIdea(newIdea);
            expect(createdIdea).toHaveProperty("id");
            expect(createdIdea).toHaveProperty("title", newIdea.title);
            expect(createdIdea).toHaveProperty("description", newIdea.description);
            expect(createdIdea).toHaveProperty("created_at");
            expect(createdIdea.title).toBe(newIdea.title);
            expect(createdIdea.description).toBe(newIdea.description);

            // Clean up: remove the created idea
            await service.removeIdea(createdIdea.id);

            // Verify the idea was removed
            const updatedIdeas = await service.getIdeas();
            expect(updatedIdeas.length).toBe(initialCount);

        });
    });

    describe("removeIdea", () => {
        it("should remove an idea from the database", async () => {
            const service = IdeaService.getInstance();

            // Create a new idea to remove
            const newIdea = { title: "Temporary Idea", description: "Temporary description" };
            const createdIdea = await service.createIdea(newIdea);

            // Remove the created idea
            await service.removeIdea(createdIdea.id);

            // Verify the idea was removed
            const ideas = await service.getIdeas();
            expect(ideas.find(idea => idea.id === createdIdea.id)).toBeUndefined();
        });
    });

});



