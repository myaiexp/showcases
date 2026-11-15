// transitionEasing shapes a move; the curve plot shows progress against time
import { Graph, TransitionEasing } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

type EasingName = `${TransitionEasing}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an easing and move the block. The plot is the progress that onTransition reports.' });
  const easings = Object.values(TransitionEasing) as EasingName[];
  const enumKey = (e: EasingName): string => Object.entries(TransitionEasing).find(([, v]) => v === e)?.[0] ?? e;
  const duration = 1100;

  // A 5 x 5 block that moves between the left and the right of the view.
  const block = (cx: number): Float32Array => {
    const out = new Float32Array(50);
    for (let i = 0; i < 25; i++) {
      out[i * 2] = cx + ((i % 5) - 2) * 14;
      out[i * 2 + 1] = CENTER + (Math.floor(i / 5) - 2) * 14;
    }
    return out;
  };
  const left = block(CENTER - 130);
  const right = block(CENTER + 130);

  // The plot: eased progress (up) against time (right), redrawn from onTransition.
  const plot = document.createElement('canvas');
  plot.width = stage.preview ? 84 : 160;
  plot.height = stage.preview ? 48 : 90;
  plot.style.cssText = `position:absolute;right:6px;bottom:${stage.preview ? 20 : 6}px;background:rgb(0 0 0 / 0.55);border:1px solid #555;z-index:2;pointer-events:none`;
  stage.div.append(plot);
  const g2 = plot.getContext('2d');
  let started = 0;
  let samples: [number, number][] = [];
  const draw = (): void => {
    if (!g2) return;
    g2.clearRect(0, 0, plot.width, plot.height);
    g2.strokeStyle = '#666';
    g2.strokeRect(4.5, 4.5, plot.width - 9, plot.height - 9);
    g2.strokeStyle = '#ffd84d';
    g2.beginPath();
    samples.forEach(([t, p], i) => {
      const x = 5 + Math.min(1, t / duration) * (plot.width - 10);
      const y = plot.height - 5 - p * (plot.height - 10);
      if (i) g2.lineTo(x, y);
      else g2.moveTo(x, y);
    });
    g2.stroke();
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: duration,
        transitionEasing: TransitionEasing.Linear, // the enum member
        pointDefaultSize: 8,
        fitViewOnInit: false,
        onTransitionStart: () => {
          started = performance.now();
          samples = [[0, 0]];
        },
        onTransition: (progress) => {
          samples.push([performance.now() - started, progress]);
          draw();
        },
        onTransitionEnd: () => {
          samples.push([duration, 1]);
          draw();
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(left);
  graph.setPointColors(colors(25, (i) => hsl((i / 25) * 300, 0.8, 0.6)));
  graph.render();
  void graph.ready.then(() => graph.fitViewByPointPositions([CENTER - 190, CENTER - 80, CENTER + 190, CENTER + 80], 0, 0.1));

  let atRight = false;
  let asEnum = true;
  const move = async (e: EasingName): Promise<void> => {
    await graph.ready;
    // setConfigPartial keeps everything else; the value is the enum member or its string.
    graph.setConfigPartial({ transitionEasing: asEnum ? (e as TransitionEasing) : e });
    atRight = !atRight;
    graph.setPointPositions(atRight ? right : left);
    graph.render();
    stage.say(asEnum ? `transitionEasing: TransitionEasing.${enumKey(e)}` : `transitionEasing: '${e}'`);
  };

  let current: EasingName = 'cubic-in-out';
  stage.select<EasingName>('easing', easings.map((e) => ({ value: e, label: e })), current, (v) => {
    current = v;
    void move(v);
  });
  stage.button('Move again', () => void move(current));
  stage.toggle('as TransitionEasing enum (off: string)', true, (on) => {
    asEnum = on;
    stage.say(asEnum ? `transitionEasing: TransitionEasing.${enumKey(current)}` : `transitionEasing: '${current}'`);
  });
  stage.say('Pick an easing: the block moves with it');
  const card: EasingName[] = ['linear', 'quad-in', 'cubic-out', 'sin-in-out', 'exp-in', 'circle-out'];
  if (stage.preview) stage.cycle(card.map((e) => ({ run: () => move(e) })), 1800);
  return () => stage.dispose();
};

export default mount;
