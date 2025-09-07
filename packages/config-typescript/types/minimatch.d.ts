// Minimal ambient declaration for minimatch used by build tooling
declare module "minimatch" {
	const minimatch: unknown;
	export = minimatch;
}
