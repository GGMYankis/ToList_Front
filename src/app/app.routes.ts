import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard, loginRedirectGuard } from './login.guard';
import { PruebaComponent } from './layout/pages/prueba/prueba.component';
import { getToken } from './Helpers/auth';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginRedirectGuard], // Maneja redirección dinámica aquí
    },
    {
        path: 'prueba',
        component: PruebaComponent,
        pathMatch: 'full',
    },
    {
        path: 'pages',
        loadChildren: () =>
            import('./layout/layout.routes').then((m) => m.routes),
        canActivate: [loginGuard]
    },
];
