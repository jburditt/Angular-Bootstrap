import { Component, inject, OnDestroy } from '@angular/core';

import { StatusBarComponent } from './status-bar.component';
import { MatButton } from "@angular/material/button";
import { PlayerStore } from './player-store';

@Component({
  standalone: true,
  templateUrl: 'ngrx-signals.component.html',
  imports: [StatusBarComponent, MatButton],
  styleUrls: ['ngrx-signals.component.scss']
})
export class NgRxSignalComponent {
  readonly playerStore = inject(PlayerStore);

  protected damage() {
    this.playerStore.damage(10);
  }

  protected heal() {
    this.playerStore.heal(10);
  }
}
