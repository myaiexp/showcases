// constructAxes: XYZ axis markers at several origins, with scale and radius sliders
import * as THREE from 'three';
import { SplatMesh, constructAxes } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.2, 1.6, 3.2], orbit: 0.3 });
  const status = ctx.preview ? null : readout(el);
  const p = { origins: 5, scale: 0.4, radius: 0.02, shadow: 2 };

  let axes: SplatMesh | null = null;
  const rebuild = (): void => {
    if (axes) {
      stage.scene.remove(axes);
      axes.dispose();
    }
    // One origin per marker: the first at the centre, the rest on a ring around it.
    const origins = [new THREE.Vector3()];
    for (let i = 1; i < p.origins; i++) {
      const angle = ((i - 1) / (p.origins - 1)) * Math.PI * 2;
      origins.push(new THREE.Vector3(Math.cos(angle) * 1.4, 0.4 * Math.sin(angle * 2), Math.sin(angle) * 1.4));
    }
    axes = new SplatMesh({
      constructSplats: (splats) =>
        constructAxes({ splats, scale: p.scale, axisRadius: p.radius, axisShadowScale: p.shadow, origins }),
    });
    stage.scene.add(axes);
    if (status) status.textContent = `${origins.length} origins x 3 axes x 2 layers = ${origins.length * 6} splats`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'origins', 1, 9, 1, p.origins, (v) => ((p.origins = v), rebuild()));
    slider(bar, 'scale', 0.1, 0.8, 0.05, p.scale, (v) => ((p.scale = v), rebuild()));
    slider(bar, 'axisRadius', 0.005, 0.06, 0.005, p.radius, (v) => ((p.radius = v), rebuild()));
    slider(bar, 'axisShadowScale', 1, 4, 0.5, p.shadow, (v) => ((p.shadow = v), rebuild()));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
