import { Routes } from '@angular/router';
import { CebollaComponent } from './cebolla/cebolla.component';

export const routes: Routes = [
    {path:'cebolla',component: CebollaComponent},
    { path: '', redirectTo: 'cebolla', pathMatch: 'full' },
    { path: '**', component: CebollaComponent },
    { path: '**', redirectTo: 'cebolla', pathMatch: 'full' }
];

