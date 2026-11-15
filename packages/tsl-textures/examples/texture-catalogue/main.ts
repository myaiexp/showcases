// Every colour texture the package exports, called with no arguments
import * as THREE from 'three/webgpu';
import * as library from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { heading, note } from '../../shared/panel.ts';

interface Texture {
  (): THREE.Node<'vec3'>;
  defaults: { $name: string; $normalNode?: unknown; $positionNode?: unknown };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 640 });

  // Texture functions are the exports that carry a `defaults` object. Its flags say
  // which slot each one is made for: $positionNode (shape textures), $normalNode.
  const all = Object.entries(library).filter((e): e is [string, Texture] => typeof e[1] === 'function' && 'defaults' in e[1]);
  const shape = all.filter(([, fn]) => fn.defaults.$positionNode);
  const normal = all.filter(([, fn]) => fn.defaults.$normalNode);
  const colour = all.filter(([, fn]) => !fn.defaults.$positionNode && !fn.defaults.$normalNode);

  // Cards show six of them, spread over the alphabet.
  const shown = stage.preview ? colour.filter((_, i) => i % Math.ceil(colour.length / 6) === 0).slice(0, 6) : colour;
  const entries = shown.map(([, fn]) => {
    const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
    material.colorNode = fn();
    return { material, label: fn.defaults.$name };
  });
  lineup(stage, entries, { columns: stage.preview ? 3 : 7, spin: 1 });

  if (stage.panel) {
    heading(stage.panel, `${all.length} texture functions`);
    note(stage.panel, `Colour textures on colorNode: ${colour.length}, shown here.`);
    note(stage.panel, `Normal textures ($normalNode): ${normal.map(([n]) => n).join(', ')}.`);
    note(stage.panel, `Shape textures ($positionNode): ${shape.map(([n]) => n).join(', ')}.`);
  }

  stage.start();
  return stage.dispose;
};

export default mount;
