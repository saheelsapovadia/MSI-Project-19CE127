import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projectmanagement/projects/projects.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './usermanagement/users/users.component';
const routes: Routes = [
   {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'projects',
        component: ProjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
