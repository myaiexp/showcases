// App & engine config: the default block scene type
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the box: the canvas moves with the page like any other element.', paper: 'transparent' });
  const u = sizer(stage);

  // A scrolling box with a line of text above a tall canvas
  const box = document.createElement('div');
  box.style.cssText = 'position:absolute;inset:0;overflow:auto;color:#444;font-size:13px';
  const text = document.createElement('div');
  text.style.cssText = `height:${stage.preview ? 100 : 200}px;padding:8px`;
  text.textContent = 'Scroll down, a rectangle appears';
  const canvas = document.createElement('canvas');
  box.append(text, canvas);
  stage.view.append(box);

  const leafer = stage.own(new Leafer({ view: canvas, height: 400 })); // the default type is block: do not set it
  leafer.add(new Rect({ x: u(60), y: u(40), width: u(160), height: u(160), fill: GREEN, cornerRadius: [50, 80, 0, 80], draggable: true }));

  if (stage.preview) stage.loop((_dt, t) => (box.scrollTop = (Math.sin(t * 1.2) + 1) * 110));

  return stage.dispose;
};

export default mount;
