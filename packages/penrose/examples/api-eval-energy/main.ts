// evalEnergy(state) after every step of the solve, plotted on a log scale
import { evalEnergy, type PenroseState } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createLayout } from '../../shared/layout.ts';
import { createStage } from '../../shared/stage.ts';
import { energyPlot } from './plot.ts';
import './style.css';

const trio = {
  domain: `type Box
predicate Above(Box a, Box b)`,
  substance: `Box a, b, c, d
Above(a, b)
Above(b, c)
Above(d, c)`,
  style: `canvas {
  width = 500
  height = 400
}
forall Box x {
  x.icon = Rectangle {
    width : 90
    height : 50
  }
}
forall Box x; Box y {
  ensure disjoint(x.icon, y.icon, 15)
}
forall Box x; Box y
where Above(x, y) {
  ensure x.icon.center[1] > y.icon.center[1] + 80
  encourage norm(x.icon.center - y.icon.center) == 0
}`,
  variation: 'energy',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const plot = energyPlot(stage.paper);
  const layout = createLayout(stage, {
    onCompiled() {
      plot.reset();
    },
    onStep(state: PenroseState, info) {
      // evalEnergy runs the objectives and constraint penalties once at the current values.
      plot.add(info.iterations, evalEnergy(state));
      if (info.done) stage.say(`converged after ${info.iterations} iterations · energy ${evalEnergy(state).toExponential(2)}`, 'ok');
    },
    onDone() {
      stage.after(2500, () => void layout.resample());
    },
  });
  stage.button('Resample', () => void layout.resample());
  void layout.run(trio);
  return () => stage.dispose();
};

export default mount;
