// throwHttpErrors: false, so a missing file is an answer to read, not a crash
import type { Mount } from '@/types.ts';
import { checklist, kyName } from '../../shared/err-kit.ts';
import { cycle, demo } from '../../shared/req-kit.ts';

const FILES = ['index.html', 'press-kit.pdf', 'logo.png', 'old-page.html'];
const MISSING = new Set(['press-kit.pdf', 'old-page.html']);

const MODES = [
  { label: 'false: 404 is just an answer', throwHttpErrors: false },
  { label: 'true (the default): 404 throws', throwHttpErrors: true },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'A site checker asks about four files. Two do not exist. Compare what a missing file does in each mode.',
    server: { latency: 80, delay: 60 },
    routes: { '/site/*': (req) => ({ status: MISSING.has(req.url.pathname.split('/').pop()!) ? 404 : 200 }) },
  });
  const list = checklist(stage.row(), 'Does the file exist?');
  const rows = FILES.map((f) => list.add(f, 'not asked yet'));

  cycle(
    stage,
    MODES,
    async (mode) => {
      rows.forEach((r) => r.set('not asked yet'));
      stage.say(mode.throwHttpErrors ? 'Checking, with the default: errors throw…' : 'Checking with throwHttpErrors: false…');
      for (const [i, file] of FILES.entries()) {
        rows[i]!.set('asking…', 'info');
        try {
          // HEAD asks "is it there?" without downloading the file.
          const res = await api.head(`https://shop.example/site/${file}`, { throwHttpErrors: mode.throwHttpErrors, retry: 0 });
          // With false, Ky returns the 404 like any other response: you read res.ok.
          rows[i]!.set(res.ok ? 'exists' : `missing (${res.status})`, res.ok ? 'ok' : 'warn');
        } catch (error) {
          if (stage.disposed) throw error;
          rows[i]!.set(`threw ${kyName(error)}`, 'bad');
          stage.say('A missing file crashed the check: the rest never got asked.', 'bad');
          return;
        }
      }
      stage.say('All four checked: a missing file is just an answer.', 'ok');
    },
    { control: 'throwHttpErrors', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
