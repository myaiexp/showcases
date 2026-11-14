// Animating UI: slide a panel in and fade every element below it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  const panel = addGroup(ui.screen, 'panel', { width: 360, height: 200 });
  addElement(panel, 'background', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.panel), opacity: 0.9 });
  addText(ui, panel, 'Achievement unlocked', { fontSize: 30 }, [0, 40]);
  addElement(panel, 'medal', { width: 54, height: 54, color: color(COL.accent) }, [0, -35]);
  addText(ui, panel, '10 coins collected', { fontSize: 20, color: color(COL.dim) }, [0, -75]);

  // Opacity does not cascade, so a fade sets every element below the panel. Each one remembers
  // its own opacity first, because they differ.
  const base = new Map<pc.Entity, number>();
  const collect = (entity: pc.Entity): void => {
    const e = entity.element;
    if (e && e.type !== pc.ELEMENTTYPE_GROUP) base.set(entity, e.opacity);
    for (const child of entity.children) collect(child as pc.Entity);
  };
  collect(panel);
  const setOpacity = (factor: number): void => {
    for (const [entity, opacity] of base) entity.element!.opacity = opacity * factor;
  };

  // A cycle: slide in from the left, hold, fade out, wait.
  const ease = (x: number): number => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  const state = { t: 0, auto: true, slide: 1, fade: 1 };
  const apply = (): void => {
    panel.setLocalPosition(pc.math.lerp(-520, 0, state.slide), 0, 0);
    setOpacity(state.fade);
  };
  apply();
  ui.app.on('update', (dt: number) => {
    if (!state.auto) return;
    state.t = (state.t + dt) % 5;
    state.slide = ease(state.t / 0.7);
    state.fade = state.t < 3 ? 1 : 1 - Math.min(1, (state.t - 3) / 1);
    apply();
  });

  if (!ctx.preview) {
    const controls = createPanel(el);
    controls.slider('slide', 0, 1, 0.01, 1, (v) => ((state.auto = false), (state.slide = v), apply()));
    controls.slider('fade', 0, 1, 0.01, 1, (v) => ((state.auto = false), (state.fade = v), apply()));
    controls.button('Play', () => ((state.auto = true), (state.t = 0)));
  }

  return () => ui.dispose();
};

export default mount;
