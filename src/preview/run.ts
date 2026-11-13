// Runs one example mount with abort handling and an error boundary around it

import type { Cleanup, Mount } from '../types.ts';

export interface Running {
  /** Unmounts: aborts a pending async mount, or runs the cleanup of a finished one. */
  stop(): void;
}

/**
 * Mounts an example into a fresh container inside `stage`. Each run owns its container,
 * so an async mount that resolves after stop() writes only into its own detached node,
 * never into the next run's. A thrown or rejected mount renders the error in that
 * container only, so one broken example never blanks a gallery.
 */
export function runExample(
  stage: HTMLElement,
  id: string,
  load: () => Promise<Mount>,
  preview: boolean,
): Running {
  const abort = new AbortController();
  let cleanup: Cleanup | undefined;
  const el = document.createElement('div');
  el.className = 'sc-mount';
  el.dataset['example'] = id;
  stage.append(el);

  const safely = (fn: Cleanup): void => {
    try {
      fn();
    } catch (err) {
      console.error(`Example ${id} cleanup failed`, err);
    }
  };

  const start = async (): Promise<void> => {
    const mount = await load();
    if (abort.signal.aborted) return;
    const result = await mount(el, { preview, signal: abort.signal });
    // Unmounted while an async mount was still resolving: undo it straight away.
    if (abort.signal.aborted) safely(result);
    else cleanup = result;
  };

  start().catch((err: unknown) => {
    if (abort.signal.aborted) return;
    console.error(`Example ${id} failed`, err);
    showError(el, err);
  });

  return {
    stop() {
      abort.abort();
      if (cleanup) safely(cleanup);
      cleanup = undefined;
      el.remove();
    },
  };
}

function showError(el: HTMLElement, err: unknown): void {
  const box = document.createElement('div');
  box.className = 'sc-example-error';
  box.textContent = `This example failed: ${err instanceof Error ? err.message : String(err)}`;
  el.replaceChildren(box);
}
