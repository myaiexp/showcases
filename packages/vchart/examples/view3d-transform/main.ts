// options3d alpha, beta and enableView3dTransform: set the camera, and let the reader drag it
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, readout, slider } from '../../shared/chart.ts';
import { INIT_3D, orbit, register3d, setCamera } from '../../shared/chart3d.ts';
import { rng } from '../../shared/components-data.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const r = rng(5);
const data = DAYS.map((month) => ({ month, sales: Math.round(10 + r() * 35) }));

const mount: Mount = (el, ctx) => {
  register3d('bar3d');
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'bar3d',
    data: [{ id: 'barData', values: data }],
    xField: 'month',
    yField: 'sales',
    bar3d: { style: { length: 24, z: -24 } },
    axes: [
      { orient: 'bottom', type: 'band', mode: '3d' },
      { orient: 'left', type: 'linear', mode: '3d' },
    ],
  } as unknown as ISpec;
  const camera = { alpha: 0.2, beta: 0.3 };
  const options3d = { enable: true, enableView3dTransform: true, alpha: camera.alpha, beta: camera.beta };
  const { vchart, release } = createChart(el, ctx, spec, { height: 440, init: { ...INIT_3D, options3d } });

  let alive = true;
  let stopOrbit = (): void => {};
  if (bar) {
    const log = readout(el);
    const show = (): void => {
      log.textContent = `options3d: { alpha: ${camera.alpha.toFixed(2)}, beta: ${camera.beta.toFixed(2)}, enableView3dTransform: true }  (radians; drag the chart to rotate it)`;
    };
    // The sliders set the camera on the stage, the same alpha and beta the constructor option takes.
    const apply = (): void => {
      if (!alive) return;
      setCamera(vchart, camera, { enableView3dTransform: true });
      show();
    };
    slider(bar, 'alpha', [-0.8, 0.8, 0.02], camera.alpha, (v) => { camera.alpha = v; apply(); });
    slider(bar, 'beta', [-0.8, 0.8, 0.02], camera.beta, (v) => { camera.beta = v; apply(); });
    show();
  } else {
    stopOrbit = orbit(vchart, camera, () => alive, { enableView3dTransform: true }, 0.5);
  }
  return () => {
    alive = false;
    stopOrbit();
    release();
  };
};

export default mount;
