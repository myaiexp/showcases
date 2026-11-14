// vchart example: API: setSelected, setHovered and the clear methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: setSelected, setHovered and the clear methods',
  summary:
    'setSelected and setHovered take a datum, or a partial datum that matches several marks, and null clears; clearState, clearSelected, clearHovered and clearAllStates reset by name. Buttons set one bar, a whole series or a whole category and read back what matched; the card cycles them.',
  section: 'API',
  tags: ['setSelected', 'setHovered', 'clearSelected', 'clearHovered', 'clearAllStates', 'clearState', 'interaction'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
