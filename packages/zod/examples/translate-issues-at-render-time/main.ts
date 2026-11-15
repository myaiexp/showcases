// Parse once, translate later: each issue's code is the key and its other fields fill the text
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lineTable } from '../../shared/error-lines.ts';
import { LANGS, t, type Lang } from '../../shared/error-words.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, pills } from '../../shared/widgets.ts';

const SignUp = z.object({ name: z.string().min(3), email: z.email(), age: z.number() });
// One parse. The issues below never change; only the words drawn from them do.
const issues = SignUp.safeParse({ name: 'Al', email: 'al@', age: '15' }).error!.issues;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a language: nothing is parsed again, the same issues are drawn in new words.' });
  codeLine(stage.root, 'result.error.issues.map((iss) => t(lang, iss.code, iss))');
  const [parsed] = pills(stage.root, ['parsed']);
  parsed!('once', 'info');
  const table = lineTable(stage.root, (fn, i) => stage.after(i * 200, fn));
  const show = (lang: Lang): void => {
    // iss.code picks the template, the rest of iss (expected, minimum, format) fills it.
    table.show(
      issues.map((iss) => ({ tag: lang, sub: iss.path.join('.'), text: `${iss.path.join('.')}: ${t(lang, iss.code, iss)}`, tone: 'bad' as const })),
      stage.preview,
    );
    stage.say(`✗ The same ${issues.length} issues, drawn in "${lang}" at render time`, 'bad');
  };
  const at = stage.cycle(LANGS, 3000, show);
  if (stage.bar) select(stage.bar, 'Language', LANGS.map((l, i) => [i, l] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
