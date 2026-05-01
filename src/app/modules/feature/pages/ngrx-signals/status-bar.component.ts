import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player } from '@features/rpg/model/player';
import { LoggingService, LoggingFactory } from '@fullswing-angular-library';

@Component({
    templateUrl: 'status-bar.component.html',
    imports: [],
    selector: 'status-bar'
})
export class StatusBarComponent {
  public player!: Player;
  private readonly _loggingService: LoggingService;

  constructor(private store: Store<{ player: Player }>, private loggingFactory: LoggingFactory)
  {
    this._loggingService = this.loggingFactory.create(this.constructor.name);
    store.select('player').subscribe((player) => {
      console.log('player', player);
      this.player = player;
    });
  }

  protected ngOnInit() {
    this._loggingService.debug('StatusBarComponent initialized');
  }
}
