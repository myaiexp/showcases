// new Material(engine, shader) with properties written through shaderData
import { Color, Material, PrimitiveMesh, Shader } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, spin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { sway: 0, hint: 'material.shaderData.setColor / setTexture on the built-in "unlit" shader.' });
  caption(stage, 'shaderData.setColor + setTexture');
  const material = new Material(engine, Shader.find('unlit'));
  const tint = new Color(1, 1, 1, 1);
  material.shaderData.setColor('material_BaseColor', tint);
  material.shaderData.setTexture('material_BaseTexture', canvasTexture(engine, uvGrid, { size: 256 }));
  material.shaderData.enableMacro('MATERIAL_HAS_BASETEXTURE');
  spin(add(root, PrimitiveMesh.createCuboid(engine, 2.2, 2.2, 2.2), material).entity, [20, 35, 0]);
  if (stage.preview) tick(root, (_dt, t) => material.shaderData.setColor('material_BaseColor', new Color(...lin([0.7 + 0.3 * Math.sin(t), 0.7 + 0.3 * Math.sin(t + 2), 0.7 + 0.3 * Math.sin(t + 4)]), 1)));
  else color(stage.bar, 'material_BaseColor', [1, 1, 1], (c) => material.shaderData.setColor('material_BaseColor', new Color(...lin(c), 1)));
  return stage.dispose;
};

export default mount;
