// Halftone patterns: the eleven indexed patterns, picked from a list or stepped through
import * as THREE from 'three/webgpu';
import { halftone } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range, rgb } from '../../shared/params.ts';
import { heading, select } from '../../shared/panel.ts';
import { model } from '../../shared/shapes.ts';

// The Notes table; * marks patterns that want a specific radius, or they turn into circles.
const NAMES = ['grid', 'diagonal', 'checkerboard*', 'diagonal/x*', 'grid/x*', 'square', 'square/n', 'vertical', 'horizontal', 'grid/xn*', 'diagonal/xn*'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u, apply } = params(
    stage,
    {
      scale: range(2, 0, 4),
      radius: range(0.5, 0, 2),
      pattern: int(0, 0, 10),
      color: rgb(0x7fd1b9),
    },
    // A card steps through every pattern, 1.5 s each.
    { hold: 1500, presets: NAMES.map((_n, pattern) => ({ scale: 2, radius: 0.5, pattern })) },
  );

  if (stage.panel) {
    heading(stage.panel, 'Pattern');
    select(stage.panel, 'name', NAMES.map((label, i) => ({ value: String(i), label: `${i}  ${label}` })), '0', (v) => apply({ pattern: Number(v) }));
  }

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = halftone({ scale: u.scale, radius: u.radius, pattern: u.pattern, color: u.color });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
