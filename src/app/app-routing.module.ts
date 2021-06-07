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
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then( m => m.ScannerPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'canjes',
    loadChildren: () => import('./pages/canjes/canjes.module').then( m => m.CanjesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'movimientos',
    loadChildren: () => import('./pages/movimientos/movimientos.module').then( m => m.MovimientosPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'formulario',
    loadChildren: () => import('./pages/formulario/formulario.module').then( m => m.FormularioPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'youtube',
    loadChildren: () => import('./pages/youtube/youtube.module').then( m => m.YoutubePageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab2'
  }
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
