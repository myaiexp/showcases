// Tooltip offset: moving a tooltip away from its anchor, [x, y] in pixels
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dot is the layer. A positive x moves the tooltip right, a positive y down. Mirrored in x when an auto tooltip opens to the left.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const dot = new CircleMarker([60.2, 24.9], { radius: 5, color: '#f59e0b', fillOpacity: 1 }).addTo(map);
  dot.bindTooltip('offset [0, 0]', { permanent: true, direction: 'right', offset: [0, 0] });
  const tooltip = dot.getTooltip();

  const state = { x: 0, y: 0 };
  const apply = (): void => {
    if (!tooltip) return;
    tooltip.options.offset = [state.x, state.y];
    dot.setTooltipContent(`offset [${state.x}, ${state.y}]`);
    tooltip.update();
  };
  stage.slider('offset x', -60, 60, 2, 0, (v) => ((state.x = v), apply()));
  stage.slider('offset y', -40, 40, 2, 0, (v) => ((state.y = v), apply()));

  if (stage.preview) {
    const offsets: [number, number][] = [[0, 0], [30, 0], [30, 30], [0, -30], [-20, 0]];
    let i = 0;
    stage.every(1500, () => {
      [state.x, state.y] = offsets[++i % offsets.length]!;
      apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
