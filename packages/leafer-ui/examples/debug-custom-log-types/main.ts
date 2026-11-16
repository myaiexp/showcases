// Debug: which log lines pass the enable, filter and exclude settings
import { Debug, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { logger } from '../../shared/event-kit.ts';

const alpha = Debug.get('Alpha');
const beta = Debug.get('Beta');

/** Runs `fn` with the Debug options set and the console captured, then puts everything back. */
function printed(options: Partial<Pick<typeof Debug, 'enable' | 'filter' | 'exclude' | 'showWarn'>>, fn: () => void): string[] {
  const saved = { enable: Debug.enable, filter: Debug.filter, exclude: Debug.exclude, showWarn: Debug.showWarn };
  const lines: string[] = [];
  const real = { log: console.log, warn: console.warn, error: console.error };
  const grab = (kind: string) => (...args: unknown[]): void => void lines.push(`${kind} ${args.map(String).join(' ')}`);
  console.log = grab('log  ');
  console.warn = grab('warn ');
  console.error = grab('error');
  try {
    Object.assign(Debug, options);
    fn();
  } finally {
    Object.assign(Debug, saved);
    Object.assign(console, real);
  }
  return lines;
}

const CASES: Record<string, Parameters<typeof printed>[0]> = {
  'enable: false': { enable: false },
  'enable: true': { enable: true },
  "enable, filter: 'Alpha'": { enable: true, filter: 'Alpha' },
  "enable, exclude: 'Alpha'": { enable: true, exclude: 'Alpha' },
  'enable, showWarn: false': { enable: true, showWarn: false },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two loggers (Alpha, Beta) each call log, warn and error. The list is what the console received.' });
  stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 7 : 10);

  pick(stage, 'options', Object.keys(CASES), (name) => {
    const lines = printed(CASES[name]!, () => {
      alpha.log('content1', 'content2');
      alpha.warn('content');
      beta.log('hello');
      beta.error('oops');
    });
    log(`--- ${name}`);
    for (const l of lines.reverse()) log(l);
    if (!lines.length) log('(nothing printed)');
  }, 3000);
  return stage.dispose;
};

export default mount;
