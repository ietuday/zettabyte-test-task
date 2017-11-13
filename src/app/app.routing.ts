import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamMemeberComponent } from './team-memeber/team-memeber.component';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: 'team/:id', component: TeamListComponent },
  { path: 'team/:id/:secret/team-members', component: TeamMemeberComponent },
  
  

];

export const routing = RouterModule.forRoot(routes);
