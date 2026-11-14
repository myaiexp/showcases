// _onMetrics: a once-a-second table of Deck's counters, driven by buttons
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, 'waiting for metrics...', 'bottom') : readout(el, 'waiting for the first callback (once a second)...');
  let count = 2000;
  let seed = 5;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({ id: 'points', data: pointCloud(count, { seed, spread: 2.5 }), getPosition: (d) => d.position, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70, 180], pickable: true }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    // Counters are for the last second, memory is the current total.
    _onMetrics: (m) => {
      const mb = (n: number): string => (n / 1e6).toFixed(2);
      label.textContent = ctx.preview
        ? `fps ${Math.round(m.fps)}  layers ${m.layersCount}  attr updates ${m.updateAttributesCount}`
        : [
            `fps ${Math.round(m.fps)}   frames redrawn ${m.framesRedrawn}   layers ${m.layersCount} (drawn ${m.drawLayersCount}, updated ${m.updateLayersCount})`,
            `attributes updated ${m.updateAttributesCount} in ${m.updateAttributesTime.toFixed(1)} ms   setProps ${m.setPropsTime.toFixed(1)} ms`,
            `picks ${m.pickCount} in ${m.pickTime.toFixed(1)} ms (${m.pickLayersCount} layers)`,
            `memory: buffers ${mb(m.bufferMemory)} MB  textures ${mb(m.textureMemory)} MB  GPU total ${mb(m.gpuMemory)} MB`,
          ].join('\n');
    },
    layers: layers(),
  });

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      seed++;
      count = count === 2000 ? 8000 : 2000;
      deck.setProps({ layers: layers() });
    }, 2500);
  } else {
    const bar = controlBar(el);
    button(bar, 'Regenerate the 2,000 points', () => {
      seed++;
      count = 2000;
      deck.setProps({ layers: layers() });
    });
    button(bar, 'Switch to 50,000 points', () => {
      seed++;
      count = 50_000;
      deck.setProps({ layers: layers() });
    });
    button(bar, 'Pick at the centre', () => deck.pickObject({ x: stage.box.clientWidth / 2, y: stage.box.clientHeight / 2, radius: 20 }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
