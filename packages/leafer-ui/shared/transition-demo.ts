// One control for the four transition argument forms of the incremental methods
import { button, select } from './controls.ts';
import { caption } from './shapes.ts';
import type { Stage } from './stage.ts';
import type { ITransition, Leafer } from 'leafer-ui';

const FORMS = ['none', 'true', '2', '{ duration: 2 }'] as const;
type Form = (typeof FORMS)[number];

const VALUE: Record<Form, ITransition | undefined> = { none: undefined, true: true, '2': 2, '{ duration: 2 }': { duration: 2 } };

/**
 * Full view: a select for the transition argument, then "run" and "reset" buttons.
 * Card: every few seconds resets, then runs with `true`.
 * `call(arg)` returns the call as text for the caption, `apply` makes the call, `reset` puts the element back.
 */
export function transitionDemo(
  stage: Stage,
  leafer: Leafer,
  call: (arg: string) => string,
  apply: (t: ITransition | undefined) => void,
  reset: () => void,
): void {
  const note = caption(stage, leafer);
  let form: Form = stage.preview ? 'true' : 'none';
  const show = (): void => {
    note.text = call(form === 'none' ? '' : `, ${form}`);
  };
  show();
  if (stage.bar) {
    select(stage.bar, 'transition', FORMS, (v) => ((form = v), show()), form);
    button(stage.bar, 'run', () => apply(VALUE[form]));
    button(stage.bar, 'reset', reset);
  } else {
    reset();
    stage.after(600, () => apply(VALUE[form]));
    stage.every(3600, () => {
      reset();
      stage.after(600, () => apply(VALUE[form]));
    });
  }
}
