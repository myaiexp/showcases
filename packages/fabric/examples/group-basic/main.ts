// Groups: new Group([...]) is one object; item() reaches its members
import { Canvas, Circle, FabricText, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'One object on the canvas: a labelled ellipse made of two. Select it and drag, scale or rotate the whole. The buttons reach inside through item().' });
  const canvas = stage.own(new Canvas(stage.el));

  const circle = new Circle({ radius: 100, fill: '#eef', scaleY: 0.5, stroke: '#8a8ad0', strokeWidth: 2 });
  const text = new FabricText('hello world', { fontSize: 30, fontFamily: 'sans-serif', fill: '#2b2a33' });
  // members are placed around the group's centre; left, top and angle belong to the group
  const group = new Group([circle, text], { left: 180, top: 120, angle: -10, scaleX: 0.9, scaleY: 0.9 });
  canvas.add(group);

  // item(i) reaches members: item(0) is the squeezed circle, item(1) the text
  let flipped = false;
  const toggle = (): void => {
    flipped = !flipped;
    group.item(0).set('fill', flipped ? 'red' : '#eef');
    group.item(1).set({ text: flipped ? 'trololo' : 'hello world', fill: flipped ? 'white' : '#2b2a33' });
    group.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) button(stage.bar, 'change members with item()', toggle);
  else {
    stage.every(1300, toggle);
    stage.loop((_dt, t) => {
      group.set('angle', -10 + Math.sin(t * 1.5) * 12);
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
