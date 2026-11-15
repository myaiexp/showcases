// A TileLayer subclass whose getTileUrl picks the style per tile from its coordinates
import { LeafletMap, TileLayer, type Coords } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { serveTile } from '../../shared/tile-server.ts';

type Pattern = 'checkerboard' | 'rows' | 'zoom';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every tile asks getTileUrl for its address. Change the pattern and the tiles are requested again.' });
  const log = stage.log('getTileUrl');
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 10], zoom: 3, zoomControl: !stage.preview }));

  class PatternTileLayer extends TileLayer {
    pattern: Pattern = 'checkerboard';

    // Called for each tile that needs an address; the template is ignored, as in the tutorial's kitten layer.
    override getTileUrl(coords: Coords): string {
      const style = this.pattern === 'checkerboard' ? ((coords.x + coords.y) % 2 ? 'dark' : 'light') : this.pattern === 'rows' ? (['dark', 'terrain', 'vintage'][coords.y % 3] ?? 'dark') : (['dark', 'light', 'vintage', 'terrain'][coords.z % 4] ?? 'dark');
      log(`tile ${coords.z}/${coords.x}/${coords.y} → ${style}`);
      // serveTile is the pretend server of this gallery: a real layer would return a server URL here.
      return serveTile(`https://tiles.example/${style}/${coords.z}/${coords.x}/${coords.y}.png`);
    }

    override getAttribution(): string {
      return `Tiles chosen per ${this.pattern === 'zoom' ? 'zoom level' : 'tile'} by getTileUrl · Land: Natural Earth`;
    }
  }

  const layer = new PatternTileLayer('', {}).addTo(map);
  const set = (p: Pattern): void => {
    layer.pattern = p;
    layer.redraw();
    stage.say(`pattern: ${p}`);
  };
  stage.select<Pattern>('pattern', [{ value: 'checkerboard', label: 'checkerboard' }, { value: 'rows', label: 'by row' }, { value: 'zoom', label: 'by zoom level' }], 'checkerboard', set);
  stage.say('pattern: checkerboard');

  if (stage.preview) {
    const order: Pattern[] = ['checkerboard', 'rows', 'zoom', 'checkerboard'];
    let i = 0;
    stage.cycle([{ run: () => set(order[i++ % order.length] as Pattern) }, { run: () => map.setZoom(map.getZoom() === 3 ? 4 : 3) }], 2000);
  }
  return () => stage.dispose();
};

export default mount;
