import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  role?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = create<UserState>()(
    persist(
        (set) => ({
          user: null,
          setUser: (user) => set({ user }),
          clearUser: () => set({ user: null }),
        }),
        {
          name: 'user-storage', // unique name
          getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
        }
      )
);

export const useUserStore = () => userStore(userStore);
