// set-headers example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Set any header",
  summary:
    ".headers() puts any header on a request. An API key and a language travel with it, and the server greets you in the language you asked for.",
  section: "Helper methods",
  tags: ["headers"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
