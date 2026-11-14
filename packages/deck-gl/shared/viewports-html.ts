// Viewports chapter: a pool of absolutely positioned HTML labels over the stage
export interface HtmlLabel {
  text: string;
  /** Pixel position inside the stage, from viewport.project(). */
  x: number;
  y: number;
}

export interface LabelPool {
  /** Shows exactly these labels, reusing elements; the rest are hidden. */
  set(labels: HtmlLabel[]): void;
  remove(): void;
}

/** Labels are pointer-transparent chips, anchored above their point. */
export function labelPool(box: HTMLElement): LabelPool {
  const layer = document.createElement('div');
  layer.style.position = 'absolute';
  layer.style.inset = '0';
  layer.style.pointerEvents = 'none';
  layer.style.overflow = 'hidden';
  box.append(layer);
  const els: HTMLDivElement[] = [];
  return {
    set(labels) {
      labels.forEach((l, i) => {
        let el = els[i];
        if (!el) {
          el = document.createElement('div');
          el.style.cssText =
            'position:absolute;left:0;top:0;padding:1px 5px;border-radius:3px;font:11px/1.4 monospace;white-space:nowrap;color:#e8eef8;background:rgba(10,18,30,.82);border:1px solid #3b4a60;';
          layer.append(el);
          els[i] = el;
        }
        el.style.display = '';
        el.textContent = l.text;
        el.style.transform = `translate(${Math.round(l.x)}px, ${Math.round(l.y)}px) translate(-50%, calc(-100% - 6px))`;
      });
      for (let i = labels.length; i < els.length; i++) els[i]!.style.display = 'none';
    },
    remove: () => layer.remove(),
  };
}
