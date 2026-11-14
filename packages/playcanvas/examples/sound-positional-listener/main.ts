// Positional sound: an audiolistener on the camera and a source circling it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createSoundAssets, join, loadAudio, note } from '../../shared/audio.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const MODELS = { linear: pc.DISTANCE_LINEAR, inverse: pc.DISTANCE_INVERSE, exponential: pc.DISTANCE_EXPONENTIAL } as const;

const mount: Mount = async (el, ctx) => {
  // The orbit camera is the listener: it hears the world from where it is.
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -50, autoRotate: 0 }, floor: 22 });
  const { app, camera } = scene;
  camera.addComponent('audiolistener');
  const assets = createSoundAssets();

  const beep = join(note(660, 0.18, 0.6), new Float32Array(2205), note(880, 0.18, 0.6), new Float32Array(6000));
  const asset = await loadAudio(app, 'beep', beep, assets);
  if (ctx.signal.aborted) {
    scene.dispose();
    assets.dispose();
    return () => {};
  }

  // A listener marker at the centre, and a speaker that circles it.
  addShape(app.root, 'sphere', material('#7bc67b'), [0, 0.3, 0], 0.6, 'listener');
  const source = addShape(app.root, 'sphere', material('#000000', { emissive: '#ffb347' }), [4, 0.5, 0], 0.7, 'source');
  source.addComponent('sound', { positional: true, refDistance: 1, maxDistance: 12, rollOffFactor: 1, distanceModel: pc.DISTANCE_INVERSE });
  const sound = source.sound!;
  sound.addSlot('beep', { asset: asset.id, loop: true, autoPlay: false });

  let radius = 4;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    source.setPosition(Math.cos(t * 0.8) * radius, 0.5, Math.sin(t * 0.8) * radius);
  });

  const panel = createPanel(el);
  panel.button('play', () => sound.play('beep'));
  panel.button('stop', () => sound.stop('beep'));
  panel.select('distanceModel', Object.keys(MODELS) as (keyof typeof MODELS)[], 'inverse', (v) => (sound.distanceModel = MODELS[v]));
  panel.row();
  panel.slider('orbit radius', 1, 10, 0.1, radius, (v) => (radius = v));
  panel.slider('refDistance', 0.5, 6, 0.1, 1, (v) => (sound.refDistance = v));
  panel.slider('maxDistance', 2, 30, 0.5, 12, (v) => (sound.maxDistance = v));
  panel.slider('rollOffFactor', 0, 4, 0.1, 1, (v) => (sound.rollOffFactor = v));
  panel.row();
  panel.check('positional', true, (on) => (sound.positional = on));
  panel.readout('Drag the view to move the listening camera; the source circles the green marker. Use headphones for the panning.');

  return () => {
    sound.stop();
    scene.dispose();
    assets.dispose();
  };
};

export default mount;
