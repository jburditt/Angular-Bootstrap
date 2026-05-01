import { Component, inject, OnDestroy } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { CommonModule } from '@angular/common';
import { damage, heal } from '@features/rpg/store/player.actions';
import { Player } from '@features/rpg/model/player';
import { StatusBarComponent } from './status-bar.component';
import { MatButton } from "@angular/material/button";
import { PlayerStore } from './player-store';

@Component({
  standalone: true,
  templateUrl: 'ngrx-signals.component.html',
  imports: [CommonModule, StatusBarComponent, MatButton],
  styleUrls: ['ngrx-signals.component.scss']
})
export class NgRxSignalComponent implements OnDestroy {
  //player!: Player;
  readonly playerStore = inject(PlayerStore);

  constructor() {

  }

  ngOnDestroy(): void {
    //this.playerStore.select('player').unsubscribe();
  }

  protected damage() {
    this.playerStore.damage(10);
  }

  protected heal() {
    this.playerStore.heal(10);
  }
}
