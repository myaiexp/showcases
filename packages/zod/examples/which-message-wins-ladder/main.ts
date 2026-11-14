// Five places to word an error: switch them on and off and see which message Zod uses
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import './style.css';
import { checkbox } from '../../shared/controls.ts';
import { keepConfig, localeConfig, settle } from '../../shared/error-config.ts';
import { createStage } from '../../shared/stage.ts';

interface Rung {
  name: string;
  code: string;
  /** The words this rung adds (the locale's words come from Zod itself). */
  says: string;
}

const RUNGS: readonly Rung[] = [
  { name: 'Check', code: '.min(5, "Too short!")', says: 'Too short!' },
  { name: 'Schema', code: 'z.string("Invalid name")', says: 'Invalid name' },
  { name: 'Per-parse', code: 'safeParse(x, { error })', says: 'Per-parse words' },
  { name: 'Global', code: 'z.config({ customError })', says: 'Global words' },
  { name: 'Locale', code: 'z.config(z.locales.de())', says: '(German, from Zod)' },
];

/** Builds the schema and parse the switches describe, and returns the message Zod chose. */
function run(on: readonly boolean[]): string {
  const schema = z.string(on[1] ? RUNGS[1]!.says : undefined).min(5, on[0] ? RUNGS[0]!.says : undefined);
  const params = on[2] ? { error: () => RUNGS[2]!.says } : undefined;
  // "ab" is too short, so the min check raises the issue. keepConfig puts the page's
  // config back as soon as the message has been read.
  const result = keepConfig(() => {
    if (on[4]) z.config(localeConfig('de'));
    if (on[3]) z.config({ customError: () => RUNGS[3]!.says });
    return settle(schema.safeParse('ab', params));
  });
  return result.success ? '' : result.error.issues[0]!.message;
}

// Card script: everything on, then the top rung off, then the next...
const STEPS = [
  [true, true, true, true, true],
  [false, true, true, true, true],
  [false, false, true, true, true],
  [false, false, false, true, true],
  [false, false, false, false, true],
  [false, false, false, false, false],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch rungs off from the top: the highest one still on wins.' });
  const on = [...STEPS[0]!];
  const ladder = document.createElement('div');
  ladder.className = 'lw-ladder';
  const rows = RUNGS.map((rung, i) => {
    const row = document.createElement('div');
    row.className = 'lw-rung';
    const n = document.createElement('b');
    n.textContent = String(i + 1);
    const name = document.createElement('span');
    name.className = 'lw-name';
    name.textContent = rung.name;
    const code = document.createElement('code');
    code.textContent = rung.code;
    const says = document.createElement('span');
    says.className = 'lw-says';
    row.append(n, name, code, says);
    ladder.append(row);
    return { row, says };
  });
  const answer = document.createElement('div');
  answer.className = 'lw-answer';
  stage.root.append(ladder, answer);

  const show = (): void => {
    const message = run(on);
    // The winner is the rung whose words came out; none matching means the English default.
    const winner = RUNGS.findIndex((r, i) => on[i] && (i === 4 ? !RUNGS.slice(0, 4).some((_, j) => on[j]) : r.says === message));
    rows.forEach(({ row, says }, i) => {
      row.dataset['on'] = String(on[i]);
      row.dataset['win'] = String(i === winner);
      says.textContent = on[i] ? RUNGS[i]!.says : 'off';
    });
    answer.textContent = `"ab".safeParse → ${message}`;
    stage.say(
      winner >= 0 ? `✗ "${message}" comes from the ${RUNGS[winner]!.name.toLowerCase()} level` : '✗ Nothing is set, so the default English message appears',
      'bad',
    );
  };

  if (stage.preview) stage.cycle(STEPS, 2400, (s) => { on.splice(0, 5, ...s); show(); });
  else {
    show();
    RUNGS.forEach((rung, i) => checkbox(stage.bar!, `${i + 1} ${rung.name}`, true, (v) => { on[i] = v; show(); }));
  }
  return stage.dispose;
};

export default mount;
