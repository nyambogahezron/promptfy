# Pre-commit Hooks Configuration

This project uses **Husky** and **lint-staged** to ensure code quality and consistency before commits are made.

## Overview

The pre-commit hooks automatically run the following checks:

1. **Formatting & Linting**: Biome formats and lints only staged files
2. **Type Checking**: TypeScript type checking (only if `.ts/.tsx` files are staged)
3. **Building**: Compilation check (only if TypeScript files are staged)
4. **Testing**: Runs tests (only if test files or source files are staged)

## Configuration Files

### Husky Hooks

- **`.husky/pre-commit`**: Runs before each commit
- **`.husky/commit-msg`**: Validates commit messages (optional)
- **`.husky/pre-push`**: Runs comprehensive checks before push

### lint-staged Configuration

In `package.json`:

```json
{
	"lint-staged": {
		"**/*.{js,jsx,ts,tsx}": ["biome check --write --no-errors-on-unmatched"],
		"**/*.{json,jsonc}": ["biome format --write --no-errors-on-unmatched"],
		"**/*.{md,yaml,yml}": ["biome format --write --no-errors-on-unmatched"]
	}
}
```

## What Happens During Commit

### 1. Staging Changes

When you stage files with `git add`, the pre-commit hook will process them.

### 2. Pre-commit Hook Execution

```bash
# Always runs
📝 Formatting and linting staged files...
bun lint-staged

# Only if TypeScript files are staged
🔍 TypeScript files detected, running type checking...
bun run check-types

🔨 Building affected workspaces...
bun run build

# Only if test files or source files are staged
🧪 Running tests...
bun run test --passWithNoTests
```

### 3. Commit Success/Failure

- **Success**: Commit proceeds normally
- **Failure**: Commit is blocked, fix issues and try again

## What Happens During Push

The pre-push hook runs comprehensive checks:

```bash
🚀 Running pre-push checks...

📝 Checking formatting and linting...
bun run check

🔍 Type checking all workspaces...
bun run check-types

🔨 Building all packages...
bun run build

🧪 Running all tests...
bun run test
```

## Performance Optimizations

### Smart Execution

- **Conditional type checking**: Only runs if TypeScript files are staged
- **Conditional building**: Only builds if TypeScript files are staged
- **Conditional testing**: Only runs tests if relevant files are staged

### File Pattern Detection

The hooks detect file patterns to determine what to run:

- `*.ts`, `*.tsx` → Type checking + Building
- `*.test.*`, `*.spec.*` → Testing
- Source files → Testing (might affect existing tests)

## Manual Commands

You can run these commands manually:

```bash
# Format and lint staged files only
bun lint-staged

# Format and lint all files
bun run check:fix

# Run type checking
bun run check-types

# Build all workspaces
bun run build

# Run all tests
bun run test
```

## Setup Commands

If you're setting up the project:

```bash
# Install dependencies (includes husky setup)
bun install

# Initialize husky (if not already done)
bun husky init

# Make hooks executable (if needed)
chmod +x .husky/pre-commit .husky/commit-msg .husky/pre-push
```

## Bypassing Hooks

⚠️ **Use sparingly and only when necessary**

```bash
# Skip pre-commit hooks
git commit --no-verify -m "message"

# Skip pre-push hooks
git push --no-verify
```

## Troubleshooting

### Common Issues

1. **Hook not running**

   ```bash
   # Check if hooks are executable
   ls -la .husky/

   # Make executable if needed
   chmod +x .husky/pre-commit
   ```

2. **lint-staged fails**

   ```bash
   # Run manually to see errors
   bun lint-staged --verbose

   # Check biome configuration
   bun run check
   ```

3. **Type checking fails**

   ```bash
   # Run type checking manually
   bun run check-types

   # Check individual workspace
   cd apps/api && bun run check-types
   ```

4. **Build fails**

   ```bash
   # Run build manually
   bun run build

   # Check individual workspace
   cd apps/api && bun run build
   ```

### Performance Issues

If hooks are too slow:

1. **Disable building in pre-commit** (edit `.husky/pre-commit`)
2. **Reduce test scope** (only run unit tests in pre-commit)
3. **Move comprehensive checks to pre-push only**

### Customization

Edit hooks in `.husky/` directory:

- `.husky/pre-commit` - Runs before commit
- `.husky/pre-push` - Runs before push
- `.husky/commit-msg` - Validates commit messages

## Integration with CI/CD

The same checks run in CI/CD:

```yaml
# Example GitHub Actions
- name: Check formatting and linting
  run: bun run check

- name: Type check
  run: bun run check-types

- name: Build
  run: bun run build

- name: Test
  run: bun run test
```

## Best Practices

1. **Commit frequently** with small changes
2. **Fix issues immediately** when hooks fail
3. **Keep hooks fast** to maintain developer experience
4. **Test hooks locally** before pushing changes
5. **Don't bypass hooks** unless absolutely necessary

## File Patterns

The hooks recognize these patterns:

| Pattern           | Action             |
| ----------------- | ------------------ |
| `*.{ts,tsx}`      | Type check + Build |
| `*.{js,jsx}`      | Lint + Format      |
| `*.{json,jsonc}`  | Format             |
| `*.{md,yaml,yml}` | Format             |
| `*.{test,spec}.*` | Run tests          |

This ensures fast, targeted checks that only run when necessary.
