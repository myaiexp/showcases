// TextLayer maxWidth, wordBreak and lineHeight: long strings wrapped into text blocks
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { HOME, lngPerLat } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Break = 'break-word' | 'break-all';
interface Note {
  text: string;
  position: [number, number];
}

const TEXTS = [
  'A long sentence is wrapped into several lines by the layer.',
  'Supercalifragilisticexpialidocious breaks mid-word with break-all.',
  'Short one',
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.3 : 12 };
  const data: Note[] = TEXTS.map((text, i) => ({ text, position: [HOME[0] + (i - 1) * 0.05 * lngPerLat(HOME[1]), HOME[1] + 0.012] }));
  const state = { maxWidth: 8, wordBreak: 'break-word' as Break, lineHeight: 1.1 };

  const build = (): (ScatterplotLayer<Note> | TextLayer<Note>)[] => [
    new ScatterplotLayer<Note>({ id: 'dots', data, getPosition: (d) => d.position, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 90, 90] }),
    new TextLayer<Note>({
      id: 'notes',
      data,
      getText: (d) => d.text,
      getPosition: (d) => d.position,
      getSize: 15,
      getColor: [240, 240, 250],
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'top',
      // Unitless, times the text size: 8 x 15 is roughly a 120 px wide column.
      maxWidth: state.maxWidth,
      // 'break-word' wraps between words; 'break-all' also splits inside them.
      wordBreak: state.wordBreak,
      lineHeight: state.lineHeight,
      background: true,
      getBackgroundColor: [30, 45, 70, 230],
      backgroundPadding: [6, 4],
    }),
  ];
  const update = (): void => deck.setProps({ layers: build() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: build(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.maxWidth = 5 + 5 * (0.5 + 0.5 * Math.sin(t * 0.9));
      state.wordBreak = Math.floor(t / 3.5) % 2 === 0 ? 'break-word' : 'break-all';
      update();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'maxWidth', 3, 20, 1, 8, (v) => { state.maxWidth = v; update(); });
    select(bar, 'wordBreak', ['break-word', 'break-all'] as const, (v) => { state.wordBreak = v; update(); }, 'break-word');
    slider(bar, 'lineHeight', 0.8, 2, 0.1, 1.1, (v) => { state.lineHeight = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
