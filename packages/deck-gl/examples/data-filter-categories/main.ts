// DataFilterExtension categories: keep dots whose category is in filterCategories
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { dots, EU_VIEW, KIND_COLORS, KINDS, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const BANDS = ['small', 'large'] as const;
const band = (d: Dot): string => (d.value < 0.5 ? 'small' : 'large');

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 800 : 2500);
  let kinds: string[] = [...KINDS];
  let bands: string[] = [...BANDS];

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, DataFilterExtensionProps<Dot>>({
      id: 'dots',
      data,
      getPosition: (d) => d.position,
      getRadius: 9000,
      radiusMinPixels: 3,
      getFillColor: (d) => [...KIND_COLORS[d.kind]!, 230],
      // Two category columns: strings or numbers (up to 64 values each at categorySize 2)
      getFilterCategory: (d) => [d.kind, band(d)],
      // One list of allowed values per column
      filterCategories: [kinds, bands],
      // filterSize: 0 turns the numeric filter off; only categories are used
      extensions: [new DataFilterExtension({ filterSize: 0, categorySize: 2 })],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const k = Math.floor(t / 1.2);
      kinds = KINDS.filter((_, i) => (k + i) % 4 < 2);
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const note = readout(el, 'categorySize: 2, two columns: kind and size band');
    const toggle = (list: () => string[], set: (v: string[]) => void, name: string) => (v: boolean) => {
      const next = new Set(list());
      if (v) next.add(name);
      else next.delete(name);
      set([...next]);
      note.textContent = `filterCategories: [${JSON.stringify(kinds)}, ${JSON.stringify(bands)}]`;
      deck.setProps({ layers: layers() });
    };
    for (const k of KINDS) check(bar, k, true, toggle(() => kinds, (v) => (kinds = v), k));
    for (const b of BANDS) check(bar, `${b} value`, true, toggle(() => bands, (v) => (bands = v), b));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
