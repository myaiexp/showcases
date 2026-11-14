// enableViewToObject: an object-space modifier that reads the camera's position
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 3], orbit: ctx.preview ? false : 0.2 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // context.viewToObject maps view space into the mesh's object space; its `translate`
  // is the camera position in object coordinates. It is only kept current on request.
  knot.enableViewToObject = true;

  const radius = dyno.dynoFloat(2.3);
  const flashlight = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { center, rgb, scales } = dyno.splitGsplat(gsplat).outputs;
    // Distance from this splat to the camera, measured in the mesh's own space.
    const dist = dyno.distance(center, knot.context.viewToObject.translate);
    const lit = dyno.sub(dyno.dynoConst('float', 1), dyno.smoothstep(radius, dyno.add(radius, dyno.dynoConst('float', 1.2)), dist));
    const dim = dyno.mix(dyno.dynoConst('float', 0.2), dyno.dynoConst('float', 1), lit);
    // Near splats also swell a little, as if lit from the viewer's side.
    const grow = dyno.add(dyno.dynoConst('float', 0.7), dyno.mul(dyno.dynoConst('float', 0.6), lit));
    return { gsplat: dyno.combineGsplat({ gsplat, rgb: dyno.mul(rgb, dim), scales: dyno.mul(scales, grow) }) };
  });
  knot.objectModifiers = [flashlight];
  knot.updateGenerator();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'lit radius', 1, 4, 0.1, radius.value, (v) => (radius.value = v));
  }

  stage.run((time, dt) => {
    // Turning the mesh moves the camera in object space, which is what the modifier reads.
    knot.rotation.y += dt * 0.5;
    knot.rotation.x = Math.sin(time * 0.4) * 0.5;
    // Uniform edits do not dirty the mesh; viewToObject changes do on their own.
    knot.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
