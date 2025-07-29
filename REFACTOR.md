# Step-by-Step: Refactoring to Modular File Structure

This guide will help you revise your Next.js project structure to match the modular architecture described in your README.  
**After each step, run your app and tests to ensure everything works before proceeding.**

---

## Task List

- [ ] 1. Preparation
- [ ] Create a GitHub repository for your project
- [ ] Ensure your app runs (`yarn dev`)
- [ ] Ensure your tests pass (`yarn test`)
- [ ] Commit your current state

- [ ] 2. Create the `features` Directory
- [ ] Create `src/features/feature1/model/`
- [ ] Create `src/features/feature1/ui/`
- [ ] Move Zustand stores, services, types, and tests to `model/`
- [ ] Move feature-specific components/pages to `ui/`
- [ ] Update imports in your code to use the new paths
- [ ] Test your app and run tests

- [ ] 3. Create the `shared` Directory
- [ ] Create `src/shared/components/`
- [ ] Create `src/shared/hooks/`
- [ ] Create `src/shared/utils/`
- [ ] Create `src/shared/styles/`
- [ ] Create `src/shared/types.ts`
- [ ] Move reusable components, hooks, utils, styles, and global types here
- [ ] Update imports in your code to use the new paths
- [ ] Test your app and run tests

- [ ] 4. Organize API Routes
- [ ] Create `src/api/someModule/contract.ts`
- [ ] Create `src/api/someModule/routes.ts`
- [ ] Create `src/api/someModule/index.ts`
- [ ] Move or refactor API route handlers and types here
- [ ] Update imports and ensure API routes work
- [ ] Test your app and run tests

- [ ] 5. Add Backend Directory
- [ ] Create `src/backend/someService/repository.ts`
- [ ] Create `src/backend/someService/service.ts`
- [ ] Create `src/backend/someService/types.ts`
- [ ] Create `src/backend/someService/test.ts`
- [ ] Create `src/backend/someService/index.ts`
- [ ] Create `src/backend/shared/`
- [ ] Move backend-only logic here
- [ ] Update imports and run backend-related tests

- [ ] 6. Clean Up and Finalize
- [ ] Remove old folders/files that are now redundant
- [ ] Update all imports to use the new structure
- [ ] Run `yarn dev` and `yarn test` to confirm everything works

- [ ] 7. Commit Changes
- [ ] Commit your refactored structure

---

**Tip:**  
After each step, verify your app runs and tests pass before moving on.  
This ensures a smooth migration and makes troubleshooting easier.