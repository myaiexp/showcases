// Zod: TypeScript-first schema validation with static type inference
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Zod',
  npm: 'zod',
  tagline: 'TypeScript-first schema validation with static type inference.',
  about:
    "Data arriving from outside a program (a form, an API, a file, a URL) can be anything. Zod lets you describe what it should look like, a schema, and then checks real data against it: good data comes back clean and typed, bad data comes back with a precise list of what is wrong and where. Along the way it can convert data (text to numbers, strings to dates), fill in defaults and drop unknown fields. The same schema also gives TypeScript its type, exports to JSON Schema and carries metadata.",
  category: 'Utilities',
  homepage: 'https://zod.dev',
  docsUrl: 'https://zod.dev/api',
  repo: 'https://github.com/colinhacks/zod',
  added: '2026-06-14',
  // The zod.dev sidebar order (content/meta.json). Its long "Defining schemas" page is split
  // along its own headings into the ten sections from "Primitives and coercion" to
  // "Defaults, catch and more"; "Release notes" gathers the v4 notes and the 4.5 / 4.6 posts.
  sections: [
    'Intro',
    'Basic usage',
    'Primitives and coercion',
    'Strings and formats',
    'Numbers, dates and enums',
    'Optional and nullable',
    'Objects',
    'Arrays, tuples and unions',
    'Records, maps, sets and more',
    'Refinements',
    'Transforms and pipes',
    'Defaults, catch and more',
    'Customizing errors',
    'Formatting errors',
    'Metadata and registries',
    'JSON Schema',
    'Codecs',
    'AOT compilation',
    'For library authors',
    'Zod Mini',
    'Zod Core',
    'Release notes',
  ],
});
