// LeafList: building and editing an ordered list of elements
import { Leafer, LeafList, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Top row: five squares. Bottom strip: the LeafList, in order. Press the buttons to edit it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const colors = ['#ff4b4b', '#feb027', '#32cd79', '#4B8BFF', '#a259ff'];
  const s = Math.min(42, (stage.width - 40) / 5 - 8);
  const sources = colors.map((c, i) => new Rect({ x: 20 + i * (s + 8), y: 20, width: s, height: s, fill: c, cornerRadius: 6, hittable: false }));
  leafer.add(sources);
  const slots: Rect[] = [];
  for (let i = 0; i < 5; i++) {
    const slot = new Rect({ x: 20 + i * (s + 8), y: 20 + s + 40, width: s, height: s, stroke: '#ccc', strokeWidth: 1.5, dashPattern: [4, 3], cornerRadius: 6, hittable: false });
    slots.push(slot);
    leafer.add(slot);
  }
  const list = new LeafList();
  const say = label(stage, '', true);

  const draw = (note: string): void => {
    sources.forEach((r) => (r.opacity = list.has(r) ? 1 : 0.3));
    slots.forEach((slot, i) => {
      const leaf = list.indexAt(i) as Rect | undefined;
      slot.set({ fill: leaf ? (leaf.fill as string) : undefined, stroke: leaf ? 'transparent' : '#ccc' });
    });
    say(`${note}\nlist.length = ${list.length}`);
  };
  const steps: [string, () => void][] = [
    ['add(red)', () => list.add(sources[0]!)],
    ['add(green)', () => list.add(sources[2]!)],
    ['addAt(blue, 0)', () => list.addAt(sources[3]!, 0)],
    ['add(yellow)', () => list.add(sources[1]!)],
    ['remove(green)', () => list.remove(sources[2]!)],
    ['indexOf(red) -> ' + 'see list', () => void 0],
    ['reset()', () => list.reset()],
  ];
  let i = 0;
  const next = (): void => {
    const [name, run] = steps[i++ % steps.length]!;
    run();
    draw(name === 'indexOf(red) -> see list' ? `indexOf(red) = ${list.indexOf(sources[0]!)}   has(green) = ${list.has(sources[2]!)}` : name);
  };
  draw('new LeafList()');
  if (stage.bar) button(stage.bar, 'next step', next);
  else stage.every(1100, next);
  return stage.dispose;
};

export default mount;
