// preserveDrawingBuffer lets other code read vfx.canvas between frames
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const w = ctx.preview ? 110 : 280;
  const img = await picture('portrait', w);
  const copy = document.createElement('canvas');
  copy.width = img.width;
  copy.height = img.height;
  copy.style.cssText = 'border: 1px dashed var(--fg-3); border-radius: 4px';
  stage.root.append(img, copy);

  // Without this flag the drawing buffer may be cleared once a frame is shown, and a
  // later drawImage(vfx.canvas) reads blank pixels.
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, preserveDrawingBuffer: true }));
  await vfx.add(img, { shader: 'glitch', overflow: 20 });

  const snapshot = (): void => {
    // vfx.canvas covers the window here; copy the part under the image.
    const r = img.getBoundingClientRect();
    const k = vfx.canvas.width / vfx.canvas.clientWidth;
    const g = copy.getContext('2d')!;
    g.clearRect(0, 0, copy.width, copy.height);
    g.drawImage(vfx.canvas, r.left * k, r.top * k, r.width * k, r.height * k, 0, 0, copy.width, copy.height);
    stage.say('drawImage(vfx.canvas, …) copied the last rendered frame');
  };
  if (stage.bar) button(stage.bar, 'Snapshot', snapshot);
  else stage.every(1500, snapshot);
  stage.after(400, snapshot);
  return () => stage.dispose();
};

export default mount;
