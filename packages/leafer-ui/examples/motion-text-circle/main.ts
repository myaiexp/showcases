// MotionText: text around a circle
import { App, Ellipse, Group, Line, Text } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import '@leafer-in/motion-path'; // motionPath and motion
import '@leafer-in/viewport'; // the viewport plugin (optional)
import '@leafer-in/motion-text'; // motionText: text that follows the path
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the text turns round the circle (motion, in percent).' });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  const d = stage.preview ? 110 : 220; // the docs' circle is 200
  const group = new Group({ hitChildren: false });
  const path = new Ellipse({
    x: (stage.width - d) / 2,
    y: (stage.height - d) / 2,
    width: d,
    height: d,
    fill: '#32cd79',
    motionPath: true,
  });
  const text = new Text({
    text: 'Welcome to PxGrow',
    fontSize: stage.preview ? 13 : 20,
    fill: '#32cd79',
    motion: { type: 'percent', value: 0.75 }, // where on the path the text starts
    motionText: true,
    motionAround: 'bottom',
  });
  group.add(path);
  group.add(text);
  app.tree.add(group);
  drive(stage, 'motion', [0, 1, 0.01], 0.75, (v) => (text.motion = { type: 'percent', value: v }), 8, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
