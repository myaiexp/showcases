// Parses a draggingConstraint body into a function, without running it as code
//
// The editor runs the string as a JavaScript function body. This gallery never evaluates
// strings as code, so it parses the subset the Interactivity page uses: `return [a, b]`
// where a and b are arithmetic over x, y, numbers and Math functions and constants.

type Node =
  | { k: 'num'; v: number }
  | { k: 'var'; name: 'x' | 'y' }
  | { k: 'neg'; a: Node }
  | { k: 'bin'; op: string; a: Node; b: Node }
  | { k: 'call'; fn: (...args: number[]) => number; args: Node[] };

const FUNCTIONS: Readonly<Record<string, (...args: number[]) => number>> = {
  abs: Math.abs, min: Math.min, max: Math.max, sqrt: Math.sqrt, hypot: Math.hypot,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, atan2: Math.atan2, floor: Math.floor,
  ceil: Math.ceil, round: Math.round, sign: Math.sign, pow: Math.pow, exp: Math.exp, log: Math.log,
};
const CONSTANTS: Readonly<Record<string, number>> = { PI: Math.PI, E: Math.E };

/** Parses a draggingConstraint body into a function of the wanted position. Throws on other syntax. */
export function parseDragConstraint(body: string): (x: number, y: number) => [number, number] {
  const tokens = body.match(/\d+\.?\d*(?:e[+-]?\d+)?|\.\d+|[A-Za-z_]\w*|\S/g) ?? [];
  let i = 0;
  const peek = (): string | undefined => tokens[i];
  const take = (want?: string): string => {
    const t = tokens[i++];
    if (t === undefined || (want !== undefined && t !== want)) {
      throw new Error(`draggingConstraint: expected ${want ?? 'more'} but found ${t ?? 'the end'} in "${body}"`);
    }
    return t;
  };

  const primary = (): Node => {
    const t = take();
    if (t === '(') {
      const e = sum();
      take(')');
      return e;
    }
    if (t === '-') return { k: 'neg', a: primary() };
    if (t === '+') return primary();
    if (/^[\d.]/.test(t)) return { k: 'num', v: Number(t) };
    if (t === 'x' || t === 'y') return { k: 'var', name: t };
    if (t === 'Math') {
      take('.');
      const name = take();
      if (name in CONSTANTS) return { k: 'num', v: CONSTANTS[name]! };
      const fn = FUNCTIONS[name];
      if (!fn) throw new Error(`draggingConstraint: Math.${name} is not supported here`);
      take('(');
      const args: Node[] = [];
      if (peek() !== ')') {
        args.push(sum());
        while (peek() === ',') {
          take(',');
          args.push(sum());
        }
      }
      take(')');
      return { k: 'call', fn, args };
    }
    throw new Error(`draggingConstraint: "${t}" is not supported here (only x, y, numbers and Math)`);
  };
  const product = (): Node => {
    let a = primary();
    while (peek() === '*' || peek() === '/' || peek() === '%') a = { k: 'bin', op: take(), a, b: primary() };
    return a;
  };
  const sum = (): Node => {
    let a = product();
    while (peek() === '+' || peek() === '-') a = { k: 'bin', op: take(), a, b: product() };
    return a;
  };

  take('return');
  take('[');
  const ex = sum();
  take(',');
  const ey = sum();
  take(']');
  if (peek() === ';') take(';');
  if (peek() !== undefined) throw new Error(`draggingConstraint: unexpected "${peek()}" after the return in "${body}"`);

  const run = (n: Node, x: number, y: number): number => {
    switch (n.k) {
      case 'num':
        return n.v;
      case 'var':
        return n.name === 'x' ? x : y;
      case 'neg':
        return -run(n.a, x, y);
      case 'call':
        return n.fn(...n.args.map((a) => run(a, x, y)));
      case 'bin': {
        const [a, b] = [run(n.a, x, y), run(n.b, x, y)];
        return n.op === '+' ? a + b : n.op === '-' ? a - b : n.op === '*' ? a * b : n.op === '/' ? a / b : a % b;
      }
    }
  };
  return (x, y) => [run(ex, x, y), run(ey, x, y)];
}
