import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [ServerModule],
  providers: [provideServerRouting(serverRoutes)],
})
export class AppServerModule {}
