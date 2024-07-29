import { Routes } from '@angular/router';

export const PagesRoutes: Routes = [
  {
    path: '', redirectTo: 'integration', pathMatch: 'full'
  },
  {
    path: 'integration', loadChildren: () => import('./integration/integration.module').then((m) => m.IntegrationModule)
  },
  {
    path: 'leadGen-forms', loadChildren: () => import('./forms/forms.module').then((m) => m.LeadFormsModule)
  }
];
