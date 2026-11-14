// VFX-JS example: createGLTransition with your own shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "createGLTransition with your own shader",
  summary:
    "createGLTransition turns an object shaped like a gl-transitions entry (name, glsl, defaultParams, paramsTypes) into a transition class. The object here is written by hand: a diagonal sweep of growing squares using progress, ratio, getFromColor and getToColor. Its param named reverse collides with a core uniform, so it is renamed internally and still passed as reverse.",
  section: "Custom transitions",
  tags: ['createGLTransition', 'GLTransitionDef', 'defaultParams', 'paramsTypes', 'params'],
  docs: ['repo/docs/TRANSITION.md', 'repo/packages/transitions/src/gl-transition.ts', 'repo/packages/transitions/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
