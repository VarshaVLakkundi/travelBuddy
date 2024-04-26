import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiFormIntegrationComponent } from './ai-form-integration.component';

const routes: Routes = [{ path: '', component: AiFormIntegrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiFormIntegrationRoutingModule { }
