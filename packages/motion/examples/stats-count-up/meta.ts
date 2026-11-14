// motion example: Dashboard stats count up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dashboard numbers that count up',
  summary: 'Revenue, signups and uptime roll up from zero when a dashboard loads. animate(0, 100) animates a bare number, and onUpdate hands you each in-between value to print however you like.',
  section: 'animate',
  tags: ['animate', 'single values', 'onUpdate', 'duration', 'ease'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
