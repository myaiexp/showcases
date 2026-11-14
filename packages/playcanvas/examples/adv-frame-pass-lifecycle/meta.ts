// playcanvas example: FramePass lifecycle and flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FramePass lifecycle and flags',
  summary:
    'A FramePass subclass that only records its calls shows what one frame does with a pass in camera.afterPasses: frameUpdate for every pass while the frame is built, then before, onBefore, execute, after and onAfter, with the nested beforePasses and afterPasses around it. The trace of the last frame is drawn on a board; enabled skips everything, executeEnabled only execute.',
  section: 'Graphics: Advanced Rendering',
  tags: ['FramePass', 'frameUpdate', 'before', 'execute', 'after', 'onBefore', 'onAfter', 'enabled', 'executeEnabled', 'beforePasses', 'afterPasses'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/frame-passes.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/camera-passes.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
