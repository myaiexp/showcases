// Recorder: play a phrase into it, stop() hands back an audio Blob
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { keyboard } from '../../shared/widgets.ts';

const PHRASE = ['C4', 'E4', 'G4', 'C5', 'G4', 'E4'];
const STEP = 0.4;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'C5');
  const status = readout(stage.visual, '');
  status.style.textAlign = 'center';
  const say = (text: string): void => {
    status.textContent = text;
  };
  const phrase = (synth: Tone.Synth, time: number): void =>
    PHRASE.forEach((note, i) => {
      synth.triggerAttackRelease(note, STEP * 0.8, time + i * STEP);
      stage.show(time + i * STEP, () => keys.press(note, 0.3));
    });

  // Everything the full view creates for a recording, so cleanup can undo it.
  let timer = 0;
  let recorder: Tone.Recorder | null = null;
  let url = '';
  let results: HTMLElement | null = null;

  const cleanupRecording = (synth?: Tone.Synth): void => {
    clearTimeout(timer);
    if (recorder) {
      if (synth) synth.disconnect(recorder);
      recorder.dispose();
      recorder = null;
    }
    if (url) URL.revokeObjectURL(url);
    url = '';
    results?.remove();
    results = null;
  };

  const run = stage.run({
    build: () => new Tone.Synth({ envelope: { attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.2 } }).toDestination(),
    play: (synth, time) => {
      phrase(synth, time);
      // A card is silent and has no Recorder to run, so it only sketches the steps.
      if (stage.preview) {
        stage.show(time, () => say('card stand-in: the full view records for real'));
        stage.show(time + 0.2, () => say('recorder.start() ... the phrase plays'));
        stage.show(time + PHRASE.length * STEP + 0.1, () => say('recorder.stop() gives back a Blob'));
      }
    },
    stop: (synth, time) => synth.triggerRelease(time),
    controls: (synth, bar) => {
      if (!Tone.Recorder.supported) {
        say('This browser has no MediaRecorder, so Tone.Recorder is unavailable.');
        return;
      }
      say('Press Record, then listen to what was captured.');
      let busy = false;
      const rec = button(bar, '● Record the phrase', async () => {
        if (busy) return;
        busy = true;
        rec.disabled = true;
        cleanupRecording(synth);
        let r: Tone.Recorder;
        try {
          await Tone.start();
          if (stage.signal.aborted) return;
          r = recorder = new Tone.Recorder();
          synth.connect(r);
        } catch (e) {
          say(`Could not start recording: ${e instanceof Error ? e.message : String(e)}`);
          cleanupRecording(synth);
          busy = false;
          rec.disabled = false;
          return;
        }
        // The browser reports "started" only once sound flows into the stream, so the phrase
        // is already playing before we wait on it.
        const started = r.start();
        say('recording...');
        phrase(synth, Tone.now() + 0.2);
        timer = window.setTimeout(async () => {
          await Promise.race([started, new Promise((done) => setTimeout(done, 3000))]);
          const blob = await r.stop();
          synth.disconnect(r);
          r.dispose();
          recorder = null;
          url = URL.createObjectURL(blob);
          results = document.createElement('div');
          results.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center';
          const audio = Object.assign(document.createElement('audio'), { controls: true, src: url });
          const link = Object.assign(document.createElement('a'), {
            href: url,
            download: blob.type.includes('ogg') ? 'phrase.ogg' : 'phrase.webm',
            textContent: `Download (${Math.max(1, Math.round(blob.size / 1024))} KB, ${blob.type || 'audio'})`,
          });
          results.append(audio, link);
          bar.append(results);
          say('stop() returned a Blob: play it back or download it.');
          busy = false;
          rec.disabled = false;
        }, (PHRASE.length * STEP + 0.7) * 1000);
      });
    },
  });
  return run.then((c) => () => {
    cleanupRecording();
    c();
  });
};

export default mount;
