// The crossOrigin and referrerPolicy options become attributes on each tile's <img>
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Cross = 'false' | 'true' | 'anonymous' | 'use-credentials';
type Policy = 'default' | 'no-referrer' | 'origin' | 'false';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Leaflet 2 sends referrerPolicy strict-origin-when-cross-origin by default (1.x sent none). false leaves the attribute off.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60, 25], zoom: 4 }));
  const pre = stage.side('First tile <img>');

  let layer: LocalTileLayer | undefined;
  let cross: Cross = 'false';
  let policy: Policy = 'default';
  const read = (tile?: HTMLElement): void => {
    const img = tile instanceof HTMLImageElement ? tile : layer?.getContainer()?.querySelector('img');
    const text = img
      ? `crossorigin="${img.getAttribute('crossorigin') ?? '(absent)'}"\nreferrerpolicy="${img.getAttribute('referrerpolicy') ?? '(absent)'}"\nalt="${img.alt}"`
      : '(no tile yet)';
    if (pre) pre.textContent = text;
    else stage.say(`crossOrigin ${cross} → ${img?.getAttribute('crossorigin') ?? 'absent'}; referrerPolicy ${policy} → ${img?.getAttribute('referrerpolicy') ?? 'absent'}`);
  };
  const build = (): void => {
    layer?.remove();
    layer = new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', {
      crossOrigin: cross === 'false' ? false : cross === 'true' ? true : cross,
      ...(policy === 'default' ? {} : { referrerPolicy: policy === 'false' ? (false as const) : policy }),
      attribution: LAND_ATTRIBUTION,
    });
    layer.once('tileloadstart', (e) => read(e.tile));
    layer.addTo(map);
    read();
  };
  build();

  stage.select('crossOrigin', (['false', 'true', 'anonymous', 'use-credentials'] as const).map((v) => ({ value: v, label: v })), 'false', (v) => ((cross = v), build()));
  stage.select('referrerPolicy', (['default', 'no-referrer', 'origin', 'false'] as const).map((v) => ({ value: v, label: v })), 'default', (v) => ((policy = v), build()));

  if (stage.preview) {
    const steps: [Cross, Policy][] = [['false', 'default'], ['anonymous', 'default'], ['anonymous', 'no-referrer'], ['false', 'false']];
    let i = 0;
    stage.cycle([{ run: () => {
      const [c, p] = steps[i++ % steps.length] ?? ['false', 'default'];
      cross = c;
      policy = p;
      build();
      map.setView([60 - i * 3, 25 + i * 8], 4, { animate: false });
    } }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
