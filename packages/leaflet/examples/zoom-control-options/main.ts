// A ZoomControl built by hand: position, button text and button titles
import { LeafletMap, ZoomControl, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Look = 'default' | 'text' | 'finnish';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'zoomControl: false leaves the corner empty; new ZoomControl({...}).addTo(map) puts one back. The texts are HTML, the titles show on hover and are read by screen readers.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: 4, zoomControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let control: ZoomControl | undefined;
  stage.onDispose(() => control?.remove());
  const show = (look: Look, position: ControlPosition): void => {
    control?.remove();
    // Texts and titles are read when the control is added, so a new control is made for each look.
    control =
      look === 'text'
        ? new ZoomControl({ position, zoomInText: 'zoom +', zoomOutText: 'zoom −', zoomInTitle: 'Closer', zoomOutTitle: 'Farther' })
        : look === 'finnish'
          ? new ZoomControl({ position, zoomInTitle: 'Lähennä', zoomOutTitle: 'Loitonna' })
          : new ZoomControl({ position });
    control.addTo(map);
    const title = control.getContainer()?.querySelector('.leaflet-control-zoom-in')?.getAttribute('title');
    stage.say(`look "${look}" at ${control.getPosition()}: the zoom in button's title is "${title}"`);
  };
  show('default', 'topleft');

  let look: Look = 'default';
  let position: ControlPosition = 'topleft';
  stage.select('Look', [{ value: 'default', label: 'defaults' }, { value: 'text', label: 'text buttons' }, { value: 'finnish', label: 'translated titles' }], look, (v) => show((look = v), position));
  stage.select('Position', (['topleft', 'topright', 'bottomleft', 'bottomright'] as const).map((v) => ({ value: v, label: v })), position, (v) => show(look, (position = v)));

  if (stage.preview) {
    const steps: [Look, ControlPosition][] = [['default', 'topleft'], ['text', 'topright'], ['finnish', 'bottomleft']];
    stage.cycle(steps.map(([l, p]) => ({ run: () => show(l, p) })), 2400);
  }
  return () => stage.dispose();
};

export default mount;
