// Zod: TypeScript-first schema validation with static type inference
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Zod',
  npm: 'zod',
  tagline: 'TypeScript-first schema validation with static type inference.',
  about:
    "TypeScript types vanish at runtime, so they can't protect you from a malformed API response, a bad form submission, or a corrupted JSON blob. Zod closes that gap: write a schema once and get both a runtime validator and a static type inferred from it. safeParse returns a tidy success/error result with precise, path-aware messages and no exceptions to wrangle, which suits forms, API boundaries and config parsing.",
  category: 'Utilities',
  homepage: 'https://zod.dev',
  docsUrl: 'https://zod.dev',
  repo: 'https://github.com/colinhacks/zod',
  added: '2026-06-14',
  sections: ['Basics'],
});
