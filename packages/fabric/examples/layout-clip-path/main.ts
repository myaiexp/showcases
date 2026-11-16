// Layout managers: ClipPathLayout sizes the group to its clipPath
import { Canvas, Circle, ClipPathLayout, Group, LayoutManager, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The group is as big as its clip circle, not its members: the tinted box is the circle\'s bounding box. Change the radius, then triggerLayout() fits the group again.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const clip = new Circle({ radius: 60 });
  const group = new Group(
    [
      new Rect({ left: 110, top: 120, width: 90, height: 90, fill: RED }),
      new Circle({ left: 190, top: 130, radius: 48, fill: BLUE }),
      new Triangle({ left: 255, top: 115, width: 90, height: 90, fill: GREEN }),
    ],
    // the clipPath must already be set when the layout manager runs its first layout
    { clipPath: clip, layoutManager: new LayoutManager(new ClipPathLayout()), backgroundColor: 'rgba(100, 100, 255, 0.14)' },
  );
  canvas.add(group);
  const say = status(stage);
  const report = (): void => say(`clip radius ${clip.radius} · group ${Math.round(group.width)} × ${Math.round(group.height)}`);

  const setRadius = (r: number): void => {
    clip.set('radius', r);
    group.triggerLayout();
    group.setCoords();
    group.dirty = true;
    canvas.requestRenderAll();
    report();
  };
  report();

  if (stage.bar) slider(stage.bar, 'clipPath radius', 20, 110, 1, 60, setRadius, (v) => `${v}px`);
  else stage.loop((_dt, t) => setRadius(Math.round(60 + Math.sin(t * 1.4) * 38)));

  return stage.dispose;
};

export default mount;
