// A script that logs through console.log, warn, error, info and debug
import * as pc from 'playcanvas';

export type Level = 'log' | 'info' | 'warn' | 'error' | 'debug';
export type Sink = (level: Level, text: string) => void;

/**
 * Walks towards an entity named RequiredTarget and reports what it does, the way the
 * console-logging page suggests: context in every message, one level per kind of event,
 * conditional logging so the console does not fill with one line per frame.
 */
export class Mover extends pc.Script {
  static override scriptName = 'mover';
  speed = 1.5;
  sink: Sink = () => {};
  private target: pc.Entity | null = null;
  private reached = false;
  private warned = 0;
  private time = 0;

  initialize(): void {
    this.target = this.app.root.findByName('RequiredTarget') as pc.Entity | null;
    if (!this.target) {
      // console.error: something that stops the script from working.
      this.sink('error', `Critical Error: Could not find RequiredTarget! Disabling script on ${this.entity.name}.`);
      this.enabled = false;
      return;
    }
    // console.log: status, with the value that matters.
    this.sink('log', `${this.entity.name} initialized at ${this.entity.getPosition().toString()}`);
  }

  update(dt: number): void {
    if (!this.target) return;
    this.time += dt;
    if (this.app.keyboard?.wasPressed(pc.KEY_SPACE)) this.sink('info', `${this.entity.name}: spacebar pressed at t=${this.time.toFixed(1)}s`);
    if (this.speed < 0) {
      // console.warn: unexpected, but not fatal. Throttled to once a second.
      if (this.time - this.warned > 1) {
        this.warned = this.time;
        this.sink('warn', `Warning: speed is negative (${this.speed}). Is this intentional?`);
      }
    }
    const to = this.target.getPosition().clone().sub(this.entity.getPosition());
    const distance = to.length();
    if (distance > 0.05) this.entity.translate(to.normalize().mulScalar(this.speed * dt));
    // Conditional logging: only the frame that crosses the threshold prints.
    const near = distance < 0.4;
    if (near !== this.reached) {
      this.reached = near;
      this.sink('debug', near ? `${this.entity.name}: within 0.4 of the target (${distance.toFixed(2)})` : `${this.entity.name}: left the target`);
    }
  }
}
