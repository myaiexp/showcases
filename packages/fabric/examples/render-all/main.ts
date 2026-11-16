// Canvas: renderAll() draws at once, requestRenderAll() asks for one draw on the next frame
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Turning off renderOnAddRemove and the render calls makes the canvas paint only when told. Count the draws (after:render) each button causes.' });
  const canvas = stage.own(new Canvas(stage.el, { renderOnAddRemove: false }));
  const say = status(stage);

  const rect = new Rect({ left: 150, top: 100, width: 110, height: 70, fill: '#3b7dd8' });
  canvas.add(rect);
  canvas.renderAll();

  let draws = 0;
  let last = 'start';
  canvas.on('after:render', () => {
    draws++;
    show();
  });
  function show(): void {
    say(`last action: ${last}\ndraws so far (after:render): ${draws}`);
  }
  const hues = ['#3b7dd8', '#e94b3c', '#2e9e5b', '#f2b134'];
  let h = 0;
  const recolor = (): void => void rect.set('fill', hues[++h % hues.length]!);

  const actions: [string, () => void][] = [
    ['set fill, no render', () => ((last = 'set() only: nothing drawn'), recolor(), show())],
    ['renderAll() ×5', () => ((last = 'renderAll ×5: 5 draws'), recolor(), [1, 2, 3, 4, 5].forEach(() => canvas.renderAll()))],
    ['requestRenderAll() ×5', () => ((last = 'requestRenderAll ×5: 1 draw'), recolor(), [1, 2, 3, 4, 5].forEach(() => canvas.requestRenderAll()))],
  ];
  show();
  if (stage.bar) for (const [label, fn] of actions) button(stage.bar, label, fn);
  else {
    let i = 0;
    stage.every(1100, () => actions[i++ % actions.length]![1]());
  }

  return stage.dispose;
};

export default mount;
