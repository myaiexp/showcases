// An ILoadingScreen that draws a DOM overlay with a message and a progress bar
import type { ILoadingScreen } from '@babylonjs/core';

export class OverlayLoadingScreen implements ILoadingScreen {
  public loadingUIBackgroundColor = '#101830';
  private readonly _overlay: HTMLDivElement;
  private readonly _label: HTMLDivElement;
  private readonly _bar: HTMLDivElement;
  private _text = '';

  /** `host` must be positioned (relative), the overlay covers it entirely. */
  constructor(host: HTMLElement, text: string) {
    this._overlay = document.createElement('div');
    Object.assign(this._overlay.style, { position: 'absolute', inset: '0', display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#fff', font: 'bold 18px sans-serif', zIndex: '5' });
    this._label = document.createElement('div');
    const track = document.createElement('div');
    Object.assign(track.style, { width: '50%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' });
    this._bar = document.createElement('div');
    Object.assign(this._bar.style, { width: '0%', height: '100%', background: '#ffd36b' });
    track.append(this._bar);
    this._overlay.append(this._label, track);
    host.append(this._overlay);
    this.loadingUIText = text;
  }

  /** The engine sets this (engine.loadingUIText) while it loads. */
  public get loadingUIText(): string {
    return this._text;
  }
  public set loadingUIText(value: string) {
    this._text = value;
    this._label.textContent = value;
  }

  public setProgress(fraction: number): void {
    this._bar.style.width = `${Math.round(fraction * 100)}%`;
  }

  public displayLoadingUI(): void {
    this._overlay.style.background = this.loadingUIBackgroundColor;
    this._overlay.style.display = 'flex';
  }

  public hideLoadingUI(): void {
    this._overlay.style.display = 'none';
  }

  public dispose(): void {
    this._overlay.remove();
  }
}
