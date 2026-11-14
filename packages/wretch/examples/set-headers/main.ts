// .headers() sets any header; the server answers in the language asked
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const GREETINGS: Record<string, string> = {
  en: 'Good morning!',
  fi: 'Hyvää huomenta!',
  fr: 'Bonjour !',
  ja: 'おはようございます',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a language: it travels as a header and the server replies in it.' });
  const server = createServer(stage, {
    'GET /greeting': (req) => {
      if (!req.headers.get('x-api-key')) return { status: 401, json: { error: 'An API key is needed' } };
      const lang = req.headers.get('accept-language') ?? 'en';
      return { json: { text: GREETINGS[lang] ?? GREETINGS['en'], lang } };
    },
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['x-api-key', 'accept-language'] });
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const greet = async (lang: string): Promise<void> => {
    stage.say(`.headers({ "X-Api-Key": "k-1234", "Accept-Language": "${lang}" })`);
    // Any header at all can go in the object: the server reads them like any other.
    const reply = await api
      .headers({ 'X-Api-Key': 'k-1234', 'Accept-Language': lang })
      .get('/greeting')
      .json<{ text: string }>()
      .catch(() => null);
    if (stage.disposed || !reply) return;
    seen.show(server.requests.at(-1)!);
    shown.show(reply.text, 'ok');
    stage.say(`The server read the header and answered in "${lang}"`, 'ok');
  };

  runCases(
    stage,
    Object.keys(GREETINGS).map((lang) => ({ label: lang, run: () => greet(lang) })),
    1500,
  );
  return () => stage.dispose();
};

export default mount;
