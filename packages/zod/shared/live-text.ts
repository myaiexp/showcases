// Transforms kit: a text field whose text goes through a schema, input and output side by side
import type { MountContext } from '@/types.ts';
import { checkpoint } from './checkpoint.ts';
import { textField, typeLoop } from './field.ts';
import { createStage } from './stage.ts';
import type { Result } from './verdict.ts';
import { codeLine } from './widgets.ts';

/** A safeParse result whose data is typed as T. */
export type TypedResult<T> = Extract<Result, { success: false }> | { success: true; data: T };

export interface LiveTextConfig<T> {
  code: string;
  schema: { safeParse(input: unknown): TypedResult<T> };
  /** One-click tries in the full view. */
  samples: readonly string[];
  /** Texts a card types out. Default: the first three samples. */
  typed?: readonly string[];
  hint?: string;
  label?: string;
  placeholder?: string;
  types?: boolean;
  /** The plain-English line for this text and its result. */
  say: (text: string, result: TypedResult<T>) => string;
}

/** A field checked on every keystroke; the checkpoint under it shows what the schema made of the text. */
export function liveText<T>(el: HTMLElement, ctx: MountContext, cfg: LiveTextConfig<T>): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint ?? 'Type anything: it goes through the schema on every keystroke.' });
  codeLine(stage.root, cfg.code);
  const field = textField(stage.root, stage, { label: cfg.label, placeholder: cfg.placeholder, tries: cfg.samples, quiet: true });
  const check = checkpoint(stage.root, stage, { stacked: false, types: cfg.types, inTitle: 'You typed', outTitle: 'Zod made', pass: 'Parsed', fail: 'Rejected' });
  field.onInput((text) => {
    const result = cfg.schema.safeParse(text);
    check.show(text, result);
    stage.say(cfg.say(text, result), result.success ? 'ok' : 'bad');
  });
  field.set(stage.preview ? '' : cfg.samples[0] ?? '');
  typeLoop(stage, field, cfg.typed ?? cfg.samples.slice(0, 3));
  return stage.dispose;
}
