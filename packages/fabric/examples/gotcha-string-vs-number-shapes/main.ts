// Input strings are not numbers: left + 30 glues text together
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/custom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 200],
    hint: 'Inputs return strings, and fabric stores whatever it is given. The top shape gets Number(value); the bottom one gets the raw string and ends up wherever the string arithmetic puts it, usually off the canvas. Nudging by code makes it worse: "40" + 30 is "4030".',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));
  const say = briefStatus(stage);
  const good = new Rect({ left: 40, top: 55, width: 44, height: 44, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 2 });
  const bad = new Circle({ left: 40, top: 140, radius: 22, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 2 });
  canvas.add(good, bad, caption('Number(input.value)', 220, 55, 12), caption('input.value (a string)', 220, 140, 12));

  // what a text field gives: always a string
  const fromInput = (n: number): string => String(n);
  const apply = (value: string): void => {
    good.set('left', Number(value));
    bad.set('left', value as unknown as number); // TypeScript would stop this; JavaScript from an input does not
    good.setCoords();
    bad.setCoords();
    canvas.requestRenderAll();
    say(`left is ${typeof good.left} / ${typeof bad.left}\n${JSON.stringify(bad.left)}`);
  };
  // the usual next step: "move it 30 to the right"
  const nudge = (): void => {
    good.set('left', good.left + 30);
    bad.set('left', bad.left + 30);
    good.setCoords();
    bad.setCoords();
    canvas.requestRenderAll();
    say(`left is ${typeof good.left} / ${typeof bad.left}\n${JSON.stringify(bad.left)}`);
  };
  apply('40');

  if (stage.bar) {
    slider(stage.bar, 'input value', 20, 160, 10, 40, (v) => apply(fromInput(v)));
    button(stage.bar, 'nudge +30', nudge);
  } else {
    let step = 0;
    stage.every(1100, () => {
      if (step++ % 4 === 0) apply('40');
      else nudge();
    });
  }
  return stage.dispose;
};

export default mount;
