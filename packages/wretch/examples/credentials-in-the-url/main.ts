// A user:pass@ address fails in fetch; BasicAuthAddon moves it into the header
import wretch from 'wretch';
import BasicAuthAddon from 'wretch/addons/basicAuth';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { envelope } from '../../shared/envelope.ts';
import { screen } from '../../shared/screen.ts';
import { createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const URL_WITH_LOGIN = 'https://aino:s3cret@api.example/private';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same address, with a login written inside it, sent two ways.' });
  const server = createServer(stage, { '/private': () => ({ json: { welcome: 'Aino' } }) });
  const seen = envelope(stage, { headers: ['authorization'], noBody: true });
  const shown = screen(stage.root, 'What the app shows');

  const finish = async (say: string, request: Promise<unknown>): Promise<void> => {
    stage.say(say);
    seen.show(null);
    shown.clear();
    await request.catch((err: unknown) => {
      if (stage.disposed) return;
      shown.show(`Failed: ${err instanceof Error ? err.message.slice(0, 70) : 'error'}…`, 'bad');
      stage.say('Without the addon the address is refused before anything is sent', 'bad');
    });
    if (!stage.disposed && server.requests.length) seen.show(server.requests.at(-1)!);
  };

  runCases(stage, [
    {
      label: 'Without the addon',
      run: () => {
        server.reset();
        return finish('wretch("https://aino:s3cret@api.example/private").get()', wretch(URL_WITH_LOGIN).fetchPolyfill(server.fetch).get().res());
      },
    },
    {
      label: 'With BasicAuthAddon',
      run: () => {
        server.reset();
        // The addon takes the login out of the address and puts it in the Authorization header.
        const request = wretch(URL_WITH_LOGIN)
          .fetchPolyfill(server.fetch)
          .addon(BasicAuthAddon)
          .get()
          .json(() => {
            shown.show('Welcome, Aino', 'ok');
            stage.say('The address reached the server without the login; the header carries it', 'ok');
          });
        return finish('Same address, with .addon(BasicAuthAddon)', request);
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
