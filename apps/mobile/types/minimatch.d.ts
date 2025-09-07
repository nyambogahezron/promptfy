// Ambient declaration to satisfy TypeScript when @types/minimatch isn't resolved
declare module "minimatch" {
	interface MinimatchOptions {
		nobrace?: boolean;
		noglobstar?: boolean;
		dot?: boolean;
		noext?: boolean;
		nocase?: boolean;
		nonull?: boolean;
		matchBase?: boolean;
		nocomment?: boolean;
		nonegate?: boolean;
		flipNegate?: boolean;
	}

	function minimatch(target: string, pattern: string, options?: MinimatchOptions): boolean;
	export = minimatch;
}
