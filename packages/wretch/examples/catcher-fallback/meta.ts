// catcher-fallback example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A last-resort catcher",
  summary:
    ".catcherFallback() catches whatever the specific catchers did not: an unexpected status like 418 or 503, or a lost connection. Pick what goes wrong and see which handler took it.",
  section: "Helper methods",
  tags: ["catcherFallback", "catcher"],
  docs: ["repo/src/types.ts", "repo/src/resolver.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
