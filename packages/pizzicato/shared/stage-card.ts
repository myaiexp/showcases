// Card runner: renders each variant offline, then loops its waveform silently
import type { Cleanup } from '@/types.ts';
import { renderOffline, type Rendered } from './render.ts';
import { scope } from './scope.ts';
import type { PzSpec, StageParts } from './stage.ts';

interface Cue {
  time: number;
  fn: () => void;
}

interface Pass {
  label: string;
  audio: Rendered;
  cues: Cue[];
}

/** Window of samples the scope shows: about 23 ms at the card rate. */
const WINDOW = 512;

export async function runCard<G>(parts: StageParts, spec: PzSpec<G>): Promise<Cleanup> {
  const { opts, signal, visual, scopeBox } = parts;
  const seconds = opts.seconds;
  const variants = spec.variants?.length ? spec.variants : [null];
  const passes: Pass[] = [];

  for (const v of variants) {
    const cues: Cue[] = [];
    let built: G | undefined;
    const audio = await renderOffline(
      async (io) => {
        // Steps run while the render is suspended: what they show is replayed at their time.
        parts.setShow((fn) => cues.push({ time: io.now(), fn }));
        built = await spec.build();
        v?.apply(built);
        spec.play(built, io.at);
      },
      seconds,
      opts.channels,
      signal,
    );
    // The offline graph dies with its context; only an example's own dispose has work to do.
    if (built !== undefined) spec.dispose?.(built);
    if (!audio) return () => undefined;
    cues.sort((a, b) => a.time - b.time);
    passes.push({ label: v?.label ?? '', audio, cues });
  }
  parts.setShow(() => undefined);
  if (signal.aborted) return () => undefined;

  if (opts.hideScopeInCard && visual.childElementCount > 0) scopeBox.style.display = 'none';
  if (visual.childElementCount > 0) {
    visual.style.flex = '1 1 auto';
    if (!opts.hideScopeInCard) scopeBox.style.flex = '0 0 56px';
  } else {
    visual.style.display = 'none';
  }
  const sc = scope(scopeBox);
  const label = document.createElement('div');
  label.style.cssText =
    'position:absolute;left:10px;bottom:10px;z-index:2;padding:2px 6px;border-radius:4px;background:rgba(10,12,18,0.8);font:600 11px/1.2 ui-monospace,monospace;color:#e8ecf2;pointer-events:none';
  parts.root.style.position = 'relative';
  parts.root.append(label);

  let current: Float32Array[] = [new Float32Array(WINDOW)];
  parts.setSamples(() => current[0]!);

  // One gain for every variant, so a quieter variant is drawn quieter.
  let peak = 0.02;
  for (const p of passes) for (const ch of p.audio.channels) for (const s of ch) peak = Math.max(peak, Math.abs(s));
  const gain = 0.92 / peak;

  const t0 = performance.now();
  let lastPass = -1;
  let lastTime = -1;
  let cueAt = 0;
  let raf = 0;
  const tick = (): void => {
    raf = requestAnimationFrame(tick);
    const elapsed = (performance.now() - t0) / 1000;
    const index = Math.floor(elapsed / seconds) % passes.length;
    const time = elapsed % seconds;
    const pass = passes[index]!;
    if (index !== lastPass || time < lastTime) {
      cueAt = 0;
      if (index !== lastPass) sc.clear();
      lastPass = index;
      label.textContent = pass.label;
      label.style.display = pass.label ? '' : 'none';
    }
    lastTime = time;
    while (cueAt < pass.cues.length && pass.cues[cueAt]!.time <= time) pass.cues[cueAt++]!.fn();

    const rate = pass.audio.sampleRate;
    const end = Math.min(Math.floor(time * rate), pass.audio.channels[0]!.length);
    const start = Math.max(0, end - WINDOW);
    current = pass.audio.channels.map((ch) => ch.subarray(start, end));
    sc.draw(current, gain);
    spec.frame?.(time);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    sc.dispose();
  };
}
