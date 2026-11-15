// Popup offset: moving a popup away from its anchor, [x, y] in pixels
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dot is the layer. Offset x moves the popup sideways; a bigger y lifts it higher. The default is [0, 7].' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const dot = new CircleMarker([60.2, 24.9], { radius: 5, color: '#f59e0b', fillOpacity: 1 }).addTo(map);
  dot.bindPopup('Offset', { offset: [0, 7], autoPan: false, closeButton: false, closeOnClick: false, autoClose: false });
  dot.openPopup();

  const popup = dot.getPopup();
  const state = { x: 0, y: 7 };
  const apply = (): void => {
    if (!popup) return;
    popup.options.offset = [state.x, state.y];
    popup.setContent(`offset: [${state.x}, ${state.y}]`);
    popup.update();
  };
  apply();
  stage.slider('offset x', -80, 80, 5, 0, (v) => ((state.x = v), apply()));
  stage.slider('offset y', -20, 60, 1, 7, (v) => ((state.y = v), apply()));

  if (stage.preview) {
    const offsets: [number, number][] = [[0, 7], [60, 7], [0, 45], [-60, 7], [0, -10]];
    let i = 0;
    stage.every(1500, () => {
      const [x, y] = offsets[++i % offsets.length]!;
      state.x = x;
      state.y = y;
      apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
