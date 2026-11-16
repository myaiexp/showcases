// Moving an object from code leaves its hit area until setCoords()
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['rect.left = x', 'rect.left = x; rect.setCoords()'],
    scene: [220, 140],
    hint: 'Both rectangles are moved by code to the right-hand spot and repainted. Then click on the rectangle where you see it: fabric tests clicks against coordinates it caches (aCoords, oCoords), and only a user drag or setCoords() refreshes them.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const stale = stage.own(new Canvas(pa.el), pa);
  const fresh = stage.own(new Canvas(pb.el), pb);
  const sayA = briefStatus(stage, pa);
  const sayB = briefStatus(stage, pb);
  const make = (): Rect => new Rect({ left: 50, top: 70, width: 56, height: 56, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 });
  const a = make();
  const b = make();
  stale.add(a);
  fresh.add(b);

  const report = (c: Canvas, say: (t: string) => void): void => {
    c.on('mouse:down', ({ target }) => say(target ? 'click hit the rect' : 'click hit nothing'));
  };
  report(stale, sayA);
  report(fresh, sayB);

  const moveTo = (x: number): void => {
    for (const [c, r] of [[stale, a], [fresh, b]] as const) {
      c.discardActiveObject();
      r.left = x; // a plain assignment; set('left', x) behaves the same
    }
    b.setCoords();
    stale.requestRenderAll();
    fresh.requestRenderAll();
  };

  if (stage.bar) {
    button(stage.bar, 'move both to the right', () => moveTo(165));
    button(stage.bar, 'move both back', () => moveTo(50));
  } else {
    const ga = stage.ghost(stale);
    const gb = stage.ghost(fresh);
    stage.repeat(async () => {
      moveTo(50);
      sayA('');
      sayB('');
      await stage.wait(700);
      moveTo(165);
      await stage.wait(500);
      await Promise.all([ga.click({ x: 165, y: 70 }), gb.click({ x: 165, y: 70 })]);
      await stage.wait(1400);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
