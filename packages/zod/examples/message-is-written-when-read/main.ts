// One failed parse, read before or after switching the language to French
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { keepConfig } from '../../shared/error-config.ts';
import { factTable } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Age = z.number();

// Everything that touches z.config() happens inside one synchronous keepConfig.
function run(readEarly: boolean): string {
  return keepConfig(() => {
    z.config(z.locales.en());
    const result = Age.safeParse('thirty');
    // Reading the issues now writes the messages in English, for good.
    if (readEarly && !result.success) void result.error.issues[0]!.message;
    z.config(z.locales.fr());
    return result.success ? 'passed' : result.error.issues[0]!.message;
  });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'Age.safeParse("thirty"); z.config(fr()); result.error…');
  const table = factTable(stage.root, stage);
  table.show(
    [
      { label: 'read early', sub: 'message read before the switch', text: run(true) },
      { label: 'read late', sub: 'message read after the switch', text: run(false) },
    ],
  );
  stage.say('The error map runs on the first read: read late and the new language wins', 'info');
  return stage.dispose;
};

export default mount;
