// u_frameIndex and u_timeDelta: counting frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "u_frameIndex and u_timeDelta: counting frames",
  summary: "u_frameIndex counts frames and u_timeDelta is the time since the previous one; reading either makes the shader redraw each frame. The bar fills as the index runs through 120 frames, and its brightness follows how long each frame took.",
  section: "Shaders",
  tags: ["@shaders", "u_frameIndex", "u_timeDelta"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
