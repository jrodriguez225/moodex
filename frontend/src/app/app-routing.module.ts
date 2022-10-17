import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SignInComponent } from './components/signIn/signIn.component';
import { PrivateComponent } from './components/private/private.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signIn',
    pathMatch: 'full'
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }