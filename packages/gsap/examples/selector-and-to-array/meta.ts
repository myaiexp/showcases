// gsap example: Scoped selector() and toArray()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scoped selector() and toArray()",
  summary:
    "Three look-alike components each get a scoped selector() so only their own boxes animate, while toArray() with a scope returns every box under the example. Counts show the difference.",
  section: "Utility methods",
  tags: ["selector", "toArray", "scope", "utils"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/UtilityMethods/selector-.md",
    "pages/gsap-com/docs/v3/GSAP/UtilityMethods/toArray-.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
