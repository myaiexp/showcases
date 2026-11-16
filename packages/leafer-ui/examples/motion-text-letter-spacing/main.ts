// MotionText: letterSpacing along the path
import { App, Ellipse, Group, Line, Text } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import '@leafer-in/motion-path'; // motionPath and motion
import '@leafer-in/viewport'; // the viewport plugin (optional)
import '@leafer-in/motion-text'; // motionText: text that follows the path
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the gap between the letters.' });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  const k = stage.preview ? 0.42 : 1.4;
  const group = new Group();
  const path = new Line({
    x: stage.width / 2 - 275 * k,
    y: stage.height / 2 - 50 * k,
    motionPath: true,
    points: [0, 90, 100, 60, 200, 80, 300, 40, 375, 50, 450, 10, 550, 90].map((n) => n * k),
    curve: 0.4,
    stroke: '#ccc',
    strokeWidth: 2,
  });
  const text = new Text({ text: 'Welcome to LeaferJS', fill: '#32cd79', fontSize: stage.preview ? 12 : 20, motion: 5, motionText: true, motionAround: 'bottom' });
  group.add(path);
  group.add(text);
  app.tree.add(group);
  drive(stage, 'letterSpacing', [0, 10, 0.5], 1, (v) => (text.letterSpacing = v), 5);

  return stage.dispose;
};

export default mount;
