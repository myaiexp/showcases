// galacean example: UI button interactive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI button interactive",
  summary:
    "Button.interactive switched off gives the disabled transition and makes clicks do nothing; the counter proves it. A checkbox toggles it in the full view and the card replays the sequence.",
  section: "UI",
  tags: ['Button.interactive', 'ColorTransition.disabled', 'addClicked'],
  docs: [
    'repo/docs/en/UI/quickStart/button.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
