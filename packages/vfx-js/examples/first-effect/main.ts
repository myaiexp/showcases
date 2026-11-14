// VFX-JS example: one VFX, one image, the "glitch" preset drawn 100px past its edges
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);

  // One VFX per page; each has its own WebGL canvas. (stage.vfxOpts keeps that canvas
  // inside this stage, and stage.own destroys it on cleanup.)
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  // vfx.add is async: it resolves once the image is in a texture.
  await vfx.add(img, { shader: 'glitch', overflow: 100 });
  stage.say('shader: "glitch", overflow: 100');

  return () => stage.dispose();
};

export default mount;
