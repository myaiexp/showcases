// the "duotone" preset with its colour1, colour2 and speed uniforms
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { colorInput, slider } from '../../shared/controls.ts';
import { liveVideo } from '../../shared/video.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The preset has no defaults for its uniforms: pass all of them. A function runs
  // every frame, so the controls change these values live.
  const u = { color1: [0, 0, 1, 1], color2: [0, 1, 0, 1], speed: 0.2 };
  await vfx.add(video, {
    shader: 'duotone',
    uniforms: { color1: () => u.color1, color2: () => u.color2, speed: () => u.speed },
  });

  if (stage.bar) {
    colorInput(stage.bar, 'color1', '#0000ff', (c) => (u.color1 = c));
    colorInput(stage.bar, 'color2', '#00ff00', (c) => (u.color2 = c));
    slider(stage.bar, 'speed', 0, 2, 0.05, u.speed, (v) => (u.speed = v));
  }
  stage.say('Brightness picks a mix of color1 and color2; speed cycles the mapping over time');
  return () => stage.dispose();
};

export default mount;
