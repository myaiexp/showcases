// A ball moved by requestAnimationFrame, plus a readout of the longest frame gap
export interface Lane {
  el: HTMLElement;
  /** Starts measuring the longest gap between frames, from now. */
  begin(): void;
  /** Stops measuring; the readout keeps the longest gap seen while measuring. */
  end(): void;
  /** The longest gap between two frames while measuring, in ms. */
  readonly worst: number;
  stop(): void;
}

export function lane(parent: HTMLElement, title: string): Lane {
  const el = document.createElement('div');
  el.className = 'lane';
  const head = document.createElement('div');
  head.className = 'lane-head';
  head.textContent = title;
  const track = document.createElement('div');
  track.className = 'lane-track';
  const ball = document.createElement('div');
  ball.className = 'lane-ball';
  track.append(ball);
  const gap = document.createElement('div');
  gap.className = 'lane-gap';
  el.append(head, track, gap);
  parent.append(el);

  let last = performance.now();
  let worst = 0;
  let measuring = false;
  // Both lanes are drawn by the same page, so a freeze stalls both balls: each lane only
  // counts the gaps that happen during its own search.
  // Moved by script, not CSS: a CSS animation runs on the compositor and would keep moving
  // while the page's own thread is frozen.
  const frame = (now: number): void => {
    if (measuring) worst = Math.max(worst, now - last);
    last = now;
    const lap = (now % 1600) / 800;
    ball.style.left = `calc(${(lap > 1 ? 2 - lap : lap) * 100}% - ${(lap > 1 ? 2 - lap : lap) * 14}px)`;
    gap.textContent = `longest pause during its search: ${Math.round(worst)} ms`;
    gap.dataset['bad'] = String(worst > 150);
    raf = requestAnimationFrame(frame);
  };
  let raf = requestAnimationFrame(frame);
  // A hidden tab draws no frames: don't count that as a freeze.
  const onVis = (): void => {
    last = performance.now();
  };
  document.addEventListener('visibilitychange', onVis);
  return {
    el,
    begin() {
      last = performance.now();
      worst = 0;
      measuring = true;
    },
    end() {
      measuring = false;
    },
    get worst() {
      return worst;
    },
    stop() {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    },
  };
}
