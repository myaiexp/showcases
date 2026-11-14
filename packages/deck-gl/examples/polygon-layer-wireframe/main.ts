// PolygonLayer wireframe: edge lines of extruded polygons, alone or over a layer
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { HOME, blocks, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Mode = 'wireframe' | 'solid' | 'both layers';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.3 : 12.9, pitch: 55, bearing: 20 };
  const data = blocks(6, 5);

  const layers = (mode: Mode): PolygonLayer<Block>[] => {
    const out: PolygonLayer<Block>[] = [];
    if (mode !== 'wireframe') {
      out.push(
        new PolygonLayer<Block>({
          id: 'solid',
          data,
          getPolygon: (d) => d.polygon,
          extruded: true,
          getElevation: (d) => d.height,
          getFillColor: [40, 70, 120],
        }),
      );
    }
    if (mode !== 'solid') {
      out.push(
        new PolygonLayer<Block>({
          id: 'wires',
          data,
          getPolygon: (d) => d.polygon,
          extruded: true,
          // Needs extruded: true. Draws the top and bottom outlines plus one strut per vertex.
          wireframe: true,
          getElevation: (d) => d.height,
          // Wireframe lines take getLineColor, and are always one pixel wide.
          getLineColor: [120, 220, 255],
        }),
      );
    }
    return out;
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers('wireframe'),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Mode[] = ['wireframe', 'both layers', 'solid'];
    stop = animate((t) =>
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: 20 + t * 10 }, layers: layers(modes[Math.floor(t / 2.5) % 3]!) }),
    );
  } else {
    const bar = controlBar(el);
    select(bar, 'render', ['wireframe', 'solid', 'both layers'] as const, (v) => deck.setProps({ layers: layers(v) }), 'wireframe');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
