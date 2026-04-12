import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Members } from './pages/members/members';
import { Donations } from './pages/donations/donations';
import { Committees } from './pages/committees/committees';
import { News } from './pages/news/news';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'members', component: Members },
  { path: 'donations', component: Donations },
  { path: 'committees', component: Committees },
  { path: 'news', component: News },
  { path: '**', redirectTo: '' }
];
