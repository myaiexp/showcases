// motion example: Spring with a safe fallback for old browsers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spring with a safe fallback for old browsers",
  summary: "A toast fades and slides in with a CSS spring, next to the plain ease-out an old browser would get. Because both use the same visual duration, they feel equally quick even though the spring keeps settling after.",
  section: "Integrations",
  tags: ["spring","visualDuration","CSS transition","fallback"],
  docs: ["pages/motion-dev/docs/css.md","pages/motion-dev/docs/spring.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
