// The opacity option and setOpacity() cross-fading two tile layers
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The slider calls setOpacity() on the vintage layer lying over the dark one.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 15], zoom: 4 }));

  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  // opacity in the options sets the starting value (default 1).
  const top = new LocalTileLayer('https://tiles.example/vintage/{z}/{x}/{y}.png', { opacity: 0.5 }).addTo(map);

  const show = (v: number): void => stage.say(`setOpacity(${v.toFixed(2)}), options.opacity is ${top.options.opacity.toFixed(2)}`);
  const set = (v: number): void => {
    top.setOpacity(v);
    show(v);
  };
  show(0.5);
  stage.slider('opacity', 0, 1, 0.05, 0.5, set);

  if (stage.preview) {
    let t = 0;
    stage.every(120, () => set(0.5 + 0.5 * Math.sin((t += 0.12))));
  }
  return () => stage.dispose();
};

export default mount;
