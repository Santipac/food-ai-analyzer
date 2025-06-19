import { User } from "@/interfaces/user";
import { create } from "zustand";
import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
interface UserState {
    user: User | null
}

interface UserActions {
    setUser: (user: User) => void
}

const initialState: UserState = {
    user: null,
}

const state: StateCreator<UserState & UserActions> = (set) => ({
    ...initialState,
    setUser: (user: User) => set({ user })
})

export const useUserStore = create<UserState & UserActions>()(persist(state, { name: "@aifood/user" }))
