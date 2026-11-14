// TextLayer characterSet: default ASCII, an explicit list, or 'auto' from data
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { HOME } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Mode = 'default (ASCII 32-128)' | 'explicit list' | "'auto'";
interface Label {
  text: string;
  position: [number, number];
}

const TEXTS = ['São Paulo', 'Reykjavík', 'Москва', 'Αθήνα', 'Zürich 12°', 'Łódź', 'Bogotá', 'Kraków'];
const EXPLICIT = Array.from(new Set(Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 °ãíüłóśźż')));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 10.2 : 10.9 };
  const data: Label[] = TEXTS.map((text, i) => ({
    text,
    position: [HOME[0] + ((i % 2) - 0.5) * 0.09, HOME[1] + (1.5 - Math.floor(i / 2)) * 0.022],
  }));
  let mode: Mode = "'auto'";

  const characterSet = (): string[] | 'auto' | undefined => {
    if (mode === "'auto'") return 'auto';
    if (mode === 'explicit list') return EXPLICIT;
    return undefined; // the layer default: ASCII characters 32-128
  };
  const build = (): TextLayer<Label> =>
    new TextLayer<Label>({
      // The atlas is built once per characterSet, so the layer gets a new id for each mode.
      id: `text-${mode}`,
      data,
      getText: (d) => d.text,
      getPosition: (d) => d.position,
      getSize: 28,
      getColor: [255, 214, 120],
      // Characters outside the set are not drawn and a warning is logged to the console.
      ...(characterSet() === undefined ? {} : { characterSet: characterSet()! }),
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Mode[] = ["'auto'", 'default (ASCII 32-128)', 'explicit list'];
    stop = animate((t) => {
      const next = modes[Math.floor(t / 3) % 3]!;
      if (next !== mode) {
        mode = next;
        deck.setProps({ layers: [build()] });
      }
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, "'auto' reads every character out of the data, at some cost on big datasets.");
    select(bar, 'characterSet', ['default (ASCII 32-128)', 'explicit list', "'auto'"] as const, (v) => {
      mode = v;
      deck.setProps({ layers: [build()] });
      info.textContent =
        v === "'auto'"
          ? "'auto' reads every character out of the data, at some cost on big datasets."
          : v === 'explicit list'
            ? `An array of ${EXPLICIT.length} characters: Latin plus a few accents. Cyrillic and Greek labels lose their letters.`
            : 'Only ASCII is in the atlas: accents, Cyrillic and Greek are dropped (see the console warnings).';
    }, "'auto'");
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
