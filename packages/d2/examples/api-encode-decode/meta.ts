// d2 example: Encode and decode D2 source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Encode and decode D2 source",
  summary:
    "`encode()` compresses D2 source into a short URL-safe string, the kind a share link carries, and `decode()` turns it back into the same source, which is then compiled and drawn. Both are in D2.js's published code, not its README.",
  section: "D2.js API",
  tags: ["encode", "decode"],
  docs: [
    "repo/d2js/js/README.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
