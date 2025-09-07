import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeType = "light" | "dark";

interface ThemeState {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: "light",
			setTheme: (theme) => set({ theme }),
		}),
		{
			name: "theme-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
