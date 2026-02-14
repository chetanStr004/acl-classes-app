import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Contact } from './components/contact/contact';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dashboard/admin/admin-dashboard.component';
import { StudentDashboardComponent } from './components/dashboard/student/student-dashboard.component';
import { ManageBatchesComponent } from './components/dashboard/admin/manage-batches/manage-batches.component';
import { RegisterStudentComponent } from './components/dashboard/admin/register-student/register-student.component';
import { BatchStudentsComponent } from './components/dashboard/admin/batch-students/batch-students.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'batches', pathMatch: 'full' },
      { path: 'batches', component: ManageBatchesComponent },
      { path: 'register', component: RegisterStudentComponent },
      { path: 'students', component: BatchStudentsComponent }
    ]
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'my-batch', pathMatch: 'full' },
      { path: 'my-batch', loadComponent: () => import('./components/dashboard/student/my-batch/my-batch').then(m => m.MyBatch) },
      { path: 'all-batches', loadComponent: () => import('./components/dashboard/student/all-batches/all-batches').then(m => m.AllBatches) }
    ]
  }
];
