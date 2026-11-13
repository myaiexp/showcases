// Tone.Sequence step sequencer with play/stop, clear and a tempo slider
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import './style.css';

const NOTES = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'] as const;
const STEPS = [0, 1, 2, 3, 4, 5, 6, 7];

const mount: Mount = (el) => {
  const transport = Tone.getTransport();
  const active: boolean[] = NOTES.map(() => false);
  const cells: HTMLElement[] = [];

  const seq = document.createElement('div');
  seq.className = 'seq';
  NOTES.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.className = 'step';
    cell.addEventListener('click', () => {
      active[i] = !active[i];
      cell.classList.toggle('on', active[i]);
    });
    seq.append(cell);
    cells.push(cell);
  });

  const bar = document.createElement('div');
  bar.className = 'transport';
  const play = document.createElement('button');
  play.className = 'btn';
  play.textContent = 'Play';
  const clear = document.createElement('button');
  clear.className = 'btn';
  clear.textContent = 'Clear';
  const tempo = document.createElement('label');
  tempo.className = 'field';
  const bpmText = document.createElement('span');
  bpmText.textContent = '120 BPM';
  const bpm = document.createElement('input');
  bpm.type = 'range';
  bpm.min = '60';
  bpm.max = '200';
  bpm.value = '120';
  tempo.append('tempo ', bpmText, bpm);
  bar.append(play, clear, tempo);
  el.append(seq, bar);

  const poly = new Tone.PolySynth(Tone.Synth).toDestination();
  poly.volume.value = -6;
  const sequence = new Tone.Sequence<number>((time, step) => {
    if (active[step]) poly.triggerAttackRelease(NOTES[step] ?? 'C4', '8n', time);
    Tone.getDraw().schedule(() => {
      cells.forEach((c, i) => c.classList.toggle('cursor', i === step));
    }, time);
  }, STEPS, '8n');
  sequence.start(0);

  const clearCursor = () => cells.forEach((c) => c.classList.remove('cursor'));

  play.addEventListener('click', async () => {
    await Tone.start();
    if (transport.state === 'started') {
      transport.stop();
      play.textContent = 'Play';
      clearCursor();
    } else {
      transport.start();
      play.textContent = 'Stop';
    }
  });
  clear.addEventListener('click', () => {
    active.fill(false);
    cells.forEach((c) => c.classList.remove('on'));
  });
  bpm.addEventListener('input', () => {
    transport.bpm.value = Number(bpm.value);
    bpmText.textContent = `${bpm.value} BPM`;
  });

  return () => {
    sequence.dispose();
    transport.stop();
    transport.cancel();
    transport.bpm.value = 120;
    poly.releaseAll();
    poly.dispose();
  };
};

export default mount;
