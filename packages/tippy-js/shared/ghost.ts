// A drawn pointer that moves over a card and sends the events Tippy listens for
//
// Coordinates are px inside the stage's root. Events go to the target element only (see
// the trap list in stage.ts for why never to the document).

export type Point = { x: number; y: number };
type Target = Element | Point;

export interface Ghost {
  /** Glides to an element's centre (or a point) in `ms`. */
  moveTo(target: Target, ms?: number): Promise<void>;
  /** Glides onto `el` and sends mouseenter, after a mouseleave to whatever it was over. */
  hover(el: Element, ms?: number): Promise<void>;
  /** Sends mouseleave to the hovered element, if any. */
  leave(): void;
  /** Optionally glides onto `el`, then presses and sends a click. */
  click(el?: Element, ms?: number): Promise<void>;
  /** Sends a contextmenu event (a right-click) at the pointer's position. */
  rightClick(el: Element): Promise<void>;
  /** Sends focus / blur, as a keyboard Tab would; the element is not really focused. */
  focus(el: Element): void;
  blur(el: Element): void;
  /** Types `text` into an input one character at a time, sending input events. */
  type(input: HTMLInputElement | HTMLTextAreaElement, text: string, msPerChar?: number): Promise<void>;
  /** A zero-size rect at the pointer tip, in viewport coordinates (for getReferenceClientRect). */
  clientRect: () => DOMRect;
  /** Calls `fn` on every frame the pointer moves. Returns an unsubscribe function. */
  track(fn: (p: Point) => void): () => void;
  /** Where the pointer is, in root px. */
  readonly at: Point;
  remove(): void;
}

const SVG = 'http://www.w3.org/2000/svg';

function arrow(): SVGSVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '22');
  svg.setAttribute('viewBox', '0 0 18 22');
  const path = document.createElementNS(SVG, 'path');
  path.setAttribute('d', 'M1 1 L1 17 L5.5 13 L8.5 20 L11 19 L8 12 L14 12 Z');
  path.setAttribute('fill', '#fff');
  path.setAttribute('stroke', '#111');
  path.setAttribute('stroke-width', '1.4');
  path.setAttribute('stroke-linejoin', 'round');
  svg.append(path);
  return svg;
}

export function createGhost(
  root: HTMLElement,
  wait: (ms: number) => Promise<void>,
  stopped: () => boolean,
): Ghost {
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;left:0;top:0;z-index:10001;pointer-events:none;filter:drop-shadow(0 1px 2px #0008);will-change:transform';
  dot.append(arrow());
  root.append(dot);

  const at: Point = { x: root.clientWidth - 24, y: root.clientHeight - 30 };
  let hovered: Element | null = null;
  const trackers = new Set<(p: Point) => void>();
  const place = (): void => {
    dot.style.transform = `translate(${at.x}px, ${at.y}px)`;
    for (const fn of trackers) fn(at);
  };
  place();

  const local = (t: Target): Point => {
    if (!(t instanceof Element)) return t;
    const r = t.getBoundingClientRect();
    const o = root.getBoundingClientRect();
    return { x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2 };
  };
  const client = (): Point => {
    const o = root.getBoundingClientRect();
    return { x: o.left + at.x, y: o.top + at.y };
  };
  const mouse = (type: string, bubbles: boolean, init: MouseEventInit = {}): MouseEvent => {
    const c = client();
    return new MouseEvent(type, { bubbles, cancelable: true, clientX: c.x, clientY: c.y, view: window, ...init });
  };

  const moveTo = (target: Target, ms = 500): Promise<void> => {
    const from = { ...at };
    const to = local(target);
    const start = performance.now();
    return new Promise((resolve) => {
      const step = (now: number): void => {
        if (stopped()) return resolve();
        const k = Math.min(1, (now - start) / ms);
        const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        at.x = from.x + (to.x - from.x) * e;
        at.y = from.y + (to.y - from.y) * e;
        place();
        if (k < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  };

  const leave = (): void => {
    if (!hovered) return;
    hovered.dispatchEvent(mouse('mouseleave', false));
    hovered.dispatchEvent(mouse('mouseout', true));
    hovered = null;
  };

  const press = async (): Promise<void> => {
    dot.animate([{ scale: '1' }, { scale: '0.8' }, { scale: '1' }], { duration: 220 });
    await wait(120);
  };

  return {
    moveTo,
    async hover(el, ms) {
      if (hovered !== el) leave();
      await moveTo(el, ms);
      if (stopped() || hovered === el) return;
      hovered = el;
      el.dispatchEvent(mouse('mouseover', true));
      el.dispatchEvent(mouse('mouseenter', false));
    },
    leave,
    async click(el, ms) {
      if (el) await moveTo(el, ms);
      await press();
      (el ?? hovered)?.dispatchEvent(mouse('click', true, { button: 0 }));
    },
    async rightClick(el) {
      await press();
      el.dispatchEvent(mouse('contextmenu', true, { button: 2 }));
    },
    focus(el) {
      el.dispatchEvent(new FocusEvent('focus'));
      el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    },
    blur(el) {
      el.dispatchEvent(new FocusEvent('blur'));
      el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    },
    async type(input, text, msPerChar = 70) {
      for (const ch of text) {
        input.value += ch;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await wait(msPerChar);
      }
    },
    clientRect: () => {
      const c = client();
      return new DOMRect(c.x, c.y, 0, 0);
    },
    track(fn) {
      trackers.add(fn);
      return () => trackers.delete(fn);
    },
    get at() {
      return { ...at };
    },
    remove() {
      leave();
      trackers.clear();
      dot.remove();
    },
  };
}
