import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: './products/product.module#ProductModule', // lazy loading
/*     canActivate:  [AuthGuard], */
    canLoad: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // imports: [RouterModule.forRoot(ROUTES, { enableTracing: true })],
  imports: [RouterModule.forRoot(
              ROUTES,
              {
                enableTracing: true,
                preloadingStrategy: PreloadAllModules
              }
              )],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }


