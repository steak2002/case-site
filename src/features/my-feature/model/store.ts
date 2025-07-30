import { create } from 'zustand';

export interface MyStoreState {

}

export interface MyStoreActions {

}

export const useMyStore = create<MyStoreState & MyStoreActions>((set, get) => ({
    // Define your store state and actions here
}));
