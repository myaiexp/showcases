// A simulated 25-joint WebXR hand with curl and pinch controls
import * as pc from 'playcanvas';

/** What the example reads from an XrJoint; the simulation provides the same three members. */
export interface JointLike {
  readonly id: string;
  readonly radius: number;
  readonly tip: boolean;
  readonly wrist: boolean;
  readonly finger: number;
  getPosition(): pc.Vec3;
}

const FINGERS = ['thumb', 'index-finger', 'middle-finger', 'ring-finger', 'pinky-finger'] as const;
const PARTS = ['metacarpal', 'phalanx-proximal', 'phalanx-intermediate', 'phalanx-distal', 'tip'] as const;

/** The WebXR joint ids in the order XrHand.joints lists them: wrist, then each finger. */
export const JOINT_IDS: string[] = ['wrist'];
for (const f of FINGERS) for (const p of PARTS) if (!(f === 'thumb' && p === 'phalanx-intermediate')) JOINT_IDS.push(`${f}-${p}`);

const SEGMENT = [0.045, 0.04, 0.025, 0.02, 0.012];
const SPREAD = [0.035, 0.02, 0, -0.02, -0.038];
const OPEN_ANGLE = [20, 0, 0, 0, 0];

export class SimHand {
  readonly joints: JointLike[] = [];
  private local: pc.Vec3[] = [];
  private world: pc.Vec3[] = [];

  private root: pc.Entity;

  constructor(root: pc.Entity) {
    this.root = root;
    JOINT_IDS.forEach((id, i) => {
      this.local.push(new pc.Vec3());
      this.world.push(new pc.Vec3());
      const finger = FINGERS.findIndex((f) => id.startsWith(f));
      this.joints.push({
        id,
        radius: id.endsWith('tip') ? 0.006 : id === 'wrist' ? 0.02 : 0.009,
        tip: id.endsWith('tip'),
        wrist: id === 'wrist',
        finger,
        getPosition: () => this.world[i]!,
      });
    });
  }

  /** curl 0 open to 1 fist; pinch 0 to 1 brings the thumb tip to the index tip. */
  pose(curl: number, pinch: number): void {
    let n = 1;
    this.local[0]!.set(0, 0, 0);
    const tips: pc.Vec3[] = [];
    FINGERS.forEach((f, fi) => {
      const parts = f === 'thumb' ? 4 : 5;
      const p = new pc.Vec3(SPREAD[fi]!, f === 'thumb' ? -0.01 : 0, f === 'thumb' ? -0.02 : -0.01);
      let angle = OPEN_ANGLE[fi]! * (Math.PI / 180);
      for (let j = 0; j < parts; j++) {
        if (j > 0) {
          const bend = (f === 'thumb' ? 0.5 : j === 1 ? 1.2 : 1.5) * curl * (fi === 1 ? 1 - 0.65 * pinch : 1);
          angle += j === 1 ? bend * 0.8 : bend * 0.5;
          if (f === 'thumb') p.x += 0.018;
          p.y += -Math.sin(angle) * SEGMENT[j]!;
          p.z += -Math.cos(angle) * SEGMENT[j]!;
        }
        this.local[n++]!.copy(p);
      }
      tips.push(p.clone());
    });
    // Pinch: slide each thumb joint toward where the index tip is, more toward the tip.
    const indexTip = tips[1]!;
    const thumbTip = tips[0]!;
    for (let j = 1; j <= 4; j++) {
      const w = (j / 4) ** 2 * pinch;
      this.local[j]!.x += (indexTip.x - thumbTip.x) * w;
      this.local[j]!.y += (indexTip.y - thumbTip.y) * w;
      this.local[j]!.z += (indexTip.z - thumbTip.z) * w;
    }
    const m = this.root.getWorldTransform();
    this.local.forEach((v, i) => m.transformPoint(v, this.world[i]!));
  }

  /** Distance between the thumb tip and the index tip, in metres. */
  pinchDistance(): number {
    return this.world[4]!.distance(this.world[9]!);
  }
}
