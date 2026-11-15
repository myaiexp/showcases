// Polyline subclasses that run the parent's onAdd, then or after changing something
import { LeafletMap, Polyline, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'All three lines were given color "#3b82f6" (blue). Remove and add them again to see the log of what each onAdd saw.' });
  const log = stage.log('onAdd');
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 9], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Before the parent runs: change options, and the parent draws with them.
  class RedPolyline extends Polyline {
    override onAdd(map: LeafletMap): this {
      this.options.color = 'red';
      super.onAdd(map);
      return this;
    }
  }
  // After the parent runs: its element exists now, so it can be given a class.
  class GlowPolyline extends Polyline {
    override onAdd(map: LeafletMap): this {
      log(`GlowPolyline before super.onAdd: getElement() is ${String(this.getElement())}`);
      super.onAdd(map);
      this.getElement()?.classList.add('glow');
      log(`GlowPolyline after super.onAdd: getElement() is <${this.getElement()?.tagName.toLowerCase()}>, class "${this.getElement()?.getAttribute('class')}"`);
      return this;
    }
  }

  const path = (lat: number): LatLngExpression[] => [[lat, 3], [lat + 1.2, 9], [lat, 15]];
  const style = { color: '#3b82f6', weight: 6 };
  const plain = new Polyline(path(51), style).bindTooltip('Polyline', { permanent: true, direction: 'top' });
  const red = new RedPolyline(path(47.5), style).bindTooltip('RedPolyline', { permanent: true, direction: 'top' });
  const glow = new GlowPolyline(path(44), style).bindTooltip('GlowPolyline', { permanent: true, direction: 'top' });
  const lines = [plain, red, glow];

  const addAll = (): void => {
    for (const l of lines) l.addTo(map);
    stage.say(`RedPolyline options.color is "${red.options.color}"; the others still have "${plain.options.color}"`);
  };
  addAll();
  stage.button('Remove and add again', () => {
    for (const l of lines) l.remove();
    addAll();
  });

  if (stage.preview) {
    stage.cycle([{ run: () => (lines.forEach((l) => l.remove()), addAll()) }], 2800);
  }
  return () => stage.dispose();
};

export default mount;
