// OrthographicView flipY: top-left coordinates with y growing downward, or bottom-left with y up
import { COORDINATE_SYSTEM, Deck, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState } from '@deck.gl/core';
import { LineLayer, PathLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = [number, number];
interface Label {
  text: string;
  at: Pt;
}

/** An F, which looks different mirrored: stem, top bar and middle bar, as one path. */
const F: Pt[] = [[0, 100], [0, 0], [0, 100], [60, 100], [0, 100], [0, 55], [40, 55]];
const AXES = [
  { from: [-20, 0] as Pt, to: [140, 0] as Pt, color: [255, 100, 100] as [number, number, number] },
  { from: [0, -20] as Pt, to: [0, 140] as Pt, color: [100, 230, 120] as [number, number, number] },
];
const LABELS: Label[] = [
  { text: 'x', at: [150, 0] },
  { text: 'y', at: [0, 150] },
  { text: '(0, 0)', at: [-34, -12] },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const viewState: OrthographicViewState = { target: [60, 60, 0], zoom: ctx.preview ? 0.5 : 1.3 };

  const layers = () => [
    new LineLayer<(typeof AXES)[number]>({
      id: 'axes',
      data: AXES,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getSourcePosition: (d) => d.from,
      getTargetPosition: (d) => d.to,
      getColor: (d) => d.color,
      getWidth: 2,
    }),
    new PathLayer<{ path: Pt[] }>({
      id: 'f',
      data: [{ path: F }],
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPath: (d) => d.path,
      getColor: [255, 190, 90],
      getWidth: 12,
      widthUnits: 'common',
      jointRounded: true,
      capRounded: true,
    }),
    new TextLayer<Label>({
      id: 'labels',
      data: LABELS,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: (d) => d.at,
      getText: (d) => d.text,
      getSize: 14,
      getColor: [210, 225, 245],
    }),
  ];

  const makeView = (flipY: boolean) => new OrthographicView({ id: 'plane', flipY, controller: !ctx.preview });
  const deck = new Deck({ device: stage.device, views: makeView(true), initialViewState: viewState, layers: layers() });

  let timer = 0;
  if (ctx.preview) {
    let flip = true;
    timer = window.setInterval(() => deck.setProps({ views: makeView((flip = !flip)) }), 2200);
  } else {
    check(controlBar(el), 'flipY (default true: y grows downward)', true, (v) => deck.setProps({ views: makeView(v) }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
