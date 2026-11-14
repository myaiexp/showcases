// Sound component slots: loop, overlap, start time, duration, volume and pitch
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createSoundAssets, join, loadAudio, note } from '../../shared/audio.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 6, pitch: -20, autoRotate: 10 }, floor: 8 });
  const { app } = scene;
  const assets = createSoundAssets();

  // Three notes of 0.5 s each in one clip: C5, E5, G5, then a longer low tone for the loop.
  const phrase = join(note(523.25, 0.5), note(659.25, 0.5), note(783.99, 0.5));
  const bed = join(note(130.81, 1), note(196, 1));
  const [phraseAsset, bedAsset] = await Promise.all([loadAudio(app, 'phrase', phrase, assets), loadAudio(app, 'bed', bed, assets)]);

  if (ctx.signal.aborted) {
    scene.dispose();
    assets.dispose();
    return () => {};
  }

  const speaker = addShape(app.root, 'box', material('#a78bfa'), [0, 0.8, 0], [1.2, 1.6, 1.2]);
  speaker.addComponent('sound', { positional: false, volume: 0.8, pitch: 1 });
  const sound = speaker.sound!;
  // Every slot plays a section of an audio asset and is controlled independently.
  sound.addSlot('bed', { asset: bedAsset.id, loop: true, volume: 0.5 });
  sound.addSlot('phrase', { asset: phraseAsset.id });
  sound.addSlot('middle-note', { asset: phraseAsset.id, startTime: 0.5, duration: 0.5, overlap: true });
  sound.addSlot('pitched', { asset: phraseAsset.id, startTime: 1, duration: 0.5, overlap: true, pitch: 0.5 });

  // The box pulses with the slots that are playing.
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const playing = Object.keys(sound.slots).filter((n) => sound.isPlaying(n)).length;
    const s = 1 + Math.sin(t * 8) * 0.05 * playing;
    speaker.setLocalScale(1.2 * s, 1.6, 1.2 * s);
  });

  const panel = createPanel(el);
  panel.button('play bed (loop)', () => sound.play('bed'));
  panel.button('stop bed', () => sound.stop('bed'));
  panel.button('play phrase', () => sound.play('phrase'));
  panel.button('middle note (overlap)', () => sound.play('middle-note'));
  panel.button('pitched G (pitch 0.5)', () => sound.play('pitched'));
  panel.row();
  panel.slider('component volume', 0, 1, 0.01, 0.8, (v) => (sound.volume = v));
  panel.slider('component pitch', 0.5, 2, 0.01, 1, (v) => (sound.pitch = v));
  panel.check('bed loop', true, (on) => (sound.slot('bed')!.loop = on));
  panel.row();
  const out = panel.readout();
  app.on('update', () => (out.textContent = `playing: ${Object.keys(sound.slots).filter((n) => sound.isPlaying(n)).join(', ') || 'none'}`));

  return () => {
    sound.stop();
    scene.dispose();
    assets.dispose();
  };
};

export default mount;
