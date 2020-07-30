import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';


const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'abonos-totales',
    loadChildren: () => import('./pages/abonos-totales/abonos-totales.module').then( m => m.AbonosTotalesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'transferencias-totales',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./pages/transferencias-totales/transferencias-totales.module').then( m => m.TransferenciasTotalesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'abonos',
    loadChildren: () => import('./pages/abonos/abonos.module').then( m => m.AbonosPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'compartir-saldo',
    loadChildren: () => import('./pages/compartir-saldo/compartir-saldo.module').then( m => m.CompartirSaldoPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab1'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
