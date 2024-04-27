import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JourneyBuddyComponent } from './journey-buddy/journey-buddy.component';
import { HomeComponent } from './home/home.component';
import { AiFormIntegrationModule } from './ai-form-integration/ai-form-integration.module'
import { MyRetryInterceptor } from './utilities/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    JourneyBuddyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AiFormIntegrationModule,
    HttpClientModule
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyRetryInterceptor , multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
