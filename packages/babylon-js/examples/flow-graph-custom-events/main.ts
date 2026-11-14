// Custom events: one graph sends, two other graphs receive through the coordinator
import {
  ArcRotateCamera,
  Color3,
  Constants,
  FlowGraphCodeExecutionBlock,
  FlowGraphCoordinator,
  FlowGraphInterpolationBlock,
  FlowGraphPlayAnimationBlock,
  FlowGraphRandomBlock,
  FlowGraphReceiveCustomEventBlock,
  FlowGraphSceneTickEventBlock,
  FlowGraphSendCustomEventBlock,
  FlowGraphSetPropertyBlock,
  FlowGraphThrottleBlock,
  HemisphericLight,
  MeshBuilder,
  RichTypeNumber,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 10, new Vector3(0, 1.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 8, height: 8 }, scene);
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 1 }, scene);
  ball.position.y = 0.5;
  const ballMat = new StandardMaterial('ball', scene);
  ballMat.diffuseColor = new Color3(1, 0.6, 0.2);
  ball.material = ballMat;

  const coordinator = new FlowGraphCoordinator({ scene });
  const eventData = { height: { type: RichTypeNumber, value: 2 } };

  // Graph 1, the sender: SceneTick → Throttle → SendCustomEvent("jump") with random data.
  const sender = coordinator.createGraph('sender');
  const senderCtx = sender.createContext();
  const tick = new FlowGraphSceneTickEventBlock();
  sender.addEventBlock(tick);
  const throttle = new FlowGraphThrottleBlock();
  throttle.duration.setValue(1.4, senderCtx);
  const send = new FlowGraphSendCustomEventBlock({ eventId: 'jump', eventData });
  const height = new FlowGraphRandomBlock({ min: 1.5, max: 4 });
  send.getDataInput('height')!.connectTo(height.value);
  tick.done.connectTo(throttle.in);
  throttle.out.connectTo(send.in);

  // Graph 2, a receiver: the event's `height` drives a two-keyframe hop of position.y.
  const mover = coordinator.createGraph('mover');
  const moverCtx = mover.createContext();
  const receiveJump = new FlowGraphReceiveCustomEventBlock({ eventId: 'jump', eventData });
  mover.addEventBlock(receiveJump);
  const hop = new FlowGraphInterpolationBlock({ animationType: Constants.ANIMATIONTYPE_FLOAT, propertyName: 'position.y', keyFramesCount: 2 });
  hop.getDataInput('duration_0')!.setValue(0.45, moverCtx);
  hop.getDataInput('value_0')!.connectTo(receiveJump.getDataOutput('height')!);
  hop.getDataInput('duration_1')!.setValue(0.9, moverCtx);
  hop.getDataInput('value_1')!.setValue(0.5, moverCtx);
  const play = new FlowGraphPlayAnimationBlock();
  play.object.setValue(ball, moverCtx);
  play.animation.connectTo(hop.animation);
  receiveJump.done.connectTo(play.in);

  // Graph 3, another receiver of the same event: a CodeExecution block maps height to a
  // colour, and SetProperty paints the ball with it.
  const painter = coordinator.createGraph('painter');
  const painterCtx = painter.createContext();
  const receivePaint = new FlowGraphReceiveCustomEventBlock({ eventId: 'jump', eventData });
  painter.addEventBlock(receivePaint);
  const toColor = new FlowGraphCodeExecutionBlock({});
  toColor.executionFunction.setValue((h: number) => Color3.FromHSV(((h - 1.5) / 3.5) * 300, 0.75, 1), painterCtx);
  toColor.value.connectTo(receivePaint.getDataOutput('height')!);
  const paint = new FlowGraphSetPropertyBlock({ propertyName: 'material.diffuseColor', target: ball });
  paint.value.connectTo(toColor.result);
  receivePaint.done.connectTo(paint.in);

  coordinator.start();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Throttle.duration (s)', 0.5, 4, 0.1, 1.4, (v) => throttle.duration.setValue(v, senderCtx));
    // Code can raise the same event; every graph listening on the coordinator reacts.
    panel.button('coordinator.notifyCustomEvent("jump")', () =>
      coordinator.notifyCustomEvent('jump', { height: 5 }),
    );
  }
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.002;
  });

  return () => {
    coordinator.dispose();
    stage.dispose();
  };
};

export default mount;
