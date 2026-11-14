// VFX-JS example: a real <button> drawn by a shader still takes the click
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { realButton } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the button.' });
  const button = realButton('Clicked 0 times');
  button.style.fontSize = ctx.preview ? '14px' : '20px';
  button.style.padding = '10px 18px';
  stage.root.append(button);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(button, { shader: 'rgbShift' });

  // The element stays where it is with opacity 0, so clicks, focus and screen readers
  // still use it. Its text is a snapshot: capture it again after changing it.
  let clicks = 0;
  button.addEventListener('click', () => {
    clicks++;
    button.textContent = `Clicked ${clicks} time${clicks === 1 ? '' : 's'}`;
    void vfx.update(button);
    stage.say('The click reached the real button; the handler called vfx.update(button)');
  });
  // A card has no pointer: click it from code.
  if (ctx.preview) stage.every(1500, () => button.click());
  return () => stage.dispose();
};

export default mount;
