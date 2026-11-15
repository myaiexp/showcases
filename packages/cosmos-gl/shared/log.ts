// Event log: newest first in the full-view side panel, last line in a card
import type { Stage, Tone } from './stage.ts';

export type Log = (text: string, tone?: Tone) => void;

/**
 * Callbacks that fire many times a second can call the returned function freely: the
 * panel is rewritten at most once per animation frame.
 */
export function eventLog(stage: Stage, lines = 16): Log {
  const pre = stage.side();
  const rows: string[] = [];
  let queued = false;
  return (text, tone = 'info') => {
    stage.say(text, tone);
    if (!pre) return;
    rows.unshift(text);
    if (rows.length > lines) rows.length = lines;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (!stage.disposed) pre.textContent = rows.join('\n');
    });
  };
}
