// A Retry-After that is a clock time instead of a number of seconds
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let ahead = 2;
  let header = '';
  const lab = retryLab(el, ctx, {
    hint: 'The server names a clock time to come back at. Ky works out how long that is from now.',
    span: 3000,
    fullSpan: 6000,
    routes: {
      '/tickets': (req) => {
        if (req.n > 1) return { json: { tickets: 3 } };
        // An HTTP date has whole seconds only, so round up to the next full second.
        header = new Date(Math.ceil((Date.now() + ahead * 1000) / 1000) * 1000).toUTCString();
        facts.clear();
        facts.add('Retry-After:', 'warn');
        facts.add(ctx.preview ? header.slice(17) : header, 'warn');
        return { status: 503, headers: { 'retry-after': header } };
      },
    },
  });
  const facts = lab.facts('Header the server sent');

  const buy = (): Promise<boolean> =>
    lab.attempt({
      say: ahead > 0 ? `The server says: come back at a set time, about ${ahead} s from now…` : 'The server names a time that has already passed…',
      // No retry options: Ky reads the date, subtracts the current time and waits that long.
      // The card uses 2 s so the loop stays short.
      call: () => lab.api.get('https://tickets.example/tickets').json(),
      ok: () => {
        const waited = lab.gaps()[0] ?? 0;
        return {
          say:
            ahead > 0
              ? `Ky waited ${Math.round(waited / 10) * 10} ms: the time left until that clock time.`
              : 'The time was already past, so Ky tried again straight away.',
        };
      },
      bad: () => 'Ky gave up.',
    });

  if (!lab.stage.preview) {
    slider(lab.stage.bar!, 'comes back at:', -2, 4, 1, ahead, (v) => (ahead = v), (v) => (v > 0 ? `now + ${v} s` : v === 0 ? 'now' : `${-v} s ago`));
  }
  lab.start(async () => void (await buy()), 1400, 'Ask for tickets');
  return lab.dispose;
};

export default mount;
