// What is inside a WAV file, and which audio formats this browser can decode
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { audioWorld, loadClip, melody, RATE, wavBytes } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'The loader decodes the file with the browser, so its formats are the browser\'s formats.' });
  const samples = melody([440, 554, 659], 0.3, 1.2);
  const bytes = wavBytes(samples);
  const loaded = await loadClip(w.stage, samples);
  if (w.stage.engine.destroyed) return w.stage.dispose;
  w.scope(loaded);
  const probe = document.createElement('audio');
  const can = (type: string): string => probe.canPlayType(type) || 'no';
  const hex = [...bytes.slice(0, 44)].map((b) => b.toString(16).padStart(2, '0'));
  const rows = [hex.slice(0, 12).join(' '), hex.slice(12, 24).join(' '), hex.slice(24, 36).join(' '), hex.slice(36, 44).join(' ')];
  panel(w.stage, 'tl').text(
    `44-byte header of ${bytes.length} bytes:\n${rows.join('\n')}\nwritten: ${samples.length} samples at ${RATE} Hz, 1 channel\nloaded:  ${(loaded.clip.duration * loaded.clip.sampleRate).toFixed(0)} samples at ${loaded.clip.sampleRate} Hz, ${loaded.clip.channels} channel\ncanPlayType  wav: ${can('audio/wav')}   mp3: ${can('audio/mpeg')}   ogg: ${can('audio/ogg; codecs="vorbis"')}`,
  );
  return w.stage.dispose;
};

export default mount;
