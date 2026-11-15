// Render control: pauseAnimation freezes the view and its pointer input, resumeAnimation brings both back
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Particles keep the canvas busy. Pause freezes it and ignores drags and zoom; resume continues.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 9))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(3.5)
    .linkDirectionalParticleSpeed(0.006)
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));

  const say = status(stage, 'running');
  let paused = false;
  const set = (pause: boolean): void => {
    paused = pause;
    if (pause) graph.pauseAnimation();
    else graph.resumeAnimation();
    say(pause ? 'paused: pauseAnimation()' : 'running: resumeAnimation()');
  };

  if (stage.bar) {
    button(stage.bar, 'pauseAnimation()', () => set(true));
    button(stage.bar, 'resumeAnimation()', () => set(false));
  } else {
    stage.every(2000, () => set(!paused));
  }

  return stage.dispose;
};

export default mount;
