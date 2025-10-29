# Promptfy Copilot Instructions

## Architecture Overview

**Turborepo monorepo** with three apps sharing common packages:
- `apps/api` - Express.js REST API (Node.js, MongoDB, Better Auth)
- `apps/web` - Next.js web app (React 19, Tailwind, shadcn/ui)
- `apps/mobile` - Expo React Native app (Expo Router, native components)
- `packages/` - Shared packages: `logger`, `ui`, `config-typescript`, `jest-presets`

**Authentication flow:** Better Auth library centralized in `apps/api/lib/auth.ts` with MongoDB adapter. Clients (`apps/web/lib/auth-client.ts`, `apps/mobile/lib/auth-client.ts`) connect via `/api/auth/*` endpoints. Mobile uses `@better-auth/expo` plugin with SecureStore for token persistence.

**Data models:** Mongoose schemas in `apps/api/models/`. Key models:
- `Prompt.ts` - Versioned prompts with collaborators, public slugs, categories
- `User.ts` - Better Auth managed users with custom `role` field
- `PromptTemplate.ts` - Reusable templates for prompt generation

**AI Integration:** Google Gemini API via `GeminiService` in `apps/api/services/geminiService.ts`. Used for prompt generation combining user instructions with templates.

## Development Workflow

### Package Manager & Runtime
**Use Bun exclusively** - not npm/yarn/pnpm. All scripts assume `bun` command.

### Starting Development
```bash
# Start all apps (uses Turbo parallelization)
bun run dev

# Start specific apps
bun run dev:api      # API on port 5001
bun run dev:web      # Web on port 3000
bun run dev:mobile   # Expo dev server
```

### Code Quality (Biome, not ESLint/Prettier)
```bash
bun run check        # Lint + format check
bun run check:fix    # Auto-fix issues
bun run check-types  # TypeScript validation across all workspaces
```

**Biome rules** (see `biome.json`):
- Tab indentation (width: 2)
- 100 character line width
- Imports auto-organized on save
- Custom rules: `noExplicitAny` warns (not errors), `noUnknownAtRules` disabled for Tailwind

### Pre-commit Hooks
Husky + lint-staged configured. `scripts/pre-commit.sh` runs check, type-check, build, and test.

## Project-Specific Conventions

### Environment Variables
Each app has `env-example.txt` (NOT `.env.example`). Required vars:
- **API**: `MONGO_URL`, `GEMINI_API_KEY`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- **Web**: `NEXT_PUBLIC_API_URL`
- **Mobile**: `EXPO_PUBLIC_API_URL`

### File Structure Patterns
- **API Controllers**: Return status codes via `http-status-codes` package, throw `CustomError` for errors
- **API Routes**: Registered in `server.ts`, follow `/api/v1/<resource>` pattern
- **Mobile Navigation**: Expo Router file-based (`app/` directory), grouped routes in `(auth)` and `(home)` folders
- **State Management**: Zustand with AsyncStorage persistence in mobile (`store/authStore.ts`, `promptStore.ts`)

### Authentication Middleware
Use `apps/api/middleware/authentication.ts` to protect routes. Extracts user from Better Auth session:
```typescript
// In controllers, access authenticated user
interface AuthRequest extends Request {
  user?: { id: string; name: string; email: string; role: string; emailVerified: boolean; };
}
```

### TypeScript Configurations
Shared configs from `packages/config-typescript`:
- `nextjs.json` for Next.js apps
- `react-app.json` for Expo apps
- `base.json` for Node.js services

### Testing
Jest with workspace-specific presets (`packages/jest-presets/node` for API, `browser` for web). Run via:
```bash
bun run test  # All workspaces via Turbo
```

## Integration Points

### API ↔ Clients
- **Base URLs**: Configured via env vars, defaults to `localhost:5000` (API), `localhost:3000` (web)
- **Auth endpoints**: `/api/auth/*` (Better Auth auto-generated)
- **Custom endpoints**: `/api/v1/prompts`, `/api/v1/share`, `/api/v1/health`

### Shared Packages
- **@repo/logger**: Simple console logger (`log(...args)`)
- **@repo/ui**: Shared React components (currently minimal, expandable)
- Import as `"@repo/logger"` in `dependencies` of consuming apps

### MongoDB Connection
Single connection pool initialized in `apps/api/config/connectDB.ts`, reused by Better Auth MongoDB adapter and Mongoose models.

## Common Patterns

### Error Handling
Custom error class in `apps/api/errors/customError.ts`. Centralized error middleware in `middleware/errorHandler.ts` catches all errors and formats responses.

### Prompt Generation Flow
1. User submits instructions + selects template (via `PromptTemplate` model)
2. `promptController.ts` calls `GeminiService.generatePrompt(instructions, template)`
3. Response saved to `Prompt` model with version history
4. Public prompts get unique `publicSlug` for sharing

### Mobile State Persistence
Zustand stores with `persist` middleware use `@react-native-async-storage/async-storage`. All auth tokens stored via `expo-secure-store` (not AsyncStorage) for security.

### Collaborator Permissions
Prompts have `collaborators` array with roles: `editor` | `viewer`. Check in controllers before allowing updates:
```typescript
if (prompt.userId.toString() !== req.user?.id && !isCollaboratorEditor) {
  throw new CustomError({ message: "Not authorized", statusCode: 403 });
}
```

## Critical Files
- `apps/api/server.ts` - Express app setup, route registration
- `apps/api/lib/auth.ts` - Better Auth configuration (MongoDB, email verification)
- `apps/mobile/app/_layout.tsx` - Root layout with AuthProvider, theme setup
- `turbo.json` - Defines build dependency graph for monorepo
- `biome.json` - All linting/formatting rules

## Avoid
- Don't use ESLint/Prettier commands (removed in favor of Biome)
- Don't use npm/yarn/pnpm (Bun only)
- Don't create `.env.example` files (use `env-example.txt` convention)
- Don't hardcode API URLs (always use env vars with localhost defaults)
