// Z-fighting fixes: the same overlapping balls with each fix from the docs
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const FIXES = [
  'none (pops)',
  'same colour',
  'move apart',
  'Group',
  'invisible counterweight',
] as const;
type Fix = (typeof FIXES)[number];
const GOLD = '#EA0';
const PURPLE = '#a35ac9';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two big balls overlap and turn. Pick a fix.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.2 },
  });

  let scene: Zdog.Anchor;
  const build = (fix: Fix): void => {
    scene?.remove();
    scene = new Zdog.Anchor({ addTo: illo });
    const dot = (addTo: Zdog.Anchor, x: number, color: string): Zdog.Shape =>
      new Zdog.Shape({ addTo, stroke: 70, translate: { x }, color });
    switch (fix) {
      case 'none (pops)':
        dot(scene, -24, GOLD);
        dot(scene, 24, PURPLE);
        break;
      case 'same colour':
        // a simple solution: shapes of one colour hide the swap
        dot(scene, -24, GOLD);
        dot(scene, 24, GOLD);
        break;
      case 'move apart':
        // stroke volumes no longer overlap
        dot(scene, -48, GOLD);
        dot(scene, 48, PURPLE);
        break;
      case 'Group': {
        // a Group renders its children in the order added
        const group = new Zdog.Group({ addTo: scene });
        dot(group, -24, GOLD);
        dot(group, 24, PURPLE);
        break;
      }
      case 'invisible counterweight': {
        // the group's depth is the average of its children, so an invisible
        // shape on the far side pulls it to match the purple ball
        const group = new Zdog.Group({ addTo: scene });
        dot(group, -24, GOLD);
        new Zdog.Shape({ addTo: group, visible: false, translate: { x: 72 } });
        dot(scene, 24, PURPLE);
        break;
      }
    }
  };
  let fix: Fix = FIXES[0];
  build(fix);

  if (stage.bar) select(stage.bar, 'fix', FIXES, (v) => { fix = v; build(fix); }, fix);
  else {
    let i = 0;
    stage.every(2400, () => {
      fix = FIXES[++i % FIXES.length]!;
      build(fix);
    });
  }

  stage.loop((dt) => {
    illo.rotate.y += dt * 1.1;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
