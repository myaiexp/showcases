// App & engine config: changing the canvas pixel ratio
import { Leafer, Text, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide pixelRatio: the text and edges get coarse or sharp; the readout is the canvas size in real pixels.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pixelRatio: 1,
      fill: '#333',
    }),
  );
  leafer.add(new Text({ x: u(30), y: u(30), text: 'pixelRatio', fontSize: stage.preview ? 22 : 40, fill: '#fff' }));
  leafer.add(new Ellipse({ x: u(30), y: u(90), width: u(110), height: u(110), stroke: GREEN, strokeWidth: 2 }));
  const say = label(stage, '', true);
  const setRatio = (v: number): void => {
    leafer.pixelRatio = v; // get / set at runtime
    say(`pixelRatio ${v}   canvas ${leafer.canvas.pixelWidth} x ${leafer.canvas.pixelHeight} px`);
  };

  if (stage.preview) cycle(stage, [0.4, 1, 2], setRatio, 1800);
  else slider(stage.bar!, 'pixelRatio', 0.25, 3, 0.25, 1, setRatio);

  return stage.dispose;
};

export default mount;
