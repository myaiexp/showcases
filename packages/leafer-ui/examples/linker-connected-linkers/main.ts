// Linker: startLinker and endLinker on the elements
import { App } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The counts list which connectors touch each box." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = linkBox(stage, 'rect1', [100, 100], { fixed: false });
  const rect2 = linkBox(stage, 'rect2', [100, 300], { fixed: false });
  const rect3 = linkBox(stage, 'rect3', [400, 200], { fixed: false, orange: true });
  const linkers = [
    new Linker({ startPoint: { id: 'rect1' }, endPoint: { id: 'rect3' }, endArrow: 'angle', stroke: '#836DFF', strokeWidth: 2 }),
    new Linker({ startPoint: { id: 'rect2' }, endPoint: { id: 'rect3' }, endArrow: 'angle', stroke: '#ff4c4c', strokeWidth: 2 }),
  ];
  app.tree.add(linkers);
  app.tree.add([rect1, rect2, rect3]);
  const say = label(stage, '');
  stage.loop(() => {
    const line = (box: typeof rect1): string => `${box.id}: startLinker ${box.startLinker?.length ?? 0}, endLinker ${box.endLinker?.length ?? 0}`;
    say([rect1, rect2, rect3].map(line).join('\n'));
  });

  return stage.dispose;
};

export default mount;
