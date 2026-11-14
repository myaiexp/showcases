// Custom picking: rowIndexes maps every star instance to its constellation, so one hover picks all
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { pointCloud, type LngLat, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { StarLayer, type StarPickingInfo } from './star-layer.ts';

interface Constellation {
  name: string;
  centre: LngLat;
  color: Color;
}
const GROUPS: Constellation[] = [
  { name: 'Lyra', centre: [2.35, 48.86], color: [120, 190, 255, 255] },
  { name: 'Draco', centre: [13.4, 52.52], color: [255, 170, 90, 255] },
  { name: 'Vela', centre: [-3.7, 40.42], color: [150, 240, 160, 255] },
  { name: 'Aquila', centre: [12.5, 41.9], color: [240, 140, 220, 255] },
];
const STARS = pointCloud(140, { seed: 21, spread: 1.6, centres: GROUPS.map((g) => g.centre) });

function describe(info: StarPickingInfo): string {
  const g = info.object as Constellation | undefined;
  if (!g) return 'nothing picked';
  return `info.index ${info.index} (picking colour [${Array.from(info.color ?? []).slice(0, 3)}] decodes to ${info.decoded})  ->  ${g.name}`;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 7, latitude: 46, zoom: ctx.preview ? 3.2 : 4.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover a star: the whole constellation highlights');
  if (ctx.preview) label.style.fontSize = '9px';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new StarLayer<SamplePoint>({
        id: 'stars',
        data: STARS,
        groups: GROUPS,
        getPosition: (d) => d.position,
        getColor: (d) => GROUPS[d.cluster]!.color,
        getGroup: (d) => d.cluster,
        radiusPixels: ctx.preview ? 7 : 10,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 255],
        onHover: (info: StarPickingInfo) => {
          label.textContent = describe(info);
        },
      }),
    ],
  });

  // Cards have no pointer: probe one star of each group in turn.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const star = STARS.find((s) => s.cluster === i++ % GROUPS.length)!;
      const at = screenOf(deck, star.position);
      const hit = at && deck.pickObject({ x: at[0], y: at[1] });
      if (hit) label.textContent = describe(hit as StarPickingInfo);
    }, 1500);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
