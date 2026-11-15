// Popup anchor (where the arrow sits) and offsets (a pixel nudge)
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
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

  // A crosshair at the anchor point: the popup is anchored to the middle of the map.
  const cross = document.createElement('div');
  cross.style.cssText = 'position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px;border:2px solid #ffd166;border-radius:50%;z-index:3;pointer-events:none';
  stage.container.append(cross);
  stage.own(() => cross.remove());

  const popup = addPopup(
    stage,
    scene,
    new Popup({ lngLat: { lng: EUROPE_CENTER[0], lat: EUROPE_CENTER[1] }, text: 'anchored here', closeButton: false, closeOnClick: false, anchor: 'bottom', offsets: [0, 0] }),
  );
  const state: { anchor: Anchor; x: number; y: number } = { anchor: 'bottom', x: 0, y: 0 };
  const apply = (): void => {
    popup.setOptions({ anchor: state.anchor, offsets: [state.x, state.y] });
    const out = stage.readout();
    if (out) out.textContent = `anchor: '${state.anchor}', offsets: [${state.x}, ${state.y}]\nThe yellow ring is the lng/lat; the arrow tip sits on the side named by anchor.`;
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'anchor', ANCHORS, 'bottom', (v) => ((state.anchor = v), apply()));
    slider(stage.bar, 'offsets x', [-40, 40, 2], 0, (v) => ((state.x = v), apply()));
    slider(stage.bar, 'offsets y', [-40, 40, 2], 0, (v) => ((state.y = v), apply()));
  } else {
    stage.every(1000, (i) => {
      state.anchor = ANCHORS[i % ANCHORS.length] ?? 'bottom';
      state.x = i % 3 === 2 ? 14 : 0;
      state.y = i % 3 === 2 ? -10 : 0;
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
