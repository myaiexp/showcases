// The tutorial's watermark: a Control whose onAdd returns an <img>
import { Control, DomUtil, LeafletMap, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

/** Draws the mark the control shows, so no image file is fetched. */
function markDataUrl(): string {
  const c = document.createElement('canvas');
  c.width = 400;
  c.height = 120;
  const x = c.getContext('2d');
  if (x) {
    x.fillStyle = 'rgb(17 24 39 / 0.85)';
    x.fillRect(0, 0, 400, 120);
    x.strokeStyle = '#f58a3d';
    x.lineWidth = 6;
    x.strokeRect(6, 6, 388, 108);
    x.fillStyle = '#f58a3d';
    x.font = '700 52px system-ui, sans-serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText('MY SITE', 200, 62);
  }
  return c.toDataURL();
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The control is an ordinary element in a corner: it does not move when the map does.' });
  const log = stage.log('Control');
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  class WatermarkControl extends Control<{ position: ControlPosition; width: number }> {
    static override defaultOptions = { position: 'bottomleft' as ControlPosition, width: 120 };
    override onAdd(): HTMLElement {
      const img = DomUtil.create('img');
      img.src = markDataUrl();
      img.alt = 'My site';
      img.style.width = `${this.options.width}px`;
      log(`onAdd: img created, ${this.options.width}px wide, at ${this.options.position}`);
      return img;
    }
    override onRemove(): void {
      log('onRemove: nothing to undo here');
    }
  }

  const mark = new WatermarkControl({ position: 'bottomleft' }).addTo(map);
  stage.onDispose(() => mark.remove());
  stage.say('new WatermarkControl({position: "bottomleft"}).addTo(map)');
  stage.select<ControlPosition>('position', ['topleft', 'topright', 'bottomleft', 'bottomright'].map((v) => ({ value: v as ControlPosition, label: v })), 'bottomleft', (p) => {
    mark.setPosition(p);
    log(`setPosition('${p}')`);
  });
  stage.toggle('on the map', true, (on) => (on ? mark.addTo(map) : mark.remove()));

  if (stage.preview) {
    const spots: ControlPosition[] = ['topright', 'bottomright', 'topleft', 'bottomleft'];
    let i = 0;
    stage.cycle([{ run: () => (mark.setPosition(spots[i++ % spots.length] as ControlPosition), stage.say(`setPosition('${mark.getPosition()}')`)) }], 1700);
    stage.every(4000, () => map.panBy([40, 10]));
  }
  return () => stage.dispose();
};

export default mount;
