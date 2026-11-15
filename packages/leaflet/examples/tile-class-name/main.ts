// The className option puts a CSS class on the tile layer's container, so CSS filters can restyle the tiles
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const CLASSES = ['', 'tiles-sepia', 'tiles-invert', 'tiles-blur'] as const;
type Cls = (typeof CLASSES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'className is read when the layer is added, so each choice builds a new layer. The CSS in style.css filters .tiles-* only.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [38, 20], zoom: 4 }));

  let layer: LocalTileLayer | undefined;
  const use = (className: Cls): void => {
    layer?.remove();
    layer = new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { className, attribution: LAND_ATTRIBUTION }).addTo(map);
    stage.say(className ? `className: '${className}', container class "${layer.getContainer()?.className ?? ''}"` : 'no className: the plain tiles');
  };
  use('');
  stage.select('className', CLASSES.map((v) => ({ value: v, label: v || '(none)' })), '', use);

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => use(CLASSES[++i % CLASSES.length] ?? '') }], 2200);
  }
  return () => stage.dispose();
};

export default mount;
