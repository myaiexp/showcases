// Step cycle: shows steps in order, holding each, and loops with a pause button
export interface Step {
  /** Caption while the step shows. */
  say?: string;
  /** Applies the step, usually one render() or update() call. */
  run: () => unknown;
  /** How long the step stays, ms. */
  hold?: number;
}

/** What stage.wait() rejects with once the stage is disposed. */
export const STOPPED = Symbol('stage disposed');

/** The parts of the stage the cycle drives. */
export interface CycleHost {
  preview: boolean;
  readonly disposed: boolean;
  say(text: string, tone?: 'ok' | 'warn' | 'bad' | 'info'): void;
  wait(ms: number): Promise<void>;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
}

export function runCycle(host: CycleHost, steps: readonly Step[], hold?: number): void {
  const pause = hold ?? (host.preview ? 1800 : 2600);
  let paused = false;
  const toggle = host.button('Pause', () => {
    paused = !paused;
    if (toggle) toggle.textContent = paused ? 'Play' : 'Pause';
  });
  void (async () => {
    for (let i = 0; !host.disposed; i = (i + 1) % steps.length) {
      const step = steps[i] as Step;
      if (step.say) host.say(step.say);
      await step.run();
      await host.wait(step.hold ?? pause);
      while (paused) await host.wait(200);
    }
  })().catch((err: unknown) => {
    if (err === STOPPED || host.disposed) return;
    console.error('infographic cycle failed', err);
    host.say(`Stopped: ${err instanceof Error ? err.message : String(err)}`, 'bad');
  });
}
