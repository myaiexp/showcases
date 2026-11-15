// OrthoControl on an orthographic camera: drag to pan, wheel to zoom
import { PrimitiveMesh } from '@galacean/engine';
import { OrthoControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick, unlit } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 10], target: [0, 0, 0], light: false, hint: 'Drag to pan, wheel to zoom.' });
  const say = caption(stage);
  camera.isOrthographic = true;
  camera.orthographicSize = 4;
  const tile = PrimitiveMesh.createPlane(engine, 0.9, 0.9);
  for (let x = -9; x <= 9; x++) {
    for (let y = -6; y <= 6; y++) {
      const t = add(root, tile, unlit(engine, [0.25 + 0.03 * ((x + 9) % 8) , 0.35 + 0.04 * ((y + 6) % 6), 0.7 - 0.03 * ((x + y + 15) % 7)]), [x, y, 0], 'tile');
      t.entity.transform.setRotation(90, 0, 0);
    }
  }
  if (stage.preview) {
    tick(camera.entity, (_dt, t) => {
      camera.orthographicSize = 3.5 + 1.5 * Math.sin(t * 0.7);
      camera.entity.transform.setPosition(Math.sin(t * 0.4) * 4, Math.cos(t * 0.3) * 2.5, 10);
      say(`orthographicSize ${camera.orthographicSize.toFixed(1)}`);
    });
  } else {
    const control = camera.entity.addComponent(OrthoControl);
    control.zoomSpeed = 1;
    slider(stage.bar, 'zoomSpeed', 0.2, 4, 0.1, 1, (v) => (control.zoomSpeed = v));
  }
  return stage.dispose;
};

export default mount;
