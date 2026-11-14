// VFX-JS example: addHTML keeps a live capture where html-in-canvas exists
import { VFX, supportsHtmlInCanvas } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type in the field. With html-in-canvas the effect follows; without it the capture is a snapshot.' });
  // A fixed inline px width: addHTML copies the box onto its wrapper canvas once.
  const card = document.createElement('form');
  card.className = 'vx-panel';
  card.style.width = ctx.preview ? '200px' : '320px';
  const h = document.createElement('h3');
  h.textContent = 'Sign up';
  const input = document.createElement('input');
  input.placeholder = 'you@example.com';
  input.style.width = '100%';
  card.append(h, input);
  card.addEventListener('submit', (e) => e.preventDefault());
  stage.root.append(card);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const live = supportsHtmlInCanvas();
  // Falls back to the ordinary text path (with a console warning) where unsupported.
  await vfx.addHTML(card, { shader: 'rgbShift' });
  stage.say(
    live
      ? 'supportsHtmlInCanvas(): true. The capture is live: typing shows up in the effect'
      : 'supportsHtmlInCanvas(): false. addHTML fell back to a one-time capture',
    live ? 'ok' : 'warn',
  );
  return () => stage.dispose();
};

export default mount;
