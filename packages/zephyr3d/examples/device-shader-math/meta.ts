// zephyr3d example: Builtin shader functions plotted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Builtin shader functions plotted',
  summary:
    'Fourteen of the builtin functions (sin, fract, smoothStep, clamp, mix, tanh and more) built from the program builder and drawn as curves y = f(k * x), one program per function.',
  section: 'Device API',
  tags: ['pb.sin', 'pb.fract', 'pb.smoothStep', 'pb.clamp', 'pb.mix', 'pb.step', 'pb.pow', 'pb.abs', 'pb.floor'],
  docs: ['repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
