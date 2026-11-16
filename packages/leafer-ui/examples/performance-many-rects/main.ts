// Basics: creating many draggable rects in groups
import { Leafer, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the number of groups (400 rects each) and drag any rect.', paper: 'transparent' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const world = new Group();
  leafer.add(world);
  const say = label(stage, '', true);

  // One group per hue, a 20 x 20 grid of draggable rects in each (the docs use 100 x 100).
  function build(groups: number): void {
    const start = performance.now();
    world.clear();
    const groupSize = 20 * 14 + 40;
    const column = 5;
    for (let i = 0; i < groups; i++) {
      const group = new Group({ x: groupSize * (i % column), y: groupSize * Math.floor(i / column) });
      world.add(group);
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
          group.add(new Rect({ x: c * 14, y: r * 14, width: 10, height: 10, fill: `hsl(${i * 25}, 50%, 50%)`, draggable: true }));
        }
      }
    }
    world.scale = Math.min(stage.width / (groupSize * Math.min(groups, column)), stage.height / (groupSize * Math.ceil(groups / column)));
    say(`${groups * 400} rects created in ${Math.round(performance.now() - start)} ms`);
  }
  build(stage.preview ? 3 : 10);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: 30, y: 40 }, { x: 80, y: 90 }, 700);
      await stage.wait(600);
      await ghost.drag({ x: 80, y: 90 }, { x: 30, y: 40 }, 700);
      await stage.wait(600);
    });
  } else slider(stage.bar!, 'groups', 1, 100, 1, 10, (v) => build(v), (v) => `${v} (${v * 400} rects)`);

  return stage.dispose;
};

export default mount;
