// galacean example: Basics: reading the engine version
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Basics: reading the engine version",
  summary:
    "The version string the package exports, split into MAJOR.MINOR.PATCH and painted on a cube. The full view checks any toolkit version you type against the docs' rule that its major.minor must match the core engine's.",
  section: "Basics",
  tags: ['version', 'WebGLEngine'],
  docs: [
    'repo/docs/en/basics/version.mdx',
    'repo/docs/en/basics/overview.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
