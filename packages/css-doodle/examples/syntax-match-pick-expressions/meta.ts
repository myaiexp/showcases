// Values inside $(): match() by the first true test, pick() by an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'match() and pick() inside expressions',
  summary:
    'Two ways to choose a value inside $(). match(test, value, test, value, …, else) gives the value after the first test that holds, here rings of opacity by distance from the centre; pick(k: a, b, c) gives item k counted from 1 and wraps around, so pick(@i: …) cycles three opacities along the cells.',
  section: 'Syntax overview',
  tags: ["match()", "pick()", "$()", "dr"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
