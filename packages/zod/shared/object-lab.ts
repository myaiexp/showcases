// One payload run through several object schemas, cycled or picked
import './object-lab.css';
import type { Stage } from './stage.ts';
import { checkpoint } from './checkpoint.ts';
import { select } from './controls.ts';
import { drive, type Sample } from './drive.ts';
import { diffMarks, pathText } from './paths.ts';
import type { Result } from './verdict.ts';
import { codeLine, plural } from './widgets.ts';

export interface ObjectVariant {
  /** Menu text in the full view. */
  label: string;
  /** The schema in code, shown above the panes. */
  code: string;
  schema: { safeParse(input: unknown): Result };
  /** The plain-English line for this outcome; default is a pass or an issue count. */
  say?: (result: Result, input: unknown) => string;
}

export interface ObjectLabOptions {
  hint?: string;
  /** Card: which (variant, sample) pairs to step through. Default: every variant, first sample. */
  plan?: readonly (readonly [variant: number, sample: number])[];
  /** Card: ms per step. */
  ms?: number;
  /** Full view: show an editable JSON copy of the sample. Off for values JSON cannot hold. */
  editor?: boolean;
  /** Title of the left and right panes. */
  inTitle?: string;
  outTitle?: string;
  /** Write each issue's message under its field. Default: full view only. */
  messages?: boolean;
}

/** Draws the code line and the input/result panes; returns a function that shows (variant, sample). */
export function objectLab(
  stage: Stage,
  variants: readonly ObjectVariant[],
  samples: readonly Sample[],
  opts: ObjectLabOptions = {},
): (variant: number, sample: number) => void {
  const code = codeLine(stage.root, '');
  const check = checkpoint(stage.root, stage, {
    label: 'safeParse',
    inTitle: opts.inTitle,
    outTitle: opts.outTitle,
    messages: opts.messages ?? !stage.preview,
  });
  check.el.classList.add('ol-lab');
  let vi = 0;
  let input: unknown = samples[0]?.value;

  const render = (): void => {
    const v = variants[vi]!;
    code.textContent = v.code;
    const result = v.schema.safeParse(input);
    check.show(input, result);
    if (v.say) stage.say(v.say(result, input), result.success ? 'ok' : 'bad');
    else if (result.success) stage.say('✓ Valid', 'ok');
    else stage.say(`✗ ${plural(result.error.issues.length, 'issue')}: ${result.error.issues.map((i) => pathText(i.path)).join(', ')}`, 'bad');
  };

  if (stage.preview) {
    const plan = opts.plan ?? variants.map((_, i) => [i, 0] as const);
    stage.cycle(plan, opts.ms ?? 3200, ([v, s]) => {
      vi = v;
      input = samples[s]!.value;
      render();
    });
    return (v, s) => {
      vi = v;
      input = samples[s]!.value;
      render();
    };
  }

  if (stage.bar && variants.length > 1) {
    select(stage.bar, 'Schema', variants.map((v, i) => [i, v.label] as const), (i) => {
      vi = i;
      render();
    });
  }
  const driver = drive(
    stage,
    samples,
    (value) => {
      input = value;
      render();
    },
    opts.editor === false ? {} : { editor: stage.root },
  );
  return (v, s) => {
    vi = v;
    driver.pick(s);
  };
}

/** The keys (as paths, e.g. address.zip) the schema dropped from `input` on the way to `data`. */
export function droppedPaths(input: unknown, data: unknown): string[] {
  return [...diffMarks(input, data).input]
    .filter(([, mark]) => mark === 'gone')
    .map(([key]) => pathText(JSON.parse(key) as (string | number)[]));
}
