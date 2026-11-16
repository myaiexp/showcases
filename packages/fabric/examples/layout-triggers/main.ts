// Layout managers: which actions trigger a layout, per strategy
import { Canvas, Circle, FitContentLayout, FixedLayout, Group, LayoutManager, Rect, Triangle, type LayoutStrategy } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, eventLog, GREEN, nameIt, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const STRATEGIES: Record<string, () => LayoutStrategy> = {
  FitContentLayout: () => new FitContentLayout(),
  FixedLayout: () => new FixedLayout(),
};

const mount: Mount = (el, ctx) => {
  const names = ctx.preview ? ['FitContentLayout'] : Object.keys(STRATEGIES);
  const stage = createStage(el, ctx, {
    panes: names,
    scene: [300, 220],
    height: 330,
    hint: 'The same buttons drive both groups. A layout "ran" when the strategy measured and moved things, "skipped" when it declined. Adding and removing re-fits only FitContentLayout; a plain set() triggers nothing; triggerLayout() always measures.',
  });
  const log = eventLog(stage, 6);

  interface Side {
    canvas: Canvas;
    group: Group;
    ran: number;
    skipped: number;
    name: string;
  }
  const build = (side: Side | null, name: string, index: number): Side => {
    const canvas = side?.canvas ?? stage.own(new Canvas(stage.panes[index]!.el), stage.panes[index]);
    if (side) canvas.remove(side.group);
    const group = new Group(
      [nameIt(new Rect({ left: 100, top: 110, width: 60, height: 60, fill: RED }), 'red'), nameIt(new Circle({ left: 175, top: 110, radius: 28, fill: BLUE }), 'blue')],
      { layoutManager: new LayoutManager(STRATEGIES[name]!()), width: 160, height: 90, subTargetCheck: true, interactive: true, backgroundColor: 'rgba(100, 100, 255, 0.14)' },
    );
    const next: Side = { canvas, group, ran: 0, skipped: 0, name };
    // layout:after has a `result` only when the strategy did measure
    group.on('layout:after', ({ context, result }) => {
      result ? next.ran++ : next.skipped++;
      log.add(`${name === 'FixedLayout' ? 'Fixed' : 'FitContent'} ${context.type}`, result ? 'ran' : 'skipped');
      caption(next, index);
    });
    canvas.add(group);
    caption(next, index);
    return next;
  };
  const caption = (s: Side, index: number): void => {
    const c = stage.panes[index]?.caption;
    if (c) c.textContent = `${s.name} · ran ${s.ran} · skipped ${s.skipped}`;
  };
  const sides = names.map((n, i) => build(null, n, i));
  let k = 0;
  const each = (fn: (s: Side) => void): void => {
    sides.forEach((s) => {
      fn(s);
      s.group.setCoords();
      s.canvas.requestRenderAll();
    });
  };
  const add = (): void => each((s) => s.group.add(nameIt(new Triangle({ left: 60 + ((k++ * 47) % 180), top: 160, width: 40, height: 38, fill: GREEN }), 'tri')));
  const remove = (): void => each((s) => s.group.size() > 2 && s.group.remove(s.group.item(s.group.size() - 1)!));
  const poke = (): void => each((s) => s.group.item(0).set('left', s.group.item(0).left - 20));
  const trigger = (): void => each((s) => s.group.triggerLayout());

  if (stage.bar) {
    button(stage.bar, 'add()', add);
    button(stage.bar, 'remove()', remove);
    button(stage.bar, 'set() a member', poke);
    button(stage.bar, 'triggerLayout()', trigger);
  } else {
    let flip = 0;
    stage.repeat(async () => {
      const name = names[0]!;
      const alt = flip++ % 2 ? 'FitContentLayout' : 'FixedLayout';
      sides[0] = build(sides[0]!, alt, 0);
      log.clear();
      void name;
      for (const step of [add, poke, trigger, remove]) {
        step();
        await stage.wait(900);
      }
      await stage.wait(400);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
