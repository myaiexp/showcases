// ScrollbarWidget: scroll an OrthographicView over a wide content area, with decorations
import { COORDINATE_SYSTEM, Deck, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ScrollbarWidget } from '@deck.gl/widgets';
import type { ContentBounds } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Dot {
  position: [number, number];
  color: [number, number, number];
}

const WIDTH = 3000;
const HEIGHT = 700;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const log = ctx.preview ? null : readout(el, 'Use the scrollbars: arrows step, the track pages, the coloured marks jump.');
  let viewState: OrthographicViewState = { target: [300, 250, 0], zoom: 0 };

  // A grid of coloured dots filling the content area.
  const data: Dot[] = [];
  for (let x = 0; x < WIDTH; x += 40) {
    for (let y = 0; y < HEIGHT; y += 40) {
      data.push({ position: [x + 20, y + 20], color: [(x / WIDTH) * 255, 140 + (y / HEIGHT) * 100, 255 - (x / WIDTH) * 200] });
    }
  }
  const contentBounds: ContentBounds = [[0, 0, 0], [WIDTH, HEIGHT, 0]];

  const deck: Deck<OrthographicView> = new Deck<OrthographicView>({
    device: stage.device,
    views: new OrthographicView({ id: 'ortho' }),
    viewState,
    // Wheel zoom would fight the scrollbars: scroll only.
    controller: ctx.preview ? false : { scrollZoom: false },
    onViewStateChange: ({ viewState: next }) => {
      viewState = next as OrthographicViewState;
      deck.setProps({ viewState });
    },
    layers: [
      new ScatterplotLayer<Dot>({
        id: 'dots',
        data,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getPosition: (d) => d.position,
        getRadius: 14,
        getFillColor: (d) => d.color,
      }),
    ],
    // ScrollbarWidget is typed for a views-less Deck, so the OrthographicView deck needs a cast.
    widgets: [
      new ScrollbarWidget({
        id: 'horizontal',
        viewId: 'ortho',
        orientation: 'horizontal',
        contentBounds,
        stepSize: 80,
        pageSize: 400,
        captureWheel: true,
        decorations: [
          {
            contentBounds: [[1200, 0, 0], [1400, HEIGHT, 0]],
            color: 'rgba(255, 90, 90, 0.9)',
            title: 'Jump to x = 1200',
            onClick: () => {
              viewState = { ...viewState, target: [1300, viewState.target?.[1] ?? 250, 0] };
              deck.setProps({ viewState });
              if (log) log.textContent = 'decoration onClick: jumped to x = 1300';
              return true; // handled: skip the default track click
            },
          },
          { contentBounds: [[2400, 0, 0], [2500, HEIGHT, 0]], color: 'rgba(120, 220, 120, 0.9)', title: 'Green zone' },
        ],
      }) as never,
      new ScrollbarWidget({
        id: 'vertical',
        viewId: 'ortho',
        orientation: 'vertical',
        contentBounds,
      }) as never,
    ],
  });

  const stop = ctx.preview
    ? animate((t) => {
        viewState = { target: [900 + Math.sin(t * 0.5) * 600, 350 + Math.sin(t * 0.8) * 120, 0], zoom: 0 };
        deck.setProps({ viewState });
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
