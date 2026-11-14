// head-request example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ask about a file without downloading it",
  summary:
    ".head() fetches only the headers. The app learns a file's size, type and last change without downloading it, and the card says so.",
  section: "HTTP methods",
  tags: ["head", "res"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
