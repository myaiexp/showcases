// updateWhenIdle, updateWhenZooming, updateInterval and keepBuffer: when tiles load and how long they stay
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { countTiles } from '../../shared/tile-urls.ts';

interface Config {
  updateWhenIdle: boolean;
  updateWhenZooming: boolean;
  updateInterval: number;
  keepBuffer: number;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layer is rebuilt with each setting (the update events are wired when it is added). Pan, then check how many tiles loaded before the pan ended.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 8], zoom: 5 }));
  const pre = stage.side('Last move');

  const cfg: Config = { updateWhenIdle: false, updateWhenZooming: true, updateInterval: 200, keepBuffer: 2 };
  let layer: LocalTileLayer | undefined;
  let tiles: ReturnType<typeof countTiles> | undefined;
  let duringMove = 0;
  let moving = false;

  const summary = (): string =>
    `updateWhenIdle ${cfg.updateWhenIdle}\nupdateWhenZooming ${cfg.updateWhenZooming}\nupdateInterval ${cfg.updateInterval}\nkeepBuffer ${cfg.keepBuffer}`;
  const show = (): void => {
    const c = tiles?.counts;
    const result = c ? `requested ${c.requested} (${duringMove} while moving)\nunloaded ${c.unloaded}` : '';
    if (pre) pre.textContent = `${summary()}\n\n${result}`;
    else stage.say(`updateWhenIdle ${cfg.updateWhenIdle}, interval ${cfg.updateInterval}: ${c?.requested ?? 0} requested, ${duringMove} before the pan ended`);
  };

  const build = (): void => {
    layer?.remove();
    layer = new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { ...cfg, attribution: LAND_ATTRIBUTION });
    tiles = countTiles(layer, (c) => {
      if (moving) duringMove = c.requested;
      show();
    });
    layer.addTo(map);
    duringMove = 0;
    show();
  };
  build();
  map.on('movestart', () => (moving = true));
  map.on('moveend', () => (moving = false));

  const pan = (): void => {
    tiles?.reset();
    duringMove = 0;
    map.panBy([900, 0], { duration: 1.6 });
  };
  stage.toggle('updateWhenIdle', false, (on) => ((cfg.updateWhenIdle = on), build()));
  stage.toggle('updateWhenZooming', true, (on) => ((cfg.updateWhenZooming = on), build()));
  stage.slider('updateInterval (ms)', 0, 1000, 50, 200, (v) => ((cfg.updateInterval = v), build()));
  stage.slider('keepBuffer', 0, 6, 1, 2, (v) => ((cfg.keepBuffer = v), build()));
  stage.button('Pan 900 px', pan);
  stage.button('Fly to the Andes', () => (tiles?.reset(), map.flyTo([-33, -70], 7)));
  stage.button('Fly back', () => (tiles?.reset(), map.flyTo([47, 8], 5)));

  if (stage.preview) {
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            cfg.updateWhenIdle = i++ % 2 === 1;
            map.setView([47, 8], 5, { animate: false });
            build();
            pan();
          },
          hold: 3200,
        },
      ],
      200,
    );
  }
  return () => stage.dispose();
};

export default mount;
