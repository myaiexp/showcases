// Appearance: helper functions that add, find and remove a mask
import { Leafer, Group, Ellipse, Image, type UI } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Add a mask, add another (it replaces the first), remove it. The Group drags." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const group = new Group({ ...mid(stage, S), draggable: true });
  const image = new Image({ width: S, height: S, url: photo() });
  leafer.add(group);
  group.add(image);

  function addMask(g: Group, maskChild: UI): void {
    if (g.children.some((item) => item.mask)) removeMask(g);
    maskChild.mask = true;
    g.addAt(maskChild, 0); // masks sit at the bottom of the Group
  }
  function getMask(g: Group): UI | undefined {
    return g.children.find((item) => item.mask) as UI | undefined;
  }
  function removeMask(g: Group): void {
    const m = getMask(g);
    if (!m) return;
    m.mask = false;
    g.remove(m);
  }

  const ring = (): Ellipse => new Ellipse({ width: S, height: S, innerRadius: 0.5, fill: 'black' });
  const disc = (): Ellipse => new Ellipse({ width: S, height: S * 0.6, y: S * 0.2, fill: 'black' });
  if (stage.bar) {
    button(stage.bar, 'addMask(ring)', () => addMask(group, ring()));
    button(stage.bar, 'addMask(ellipse)', () => addMask(group, disc()));
    button(stage.bar, 'removeMask()', () => removeMask(group));
  } else {
    const steps = [() => addMask(group, ring()), () => addMask(group, disc()), () => removeMask(group)];
    let i = 0;
    steps[0]!();
    stage.every(1400, () => steps[++i % steps.length]!());
  }

  return stage.dispose;
};

export default mount;
