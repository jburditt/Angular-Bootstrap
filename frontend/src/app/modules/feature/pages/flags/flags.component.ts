import { Component } from '@angular/core';
import { ConfigService } from '@fullswing-angular-library';
import { FeatureEnabledDirective } from '@fullswing-angular-library';
import { KeyValuePipe } from '@angular/common';

@Component({
  imports: [FeatureEnabledDirective, KeyValuePipe],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css'
})
export class FlagsPageComponent {
  featureFlags = this.configService.config.featureFlags;

  constructor(private configService: ConfigService) { }
}
