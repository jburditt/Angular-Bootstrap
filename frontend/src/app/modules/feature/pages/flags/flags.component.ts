import { Component } from '@angular/core';
import { ConfigService } from '@fullswing-angular-library';
import { FeatureEnabledDirective } from '@fullswing-angular-library';

@Component({
  imports: [FeatureEnabledDirective],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css'
})
export class FlagsPageComponent {
  featureFlags: Array<{ name: string, enabled: boolean }>;

  constructor(private configService: ConfigService)
  {
    this.featureFlags = Object
      .entries(this.configService.config.featureFlags)
      .map(([name, enabled]) => ({ name, enabled }));

    console.log('Feature Flags:', this.featureFlags);
  }
}
