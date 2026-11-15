// Tooltip content from a function, setTooltipContent and getTooltip
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the left marker: its content function runs on every open. The button swaps the right marker\'s text with setTooltipContent().' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const counter = new Marker([60.2, 24.0]).addTo(map);
  let opens = 0;
  // A function gets the layer and returns the content; it runs each time the tooltip opens.
  counter.bindTooltip((layer) => {
    opens += 1;
    const { lat, lng } = (layer as Marker).getLatLng();
    return `Opened ${opens} times at ${lat.toFixed(1)}, ${lng.toFixed(1)}`;
  }, { direction: 'top' });

  const swap = new Marker([60.2, 25.8]).addTo(map).bindTooltip('First text', { permanent: true, direction: 'top' });
  const texts = ['First text', 'Second text', 'A third, longer text'];
  let i = 0;
  const next = (): void => {
    i = (i + 1) % texts.length;
    swap.setTooltipContent(texts[i] ?? '');
    stage.say(`getTooltip().getContent() is "${String(swap.getTooltip()?.getContent())}"`);
  };
  stage.button('setTooltipContent()', next);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.over(counter.getLatLng(), counter.getElement()), hold: 1300 },
        { run: () => g.out(counter.getElement()), hold: 300 },
        { run: next, hold: 1500 },
        { run: () => g.over(counter.getLatLng(), counter.getElement()), hold: 1300 },
        { run: () => g.out(counter.getElement()), hold: 300 },
        { run: next, hold: 1500 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
