// TimelineWidget driving a TripsLayer: the slider is the layer's currentTime
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import { _TimelineWidget as TimelineWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { trips, type Trip } from '../../shared/widgets-data.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 30, zoom: ctx.preview ? 0.4 : 1.2 };
  const data = trips(ctx.preview ? 20 : 45);

  const layers = (time: number) => [
    landLayer(),
    new TripsLayer<Trip>({
      id: 'trips',
      data,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      currentTime: time,
      trailLength: 25,
      fadeTrail: true,
      widthMinPixels: 3,
      capRounded: true,
      jointRounded: true,
    }),
  ];

  const timeline = new TimelineWidget({
    placement: 'bottom-left',
    timeRange: [0, 100],
    step: 1,
    initialTime: 0,
    playInterval: ctx.preview ? 60 : 80,
    loop: true,
    formatLabel: (t) => `t = ${t}`,
    // The slider and the play button both end up here.
    onTimeChange: (t) => deck.setProps({ layers: layers(t) }),
  });

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(0),
    widgets: [timeline],
  });
  // Start after the Deck exists: onTimeChange calls deck.setProps (autoPlay would fire it mid-constructor).
  timeline.play();

  if (!ctx.preview) {
    const bar = controlBar(el);
    button(bar, 'play()', () => timeline.play());
    button(bar, 'stop()', () => timeline.stop());
  }
  return () => {
    timeline.stop();
    stage.release(deck);
  };
};

export default mount;
