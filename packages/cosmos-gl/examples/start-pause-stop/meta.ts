// cosmos-gl example: Start, pause and stop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Start, pause and stop',
  summary:
    'start(alpha) begins or reheats the layout with the energy you give it, pause() freezes it and unpause() resumes, stop() ends it and resets its state. isSimulationRunning reports whether it is running right now; the caption polls it.',
  section: 'Simulation control',
  tags: ['start', 'pause', 'unpause', 'stop', 'isSimulationRunning'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
