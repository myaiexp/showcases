// App & Engine: ordering the layers of an App
import { App, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the button to apply the next call and watch the stacking change.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
    }),
  );
  // Three layers, each painting one square; they overlap. addLeafer() makes a layer and adds it on top.
  const layer = (color: string, x: number): Leafer => {
    const l = app.addLeafer();
    l.add(Rect.one({ fill: color }, x, u(50), u(110), u(110)));
    return l;
  };
  const red = layer('#FF4B4B', u(40));
  const green = layer(GREEN, u(100));
  const blue = layer('#4B7BFF', u(160));
  const names = new Map([[red, 'red'], [green, 'green'], [blue, 'blue']]);
  const say = label(stage, '', true);

  const steps: [string, () => void][] = [
    ['app.addLeafer() x3: red, green, blue', () => app.add(blue)],
    ['app.addAt(blue, 0)', () => app.addAt(blue, 0)],
    ['app.addBefore(red, blue)', () => app.addBefore(red, blue)],
    ['app.addAfter(blue, green)', () => app.addAfter(blue, green)],
    ['app.add(red, 0)', () => app.add(red, 0)],
  ];
  let n = -1;
  const next = (): void => {
    n = (n + 1) % steps.length;
    const [text, run] = steps[n]!;
    run();
    say(`${text}\nbottom to top: ${app.children.map((c) => names.get(c as Leafer)).join(', ')}`);
  };
  next();

  if (stage.preview) stage.every(1600, next);
  else button(stage.bar!, 'next call', next);

  return stage.dispose;
};

export default mount;
