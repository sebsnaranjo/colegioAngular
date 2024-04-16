import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableInfoComponent } from './components/table-info/table-info.component';
import { HomeComponent } from './components/home/home.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { TableTeacherComponent } from './components/table-teacher/table-teacher.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { TableNotesComponent } from './components/table-notes/table-notes.component';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'tabla-estudiantes', component:TableInfoComponent},
  {path: 'crear-estudiante', component:CreateStudentComponent},
  {path: 'editar-estudiante/:id', component:EditStudentComponent},

  {path: 'tabla-profesores', component:TableTeacherComponent},
  {path: 'crear-profesor', component:CreateTeacherComponent},
  {path: 'editar-profesor/:id', component:EditTeacherComponent},

  {path: 'tabla-notas', component:TableNotesComponent},
  {path: 'crear-nota', component:CreateNotesComponent},
  {path: 'editar-nota/:id', component:EditNotesComponent},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
