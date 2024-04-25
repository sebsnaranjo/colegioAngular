import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TableInfoComponent } from './components/student/table-info/table-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateStudentComponent } from './components/student/create-student/create-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { CreateTeacherComponent } from './components/teacher/create-teacher/create-teacher.component';
import { TableTeacherComponent } from './components/teacher/table-teacher/table-teacher.component';
import { EditTeacherComponent } from './components/teacher/edit-teacher/edit-teacher.component';
import { TableNotesComponent } from './components/notes/table-notes/table-notes.component';
import { CreateNotesComponent } from './components/notes/create-notes/create-notes.component';
import { EditNotesComponent } from './components/notes/edit-notes/edit-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    TableInfoComponent,
    HomeComponent,
    CreateStudentComponent,
    EditStudentComponent,
    CreateTeacherComponent,
    TableTeacherComponent,
    EditTeacherComponent,
    TableNotesComponent,
    CreateNotesComponent,
    EditNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
