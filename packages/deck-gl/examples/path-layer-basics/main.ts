// A PathLayer of coloured polylines with per-path colour and width, plus a tooltip
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { HOME, waveLines, type Line } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.4, bearing: 0 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    getTooltip: ({ object }) => (object ? (object as Line).name : null),
    layers: [
      new PathLayer<Line>({
        id: 'lines',
        data: waveLines(),
        getPath: (d) => d.path,
        getColor: (d) => d.color,
        // Metres: the widths are real distances on the ground.
        getWidth: (d) => 40 + d.path.length,
        widthMinPixels: 2,
        pickable: true,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: Math.sin(t * 0.4) * 25 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
