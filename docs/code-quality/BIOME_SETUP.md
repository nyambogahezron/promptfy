# Code Formatting and Linting with Biome

This monorepo uses [Biome](https://biomejs.dev/) for code formatting and linting instead of Prettier and ESLint.

## What Changed

### Removed

- ✅ ESLint and all ESLint configurations
- ✅ Prettier and all Prettier configurations
- ✅ ESLint config package (`packages/config-eslint`)

### Added

- ✅ Biome configuration (`biome.json`)
- ✅ Biome ignore file (`.biomeignore`)
- ✅ VS Code settings for Biome integration
- ✅ Updated scripts in all `package.json` files
- ✅ Updated Turbo configuration

## Available Scripts

### Root Level (Monorepo)

```bash
# Format all files in the monorepo
bun run format

# Check formatting without fixing
bun run format:check

# Lint all workspaces via Turbo
bun run lint

# Fix linting issues
bun run lint:fix

# Check both formatting and linting
bun run check

# Fix both formatting and linting issues
bun run check:fix
```

### Individual Workspaces

Each workspace (apps/api, apps/web, apps/mobile, packages/\*) has these scripts:

```bash
# Lint the workspace
bun run lint

# Fix linting issues
bun run lint:fix

# Format files
bun run format

# Check and fix everything
bun run check
```

## Configuration

### Biome Configuration (`biome.json`)

The main configuration file includes:

- **Formatting**: Tab indentation, double quotes, 100 character line width
- **Linting**: Recommended rules with custom overrides
- **Import organization**: Automatic import sorting
- **File patterns**: Supports JS, TS, JSX, TSX, JSON

### VS Code Integration

The `.vscode/settings.json` file configures:

- Biome as the default formatter
- Format on save
- Automatic import organization
- Code actions on save

### Ignored Files (`.biomeignore`)

Common patterns excluded from formatting/linting:

- `node_modules/`
- Build outputs (`dist/`, `build/`, `.next/`)
- Lock files
- Generated files

## Migration Notes

### Custom Rules

Some rules have been adjusted for this project:

- `noExplicitAny`: Warning instead of error (gradual migration)
- `noNonNullAssertion`: Warning to identify areas needing attention
- `noUnknownAtRules`: Disabled for Tailwind CSS support
- `noArrayIndexKey`: Warning for React keys

### VS Code Extensions

Recommended to install:

- `biomejs.biome` - Biome VS Code extension

Recommended to uninstall:

- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`

## Running Biome

### Quick Commands

```bash
# Format and fix all issues
bun run check:fix

# Just check for issues without fixing
bun run check

# Format specific files
npx @biomejs/biome format --write src/

# Lint specific directory
npx @biomejs/biome lint src/
```

### CI/CD Integration

For continuous integration, use:

```bash
# Check formatting (fails if files need formatting)
npx @biomejs/biome format .

# Check linting (fails on errors)
npx @biomejs/biome lint .

# Check everything
npx @biomejs/biome check .
```

## Benefits of Biome

1. **Performance**: ~20x faster than ESLint + Prettier
2. **Single Tool**: One tool for formatting and linting
3. **Zero Config**: Works out of the box with sensible defaults
4. **Better Error Messages**: Clear, actionable error messages
5. **Import Sorting**: Built-in import organization
6. **TypeScript Support**: Native TypeScript support without additional setup

## Troubleshooting

### Common Issues

1. **VS Code not using Biome**
   - Install the Biome extension
   - Restart VS Code
   - Check that Biome is set as default formatter

2. **Rules too strict**
   - Adjust rules in `biome.json`
   - Use `warn` instead of `error` for gradual migration

3. **Large diffs on first format**
   - This is normal when migrating from Prettier
   - Run `bun run format` once to standardize formatting

### Performance

Biome is designed for speed:

- Formats entire monorepo in milliseconds
- Incremental linting for changed files
- Parallel processing across workspaces

## Next Steps

1. **Gradual Type Safety**: Address `any` type warnings over time
2. **Custom Rules**: Add project-specific linting rules as needed
3. **CI Integration**: Add Biome checks to GitHub Actions/CI pipeline
4. **Editor Config**: Consider adding `.editorconfig` for cross-editor consistency
