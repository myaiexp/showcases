// A looping sound attached to an orbiting mesh, heard through a listener on the camera
import {
  ArcRotateCamera,
  Color3,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { bounce } from '../../shared/tones.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 0.9, 16, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

  // The emitter: a sphere with a nose cone, so its facing direction is visible.
  const emitter = MeshBuilder.CreateSphere('emitter', { diameter: 1 }, scene);
  const nose = MeshBuilder.CreateCylinder('nose', { diameterTop: 0, diameterBottom: 0.6, height: 0.8 }, scene);
  nose.rotation.x = Math.PI / 2;
  nose.position.z = 0.7;
  nose.parent = emitter;
  const mat = new StandardMaterial('emitter', scene);
  mat.diffuseColor = new Color3(1, 0.55, 0.2);
  emitter.material = mat;
  nose.material = mat;

  const audioEngine = await CreateAudioEngineAsync({ defaultUIParentElement: el, volume: 0.8 });
  // There is one listener per engine; attaching it to the camera makes it follow the view.
  audioEngine.listener.attach(camera);

  // spatialEnabled up front avoids the small delay of enabling spatial audio on first use.
  const sound = await CreateSoundAsync('bounce', bounce(0.5), {
    loop: true,
    spatialEnabled: true,
    spatialMaxDistance: 30,
  });
  // Position and rotation follow the mesh every frame.
  sound.spatial.attach(emitter);
  sound.play();

  let radius = 5;
  let speed = 0.6;
  let angle = 0;
  const panel = createPanel(el);
  panel.slider('orbit radius', 1, 9, 0.5, radius, (v) => (radius = v));
  panel.slider('orbit speed', 0, 2, 0.1, speed, (v) => (speed = v));
  panel.select('distanceModel', ['linear', 'inverse', 'exponential'] as const, sound.spatial.distanceModel, (v) => (sound.spatial.distanceModel = v));
  panel.select('panningModel', ['equalpower', 'HRTF'] as const, sound.spatial.panningModel, (v) => (sound.spatial.panningModel = v));
  panel.row();
  panel.slider('rolloffFactor', 0, 4, 0.1, sound.spatial.rolloffFactor, (v) => (sound.spatial.rolloffFactor = v));
  // A directional source: full volume inside the inner cone, coneOuterVolume outside the outer one.
  panel.slider('coneInnerAngle (°)', 0, 360, 5, 360, (v) => (sound.spatial.coneInnerAngle = (v * Math.PI) / 180));
  panel.slider('coneOuterAngle (°)', 0, 360, 5, 360, (v) => (sound.spatial.coneOuterAngle = (v * Math.PI) / 180));
  panel.slider('coneOuterVolume', 0, 1, 0.05, sound.spatial.coneOuterVolume, (v) => (sound.spatial.coneOuterVolume = v));

  stage.run(() => {
    angle += (speed * scene.getEngine().getDeltaTime()) / 1000;
    emitter.position.set(Math.cos(angle) * radius, 0.8, Math.sin(angle) * radius);
    // Face along the orbit so the cone sweeps past the listener.
    emitter.rotation.y = -angle;
  });

  return () => {
    sound.dispose();
    audioEngine.dispose();
    stage.dispose();
  };
};

export default mount;
