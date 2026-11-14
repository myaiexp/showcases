// VFX-JS example: the "tritone" preset with three colours and a speed uniform
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { colorInput, hexToRgba, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // color1..3 are vec4s; all four uniforms must be passed.
  const u = {
    color1: hexToRgba('#1d1b4f'),
    color2: hexToRgba('#e94f64'),
    color3: hexToRgba('#ffe29a'),
    speed: 0.3,
  };
  await vfx.add(img, {
    shader: 'tritone',
    uniforms: { color1: () => u.color1, color2: () => u.color2, color3: () => u.color3, speed: () => u.speed },
  });

  if (stage.bar) {
    colorInput(stage.bar, 'color1', '#1d1b4f', (c) => (u.color1 = c));
    colorInput(stage.bar, 'color2', '#e94f64', (c) => (u.color2 = c));
    colorInput(stage.bar, 'color3', '#ffe29a', (c) => (u.color3 = c));
    slider(stage.bar, 'speed', 0, 2, 0.05, u.speed, (v) => (u.speed = v));
  }
  stage.say('Dark → color1 → color2 → color3, cycling with speed');
  return () => stage.dispose();
};

export default mount;
