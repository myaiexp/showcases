// Spark example: sin, cos, mix and smoothstep making waves inside a modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Travelling waves from trigonometry',
  summary:
    'A flat sheet of splats lifted by a wave built from dyno.sin and dyno.cos of position and a time uniform: a plane wave, a ring ripple using length(), or a standing grid. smoothstep fades the wave out at the edge and mix blends a trough colour into a crest colour, with wavenumber and amplitude on sliders.',
  section: 'Dyno Standard Library',
  tags: ['sin', 'cos', 'mix', 'smoothstep', 'length', 'dynoFloat', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
