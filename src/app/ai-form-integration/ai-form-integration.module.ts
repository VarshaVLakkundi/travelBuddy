import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AiFormIntegrationRoutingModule } from './ai-form-integration-routing.module';
import { AiFormIntegrationComponent } from './ai-form-integration.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { MyRetryInterceptor } from '../utilities/token-interceptor';

@NgModule({
  declarations: [
    AiFormIntegrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AiFormIntegrationRoutingModule,
    HttpClientModule
  ],
  exports: [
    AiFormIntegrationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:MyRetryInterceptor , multi: true },
  ]
})
export class AiFormIntegrationModule { }
