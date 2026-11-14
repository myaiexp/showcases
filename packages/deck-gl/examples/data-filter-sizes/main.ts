// DataFilterExtension filterSize 1 to 4: filter on several numbers at once
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Size = 1 | 2 | 3 | 4;
const NAMES = ['time', 'value', 'west to east', 'south to north'] as const;
// Four numbers per dot, each scaled to 0..100
const filterValue = (d: Dot): number[] => [d.time, d.value * 100, ((d.position[0] + 10) / 35) * 100, ((d.position[1] - 35) / 25) * 100];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 900 : 3000, 6, 2.2);
  let size: Size = ctx.preview ? 2 : 1;
  let ranges: [number, number][] = [[10, 90], [10, 90], [10, 90], [10, 90]];

  const layers = () => {
    const r = ranges.slice(0, size);
    return [
      landLayer(),
      new ScatterplotLayer<Dot, DataFilterExtensionProps<Dot>>({
        // A new filterSize means a new extension and new attributes: give the layer a new id
        id: `dots-${size}`,
        data,
        getPosition: (d) => d.position,
        getRadius: 9000,
        radiusMinPixels: 2.5,
        getFillColor: [255, 170, 70, 230],
        // filterSize 1: a number. 2 to 4: an array with that many numbers.
        getFilterValue: (d) => (size === 1 ? filterValue(d)[0]! : filterValue(d).slice(0, size)),
        // filterSize 1: [min, max]. 2 to 4: one [min, max] per number.
        filterRange: size === 1 ? r[0]! : r,
        extensions: [new DataFilterExtension({ filterSize: size })],
      }),
    ];
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      ranges = [[20 + 25 * Math.sin(t), 80 + 15 * Math.sin(t)], [10 + 20 * Math.sin(t * 0.7), 95], [0, 100], [0, 100]];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const sliders = document.createElement('div');
    sliders.style.display = 'contents';
    const note = readout(el);
    const build = (): void => {
      sliders.replaceChildren();
      note.textContent = `filterSize: ${size}, filtering by ${NAMES.slice(0, size).join(', ')}`;
      for (let i = 0; i < size; i++) {
        slider(sliders, `${NAMES[i]} min`, 0, 100, 1, ranges[i]![0], (v) => {
          ranges[i] = [v, Math.max(v, ranges[i]![1])];
          deck.setProps({ layers: layers() });
        });
        slider(sliders, `max`, 0, 100, 1, ranges[i]![1], (v) => {
          ranges[i] = [Math.min(v, ranges[i]![0]), v];
          deck.setProps({ layers: layers() });
        });
      }
    };
    select(bar, 'filterSize', ['1', '2', '3', '4'], (v) => {
      size = Number(v) as Size;
      build();
      deck.setProps({ layers: layers() });
    }, '1');
    build();
    bar.append(sliders);
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
