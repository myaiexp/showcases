// galacean example: Engine: pause and resume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Engine: pause and resume",
  summary:
    "engine.pause() stops the render loop and engine.resume() starts it again; time stops with it. The panel reads isPaused and the time counters.",
  section: "Core",
  tags: ['Engine', 'pause', 'resume', 'isPaused'],
  docs: [
    'repo/docs/en/core/engine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
