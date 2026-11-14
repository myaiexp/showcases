// Live runner: plays the spec in the page's context with Play/Stop and a scope
import * as Tone from 'tone';
import type { Cleanup } from '@/types.ts';
import { disposeAll } from './dispose.ts';
import { idle } from './render.ts';
import { scope } from './scope.ts';
import type { StageParts, ToneSpec } from './stage.ts';

/** Puts the page-wide Transport and Destination back the way a fresh page has them. */
function resetGlobals(): void {
  const t = Tone.getTransport();
  t.stop();
  t.cancel(0);
  t.bpm.cancelScheduledValues(0);
  t.bpm.value = 120;
  t.swing = 0;
  t.swingSubdivision = '8n';
  t.timeSignature = 4;
  t.loop = false;
  t.setLoopPoints(0, '4m');
  t.position = 0;
  const dest = Tone.getDestination();
  dest.volume.cancelScheduledValues(0);
  dest.volume.value = 0;
  dest.mute = false;
  Tone.getDraw().cancel(0);
}

export async function runLive<G>(parts: StageParts, spec: ToneSpec<G>): Promise<Cleanup> {
  const { opts, signal, visual, scopeBox, root } = parts;
  // A card render may still hold Tone's global context; nodes built now would land in it.
  await idle();
  if (signal.aborted) return () => undefined;
  const g = await spec.build();
  if (visual.childElementCount === 0) visual.style.display = 'none';

  const sc = scope(scopeBox);
  const analyser = new Tone.Analyser({ type: 'waveform', size: 1024, channels: opts.channels });
  const dest = Tone.getDestination();
  dest.connect(analyser);
  const windows = (): Float32Array[] => {
    const v = analyser.getValue();
    return Array.isArray(v) ? v : [v];
  };
  parts.setShow((time, fn) => {
    Tone.getDraw().schedule(fn, time);
  });
  parts.setSamples(() => windows()[0]!);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;width:100%';
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'btn btn-primary';
  play.style.minWidth = '96px';
  const hint = document.createElement('span');
  hint.style.cssText = 'font-size:12px;color:var(--fg-3)';
  row.append(play, hint);
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;width:100%';
  root.append(row, bar);
  spec.controls?.(g, bar);
  if (bar.childElementCount === 0) bar.remove();

  let playing = false;
  let timer = 0;
  let next = 0;
  let stopFn: ((time: number) => void) | null = null;
  const starts: number[] = [];
  const label = (): void => {
    play.textContent = playing ? '■ Stop' : `▶ ${opts.playLabel}`;
    hint.textContent = playing ? '' : 'Sound starts when you press Play.';
  };

  const pass = (): void => {
    starts.push(next);
    if (starts.length > 4) starts.shift();
    const r = spec.play(g, next);
    if (typeof r === 'function') stopFn = r;
    next += opts.seconds;
  };
  const start = async (): Promise<void> => {
    await Tone.start();
    if (signal.aborted || playing) return;
    playing = true;
    label();
    next = Tone.now() + 0.05;
    pass();
    // Each pass is scheduled a little ahead of when it is heard, so it starts on time.
    if (!stopFn) timer = window.setInterval(() => Tone.now() > next - 0.3 && pass(), 50);
  };
  const stop = (): void => {
    if (!playing) return;
    playing = false;
    clearInterval(timer);
    const now = Tone.now();
    stopFn?.(now);
    stopFn = null;
    spec.stop?.(g, now);
    Tone.getTransport().stop(now);
    Tone.getDraw().cancel(0);
    label();
  };
  play.addEventListener('click', () => void (playing ? stop() : start()));
  label();

  let raf = 0;
  const tick = (): void => {
    raf = requestAnimationFrame(tick);
    sc.draw(windows());
    if (!playing || !spec.frame) return;
    const now = Tone.immediate();
    const begun = starts.filter((s) => s <= now);
    if (begun.length) spec.frame(now - begun[begun.length - 1]!);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    stop();
    cancelAnimationFrame(raf);
    (spec.dispose ?? disposeAll)(g);
    dest.disconnect(analyser);
    analyser.dispose();
    resetGlobals();
    sc.dispose();
  };
}
