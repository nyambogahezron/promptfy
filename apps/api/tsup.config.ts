import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
	entry: ["index.ts"],
	clean: true,
	format: ["cjs"],
	...options,
}));
