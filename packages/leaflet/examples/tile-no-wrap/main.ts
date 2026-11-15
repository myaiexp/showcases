// noWrap: show the world once instead of repeating it, and bounds to stop requests past the edge
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { countTiles } from '../../shared/tile-urls.ts';

type Mode = 'wrap' | 'nowrap' | 'bounded';
const MODES: Record<Mode, { label: string; noWrap: boolean; bounded: boolean }> = {
  wrap: { label: 'default: the world repeats', noWrap: false, bounded: false },
  nowrap: { label: 'noWrap: true', noWrap: true, bounded: false },
  bounded: { label: 'noWrap: true and bounds', noWrap: true, bounded: true },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom 1 and drag sideways. Wrapped copies reuse the same tile images; noWrap leaves the space empty.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 1, minZoom: 0 }));

  let layer: LocalTileLayer | undefined;
  const use = (mode: Mode): void => {
    layer?.remove();
    const { label, noWrap, bounded } = MODES[mode];
    layer = new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', {
      noWrap,
      ...(bounded ? { bounds: [[-90, -180], [90, 180]] as [[number, number], [number, number]] } : {}),
      attribution: LAND_ATTRIBUTION,
    });
    countTiles(layer, (c) => stage.say(`${label}, ${c.requested} tiles requested`));
    layer.addTo(map);
    stage.say(label);
  };
  use('wrap');
  stage.select('mode', Object.entries(MODES).map(([value, m]) => ({ value: value as Mode, label: m.label })), 'wrap', use);

  if (stage.preview) {
    const order: Mode[] = ['wrap', 'nowrap', 'bounded'];
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            use(order[i++ % order.length] ?? 'wrap');
            map.setView([20, 0], 0, { animate: false });
          },
        },
        { run: () => map.panBy([-260, 0], { duration: 1.2 }) },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
