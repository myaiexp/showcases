// Marker anchor and offsets: which point of the element sits on the lng/lat, and a pixel nudge
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, badge, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const ANCHORS = ['center', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'] as const;
type Anchor = (typeof ANCHORS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const cross = document.createElement('div');
  cross.style.cssText = 'position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border:2px solid #ff6b6b;border-radius:50%;z-index:3;pointer-events:none';
  stage.container.append(cross);
  stage.own(() => cross.remove());

  // The marker stays at the map centre; the red ring is its lng/lat.
  const make = (anchor: Anchor, x: number, y: number): Marker =>
    // The types declare anchor as an internal enum, but the docs' strings are what it takes.
    new Marker({ element: badge('marker element', '#ffd166'), anchor: anchor as never, offsets: [x, y] }).setLnglat({ lng: EUROPE_CENTER[0], lat: EUROPE_CENTER[1] });
  const state: { anchor: Anchor; x: number; y: number } = { anchor: 'center', x: 0, y: 0 };
  let marker = addMarker(stage, scene, make('center', 0, 0));
  const apply = (): void => {
    // anchor and offsets are constructor options: rebuild the marker with the new ones.
    marker.remove();
    marker = addMarker(stage, scene, make(state.anchor, state.x, state.y));
    const out = stage.readout();
    if (out) out.textContent = `anchor: '${state.anchor}', offsets: [${state.x}, ${state.y}], getOffset(): [${marker.getOffset().join(', ')}]`;
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'anchor', ANCHORS, 'center', (v) => ((state.anchor = v), apply()));
    slider(stage.bar, 'offsets x', [-40, 40, 2], 0, (v) => ((state.x = v), apply()));
    slider(stage.bar, 'offsets y', [-40, 40, 2], 0, (v) => ((state.y = v), apply()));
  } else {
    stage.every(1000, (i) => {
      state.anchor = ANCHORS[i % ANCHORS.length] ?? 'center';
      state.x = i % 3 === 2 ? 12 : 0;
      state.y = i % 3 === 2 ? -12 : 0;
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
