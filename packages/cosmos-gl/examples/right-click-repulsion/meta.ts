// cosmos-gl example: Right-click repulsion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Right-click repulsion',
  summary:
    'With enableRightClickRepulsion on, holding the right mouse button pushes nearby points away from the pointer while the layout runs, with simulationRepulsionFromMouse setting the strength. The card imitates the held button with scripted pointer events.',
  section: 'View & zoom',
  tags: ['enableRightClickRepulsion', 'simulationRepulsionFromMouse', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
