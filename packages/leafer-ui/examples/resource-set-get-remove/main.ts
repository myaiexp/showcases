// Resource: the general key and value store
import { Leafer, Rect, Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';

let instance = 0;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each press stores a colour under a key, reads it back, or removes it. Keys are shown beside the squares.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);
  const prefix = `showcase-${++instance}-`;
  const keys = ['red', 'green', 'blue'].map((n) => prefix + n);
  const colors = ['#ff4b4b', '#32cd79', '#4B8BFF'];
  const s = Math.min(50, stage.width / 5);
  const rects = keys.map((_, i) => new Rect({ x: 24 + i * (s + 24), y: stage.height * 0.4, width: s, height: s, cornerRadius: 8, fill: '#ddd', hittable: false }));
  leafer.add(rects);

  const show = (note: string): void => {
    rects.forEach((r, i) => (r.fill = Resource.get(keys[i]!) ?? '#ddd'));
    say(`${note}\nstored: ${keys.map((k) => (Resource.get(k) ? k.slice(prefix.length) : '-')).join(' ')}`);
  };
  const steps: [string, () => void][] = [
    ['set(red)', () => Resource.set(keys[0]!, colors[0])],
    ['set(green)', () => Resource.set(keys[1]!, colors[1])],
    ['set(blue)', () => Resource.set(keys[2]!, colors[2])],
    ['remove(green)', () => Resource.remove(keys[1]!)],
    ['remove(red)', () => Resource.remove(keys[0]!)],
    ['remove(blue)', () => Resource.remove(keys[2]!)],
  ];
  let i = 0;
  const next = (): void => {
    const [name, run] = steps[i++ % steps.length]!;
    run();
    show(name);
  };
  show('nothing stored');
  stage.onDispose(() => keys.forEach((k) => Resource.remove(k)));
  if (stage.bar) button(stage.bar, 'next step', next);
  else stage.every(1000, next);
  return stage.dispose;
};

export default mount;
