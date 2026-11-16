// A tiny plugin as the docs describe: a Group subclass with its own event
import { Bounds, DragEvent, Group, Rect, type ILeafer, type IUI } from 'leafer-ui';

export const SelectEvent = { SELECT: 'selector.select' };

/** Drag on empty canvas to draw a box; the targets it touches are selected. */
export class Selector extends Group {
  public picked: IUI[] = [];
  public candidates: IUI[];
  protected band = new Rect({ stroke: '#4B8BFF', strokeWidth: 1.5, fill: 'rgba(75,139,255,0.15)', visible: false, hittable: false });

  constructor(candidates: IUI[]) {
    super();
    this.candidates = candidates;
    this.add(this.band);
  }

  /** Plug into a leafer: listens to the drag events of its empty area. */
  public bind(leafer: ILeafer): this {
    leafer.on(DragEvent.START, () => {
      this.band.visible = true;
    });
    leafer.on(DragEvent.DRAG, (e: DragEvent) => {
      this.band.set(e.getPageBounds());
    });
    leafer.on(DragEvent.END, (e: DragEvent) => {
      this.band.visible = false;
      const box = new Bounds(e.getPageBounds());
      this.picked = this.candidates.filter((t) => box.hit(t.getBounds('box', 'page')));
      this.emit(SelectEvent.SELECT, this.picked);
    });
    return this;
  }
}
