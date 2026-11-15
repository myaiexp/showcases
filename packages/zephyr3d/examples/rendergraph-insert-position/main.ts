// Where a module sits in the pipeline: outlines before the sky and fog, after them, or at either end
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  createForwardPlusPipeline,
  ForwardPlusModules,
  getEngine,
  getInput,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
} from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { createOutlineModule, outlineScene, type OutlineModule } from '../../shared/rg-outline.ts';

const PLACES = ['after LightPass', 'after SkyPass', 'append', 'prepend'] as const;
type Place = (typeof PLACES)[number];

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const { box, sphere, torus } = outlineScene(scene);
  // Height fog is composited by SkyPass: an outline drawn before it is fogged, one drawn after is not
  scene.env.sky.fogType = 'height_fog';
  scene.env.sky.heightFogDensity = 0.05;

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 200);
  scene.mainCamera.lookAt(new Vector3(0, 6, 34), new Vector3(0, -1, 0), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, -1, 0) });
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  // A module belongs to one pipeline, so each placement gets its own pipeline and module
  const modules = new Map<Place, OutlineModule>();
  const pipelines = new Map<Place, ReturnType<typeof createForwardPlusPipeline>>();
  for (const place of PLACES) {
    const module = createOutlineModule('MyOutline');
    module.outlineColor.setXYZ(1, 0.1, 0.1);
    const pipeline = createForwardPlusPipeline();
    if (place === 'after LightPass') pipeline.insertAfter(ForwardPlusModules.LightPass, module);
    else if (place === 'after SkyPass') pipeline.insertAfter(ForwardPlusModules.SkyPass, module);
    else if (place === 'append') pipeline.append(module);
    else pipeline.prepend(module);
    modules.set(place, module);
    pipelines.set(place, pipeline);
  }
  let place: Place = stage.preview ? 'after SkyPass' : 'after LightPass';
  const apply = (): void => {
    scene.mainCamera!.renderPipeline = pipelines.get(place)!;
  };
  apply();
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromAxisAngle(Vector3.axisPX(), ms * 0.0008);
    sphere.position.y = -2 + Math.sin(ms * 0.0012) * 1.2;
    box.rotation.fromAxisAngle(Vector3.axisPY(), ms * 0.0005);
  });

  const out = stage.readout();
  const show = (): void => {
    const pipeline = pipelines.get(place)!;
    const m = modules.get(place)!;
    if (out) {
      out.textContent = `authored order: ${pipeline.modules.map((x) => x.type).join(' > ')}\nMyOutline has run ${m.frames} frames`;
    }
  };
  if (stage.bar) {
    select(stage.bar, 'place', PLACES, place, (v) => {
      place = v;
      apply();
      show();
    });
    slider(stage.bar, 'fog density', [0, 0.3, 0.01], 0.05, (v) => (scene.env.sky.heightFogDensity = v));
    stage.every(500, show);
  } else {
    stage.caption('insertAfter(SkyPass, outline): drawn over the sky and fog');
    stage.every(2500, (i) => {
      place = PLACES[i % PLACES.length]!;
      apply();
      stage.caption(`module placed: ${place}`);
    });
  }
  myApp.run();
});
