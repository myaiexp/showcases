// MotionText: text running along a curve
import { App, Ellipse, Group, Line, Text } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import '@leafer-in/motion-path'; // motionPath and motion
import '@leafer-in/viewport'; // the viewport plugin (optional)
import '@leafer-in/motion-text'; // motionText: text that follows the path
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The text slides along the green curve, which sits under it (motionAround: "bottom").' });
  const app = stage.own(new App({ view: stage.view, tree: { type: 'viewport' } }));
  const k = stage.preview ? 0.42 : 1.4; // the docs' curve is 550 wide
  const group = new Group();
  const path = new Line({
    x: stage.width / 2 - 275 * k,
    y: stage.height / 2 - 50 * k,
    motionPath: true, // the other elements of this Group can move along it
    points: [0, 90, 100, 60, 200, 80, 300, 40, 375, 50, 450, 10, 550, 90, 550, 90].map((n) => n * k),
    curve: 0.4,
    fill: '#32cd79',
  });
  const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
    fontSize: stage.preview ? 12 : 20,
    letterSpacing: 1,
    motion: 0,
    motionText: true, // lay the letters along the path
    motionAround: 'bottom', // the path is under the text
    animation: { style: { motion: { type: 'percent', value: 1 } }, duration: 3, easing: 'linear', loop: true },
  });
  group.add(path);
  group.add(text);
  app.tree.add(group);

  return stage.dispose;
};

export default mount;
