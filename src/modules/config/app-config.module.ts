import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { APP_CONFIG_PROVIDER } from './tokens';

@Global()
@Module({
  providers: [{ provide: APP_CONFIG_PROVIDER, useClass: AppConfigService }],
  exports: [APP_CONFIG_PROVIDER],
})
export class AppConfigModule {}
