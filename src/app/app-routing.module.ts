import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JourneyBuddyComponent } from './journey-buddy/journey-buddy.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'journey',
    component: JourneyBuddyComponent
  },
  { path: 'aiForm', loadChildren: () => import('./ai-form-integration/ai-form-integration.module').then(m => m.AiFormIntegrationModule) },
  {
    path: '**',
    redirectTo: '/journey'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
