// Codecs kit: a value sent there and back through a codec (wire to app value to wire again)
import * as z from 'zod';
import type { MountContext } from '@/types.ts';
import { drive } from './drive.ts';
import { pipelineView, type StepRow } from './pipeline-view.ts';
import { createStage } from './stage.ts';
import { leafText, typeWord } from './value-view.ts';
import type { Result } from './verdict.ts';
import { codeLine } from './widgets.ts';

/** Any schema, usually a z.codec: its safeDecode and safeEncode are what the trip calls. */
export type AnySchema = z.ZodType;

export interface TripSample {
  /** Button text in the full view. */
  label: string;
  /** What goes in: the wire text for "decode" (default), the in-app value for "encode". */
  value: unknown;
  dir?: 'decode' | 'encode';
  /** This sample's own codec and code line, when the example tours several. */
  codec?: AnySchema;
  code?: string;
  /** Replaces the computed caption. */
  say?: string;
}

export interface TripConfig {
  /** The codec in a few characters of code, shown above the rows. */
  code: string;
  codec: AnySchema;
  samples: readonly TripSample[];
  hint?: string;
  /** Card: ms per sample. */
  ms?: number;
}

/** Runs a codec call. A throw that is not a ZodError (a bad BigInt, a bad URI) becomes a failure too. */
export function attempt(run: () => Result): Result {
  try {
    return run();
  } catch (err) {
    const name = err instanceof Error ? err.constructor.name : 'Error';
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: { issues: [{ path: [], code: 'thrown', message: `threw ${name}: ${message}` }] } };
  }
}

export const safeDecode = (codec: AnySchema, v: unknown): Result => attempt(() => z.safeDecode(codec, v as never));
export const safeEncode = (codec: AnySchema, v: unknown): Result => attempt(() => z.safeEncode(codec, v as never));

/** Goes one way, then back the other way with whatever came out. */
export function runTrip(codec: AnySchema, value: unknown, dir: 'decode' | 'encode' = 'decode'): StepRow[] {
  const forward = dir === 'decode' ? safeDecode : safeEncode;
  const back = dir === 'decode' ? safeEncode : safeDecode;
  const first = forward(codec, value);
  const rows: StepRow[] = [{ label: dir === 'decode' ? 'decode ▸' : 'encode ▸', result: first }];
  rows.push({ label: dir === 'decode' ? '◂ encode back' : '◂ decode back', result: first.success ? back(codec, first.data) : null });
  return rows;
}

const reason = (r: Result): string => (r.success ? '' : r.error.issues[0]!.message.replace(/^Invalid input: /, ''));

/** The plain-English line for a finished trip. */
export function tripCaption(value: unknown, rows: readonly StepRow[], dir: 'decode' | 'encode'): { text: string; tone: 'ok' | 'bad' | 'warn' } {
  const [a, b] = rows.map((r) => r.result);
  const verb = dir === 'decode' ? 'decode' : 'encode';
  if (!a || !a.success) return { text: `✗ ${verb} refused it: ${a ? reason(a) : ''}`, tone: 'bad' };
  if (!b || !b.success) return { text: `✗ ${verb}d fine (${typeWord(a.data)}), but it cannot go back: ${b ? reason(b) : ''}`, tone: 'bad' };
  const same = leafText(value) === leafText(b.data);
  const done = dir === 'decode' ? 'decoded' : 'encoded';
  const undone = dir === 'decode' ? 'encoded' : 'decoded';
  return same
    ? { text: `✓ ${done} to ${typeWord(a.data)}, ${undone} back to exactly the same`, tone: 'ok' }
    : { text: `✓ the round trip works, but it came back as ${leafText(b.data)}, not ${leafText(value)}`, tone: 'warn' };
}

/** The standard codec card: a code line and the trip rows, samples cycled (card) or picked (full view). */
export function tripDemo(el: HTMLElement, ctx: MountContext, cfg: TripConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint ?? 'Pick a sample: each goes one way through the codec, then back.' });
  const code = codeLine(stage.root, cfg.code);
  const view = pipelineView(stage.root, stage, { types: true });
  drive(
    stage,
    cfg.samples.map((s) => ({ label: s.label, value: s })),
    (raw) => {
      const s = raw as TripSample;
      const dir = s.dir ?? 'decode';
      const rows = runTrip(s.codec ?? cfg.codec, s.value, dir);
      code.textContent = s.code ?? cfg.code;
      view.show(s.value, rows);
      const cap = tripCaption(s.value, rows, dir);
      stage.say(s.say ?? cap.text, cap.tone);
    },
    { ms: cfg.ms ?? 3000 },
  );
  return stage.dispose;
}
