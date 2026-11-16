// Data: skipJSON leaves an element out of the JSON
import { Leafer, Rect, Group } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, toggle } from '../../shared/shapes.ts';
import { lineUp } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick skipJSON for the yellow rect: it is still drawn, but missing from group.toJSON().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.35;
  const items = [new Rect({ name: 'a', width: S, height: S, fill: '#32cd79' }), new Rect({ name: 'b', width: S, height: S, fill: '#FEB027' }), new Rect({ name: 'c', width: S, height: S, fill: '#4B8BFF' })];
  const group = new Group();
  leafer.add(group);
  lineUp(stage, group, items, ['a', 'b (skipJSON?)', 'c']);
  const show = label(stage, '', true);
  const refresh = (): void => {
    const json = group.toJSON() as { children?: { name?: string }[] };
    show(`group.toJSON().children: [${(json.children ?? []).map((c) => c.name).join(', ')}]   (${group.children.length} drawn)`);
  };
  toggle(stage, 'skipJSON on b', false, (v) => ((items[1]!.skipJSON = v), refresh()), 1500);
  refresh();

  return stage.dispose;
};

export default mount;
