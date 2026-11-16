// Pins, segments and outlines for the Point, Bounds and Matrix examples
import { Ellipse, Line, Polygon, Text, type IBoundsData, type IPointData, type Leafer } from 'leafer-ui';
import { RED } from './event-kit.ts';

type Parent = Pick<Leafer, 'add'>;

export interface Pin {
  set(p: IPointData, text?: string): void;
}

/** A dot centred on a point, with an optional small caption beside it. */
export function pin(parent: Parent, color = RED, r = 5, fontSize = 11): Pin {
  const dot = new Ellipse({ width: r * 2, height: r * 2, around: 'center', fill: color, hittable: false });
  const tag = new Text({ fontSize, fill: '#444', hittable: false, text: '' });
  parent.add([dot, tag]);
  return {
    set(p, text) {
      dot.set({ x: p.x, y: p.y });
      tag.set({ x: p.x + r + 4, y: p.y - fontSize / 2 - 2, text: text ?? '' });
    },
  };
}

export interface Seg {
  set(a: IPointData, b: IPointData): void;
}

/** A straight line between two moving points. */
export function seg(parent: Parent, color = '#999', width = 2, dash?: number[]): Seg {
  const line = new Line({ stroke: color, strokeWidth: width, dashPattern: dash, hittable: false, points: [0, 0, 0, 0] });
  parent.add(line);
  return {
    set(a, b) {
      line.set({ x: 0, y: 0, width: undefined, points: [a.x, a.y, b.x, b.y] });
    },
  };
}

export interface Outline {
  set(points: IPointData[]): void;
}

/** A closed outline through points; `fill` makes it a shape. */
export function outlineOf(parent: Parent, stroke = '#4B8BFF', fill?: string): Outline {
  const poly = new Polygon({ stroke, strokeWidth: 2, fill, hittable: false, points: [0, 0, 1, 0, 1, 1] });
  parent.add(poly);
  return {
    set(points) {
      poly.points = points.flatMap((p) => [p.x, p.y]);
    },
  };
}

/** A bounds box as four corner points, for outlineOf. */
export function cornersOf(b: IBoundsData): IPointData[] {
  return [
    { x: b.x, y: b.y },
    { x: b.x + b.width, y: b.y },
    { x: b.x + b.width, y: b.y + b.height },
    { x: b.x, y: b.y + b.height },
  ];
}

/** Rounds to one decimal for readouts. */
export const f1 = (n: number): string => (Math.round(n * 10) / 10).toString();

/** "x, y" with one decimal. */
export const xy = (p: IPointData): string => `${f1(p.x)}, ${f1(p.y)}`;
