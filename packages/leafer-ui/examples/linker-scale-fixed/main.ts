// Linker: strokeScaleFixed "zoom-in"
import { App, Rect } from 'leafer-ui';
import '@leafer-in/find'; // finds the connected elements by id
import '@leafer-in/arrow'; // arrowheads for the connectors
import '@leafer-in/viewport'; // wheel zoom
import { Linker } from '@leafer-in/linker'; // the connector plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { linkBox } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl + wheel to zoom in: the connector keeps its width." });
  const app = stage.own(new App({ view: stage.view, tree: {} }));
  app.tree.cacheId = true; // cache ids as elements are created: faster id lookup

  const rect1 = Rect.one({ id: 'rect1', draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, stage.width * 0.2, stage.height * 0.35, stage.preview ? 50 : 100, stage.preview ? 50 : 100);
  const rect2 = Rect.one({ id: 'rect2', draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, stage.width * 0.6, stage.height * 0.35, stage.preview ? 50 : 100, stage.preview ? 50 : 100);
  app.tree.add([rect1, rect2]);
  const linker = new Linker({
    startPoint: { id: 'rect1' }, // the direction is automatic
    endPoint: { id: 'rect2' },
    endArrow: 'angle',
    stroke: '#836DFF',
    strokeWidth: 2,
    strokeScaleFixed: 'zoom-in', // the width does not grow with the zoom
  });
  app.tree.add(linker);

  if (stage.preview) wheelTour(stage, app, { pan: false });

  return stage.dispose;
};

export default mount;
