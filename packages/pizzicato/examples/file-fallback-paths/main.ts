// A path array: Pizzicato tries each file in order until one decodes
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { recording, unplayableFile } from '../../shared/recordings.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';

interface Attempt {
  label: string;
  /** The names shown for each path, in order: the first of them fails. */
  names: string[];
  sound: Sound | null;
  error: string | null;
}

interface Built {
  attempts: Attempt[];
  mode: number;
}

/** Loads a sound from `paths`, and resolves with what the callback said. */
function tryPaths(label: string, names: string[], paths: string[]): Promise<Attempt> {
  return new Promise((resolve) => {
    const sound: Sound = new Pizzicato.Sound({ source: 'file', options: { path: paths, attack: 0 } }, (error) => {
      resolve(
        error
          ? { label, names, sound: null, error: error instanceof Error ? error.message : 'could not decode any path' }
          : { label, names, sound, error: null },
      );
    });
  });
}

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3 });
  const title = bigText(stage.visual, 13);
  const list = document.createElement('div');
  list.style.cssText = 'font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);text-align:center';
  const result = bigText(stage.visual, 14);
  stage.visual.insertBefore(list, result);
  const line = (mark: string, name: string, color: string): HTMLDivElement => {
    const row = document.createElement('div');
    row.style.color = color;
    row.textContent = `${mark} ${name}`;
    return row;
  };

  // Draws the path list with the first `tried` paths marked as failed or loaded.
  const draw = (a: Attempt, tried: number): void => {
    title.textContent = 'path: [ … ]';
    list.replaceChildren(
      ...a.names.map((name, i) => {
        const ok = a.sound !== null && i === a.names.length - 1;
        if (i >= tried) return line('·', name, 'var(--fg-3)');
        return ok ? line('✓', name, '#7fd99a') : line('✗', name, '#ff8fb1');
      }),
    );
    result.textContent = tried < a.names.length ? 'trying paths in order…' : a.sound ? 'callback(): ready' : `callback(error)`;
  };

  return stage.run<Built>({
    build: async () => ({
      mode: 0,
      attempts: [
        // The first file is not audio, so decoding it fails and the next path is tried.
        await tryPaths('first path broken', ['broken.xyz', 'drums.wav'], [unplayableFile(), await recording('drums')]),
        await tryPaths('every path broken', ['broken.xyz', 'missing.xyz'], [unplayableFile(), unplayableFile()]),
      ],
    }),
    play: (g, at) => {
      const a = g.attempts[g.mode]!;
      stage.show(() => draw(a, 0));
      for (let i = 1; i <= a.names.length; i++) at(0.3 + i * 0.4, () => stage.show(() => draw(a, i)));
      if (a.sound) {
        at(1.2, () => a.sound?.play());
        at(2.6, () => a.sound?.stop());
      }
    },
    variants: [
      { label: 'first path broken', apply: (g) => (g.mode = 0) },
      { label: 'every path broken', apply: (g) => (g.mode = 1) },
    ],
    controls: (g, bar) => {
      select(bar, 'paths', ['first path broken', 'every path broken'], (v) => {
        g.mode = v === 'first path broken' ? 0 : 1;
      });
    },
  });
};

export default mount;
