// An error function runs at every parse, so a schema built once speaks the current language
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lineTable } from '../../shared/error-lines.ts';
import { LANGS, t, type Lang } from '../../shared/error-words.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, pills } from '../../shared/widgets.ts';

let lang: Lang = 'en';

// Built once, at module load. The function reads `lang` each time a parse fails.
const Name = z.string().min(3, { error: (iss) => t(lang, iss.code, iss) });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a language, then parse again: the same schema object answers in it.' });
  codeLine(stage.root, 'z.string().min(3, { error: (iss) => t(lang, iss.code, iss) })');
  const [built, parses] = pills(stage.root, ['schema built', 'parses']);
  built!('once', 'info');
  const table = lineTable(stage.root, () => undefined);
  const lines: { tag: string; text: string; tone: 'bad' }[] = [];
  let n = 0;
  const parseIn = (next: Lang): void => {
    lang = next;
    // The words come from the module-level `lang` as the parse fails: no z.config() involved.
    const r = Name.safeParse('Al');
    n++;
    lines.push({ tag: `#${n} ${next}`, text: r.success ? '' : r.error.issues[0]!.message, tone: 'bad' });
    if (lines.length > (stage.preview ? 4 : 8)) lines.shift();
    table.show(lines);
    parses!(String(n), 'ok');
    stage.say(`✗ Parse ${n} with the same schema object: worded in "${next}"`, 'bad');
  };
  const at = stage.cycle(LANGS, 1800, (l) => parseIn(l));
  if (stage.bar) select(stage.bar, 'Language', LANGS.map((l, i) => [i, l] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
