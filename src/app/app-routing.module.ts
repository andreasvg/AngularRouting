import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: './products/product.module#ProductModule', // lazy loading
    canActivate:  [AuthGuard],
    data: { preload: true }
  },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
              ROUTES,
              {
                enableTracing: true,
                preloadingStrategy: SelectiveStrategy
              }
              )],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }


//     canLoad: [AuthGuard]
