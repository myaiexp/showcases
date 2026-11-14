// TimelineWidget as a filter: points whose time is not past the slider are left out
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _TimelineWidget as TimelineWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 6, latitude: 47, zoom: ctx.preview ? 2.6 : 3.6 };
  const log = ctx.preview ? null : readout(el, 'Drag the slider: points appear outward from each centre.');
  // Each point arrives at a "day" from its distance to its cluster centre.
  const all = pointCloud(ctx.preview ? 800 : 3000, { seed: 9, spread: 1.6 });
  const day = (d: SamplePoint): number => Math.round(d.value * 100);

  const layers = (time: number) => {
    const shown = all.filter((d) => day(d) <= time);
    if (log) log.textContent = `${shown.length} of ${all.length} points have arrived by day ${time}`;
    return [
      landLayer(),
      new ScatterplotLayer<SamplePoint>({
        id: 'arrivals',
        data: shown,
        getPosition: (d) => d.position,
        getRadius: 7000,
        radiusMinPixels: 2,
        getFillColor: (d) => [255, 200 - day(d) * 1.2, 80, 220],
      }),
    ];
  };

  const timeline = new TimelineWidget({
    placement: 'bottom-left',
    timeRange: [0, 100],
    step: 2,
    initialTime: 0,
    playInterval: 120,
    loop: true,
    formatLabel: (t) => `day ${t}`,
    onTimeChange: (t) => deck.setProps({ layers: layers(t) }),
  });

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(0),
    widgets: [timeline],
  });
  // Start after the Deck exists: onTimeChange calls deck.setProps.
  if (ctx.preview) timeline.play();
  return () => {
    timeline.stop();
    stage.release(deck);
  };
};

export default mount;
