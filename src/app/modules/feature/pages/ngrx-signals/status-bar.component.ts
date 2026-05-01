import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerStore } from './player-store';
import { LoggingService, LoggingFactory } from 'fullswing-angular-library';

@Component({
  templateUrl: 'status-bar.component.html',
  selector: 'status-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  readonly playerStore = inject(PlayerStore);

  private readonly _loggingService: LoggingService;

  constructor(private loggingFactory: LoggingFactory)
  {
    this._loggingService = this.loggingFactory.create(this.constructor.name);
  }

  protected ngOnInit() {
    this._loggingService.debug('StatusBarComponent initialized');
  }
}
