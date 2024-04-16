import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteData } from 'src/app/interfaces/estudiante.interface';
import { ProfesorData } from 'src/app/interfaces/profesor.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { NotasService } from 'src/app/services/notas.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})
export class CreateNotesComponent implements OnInit {

  form: FormGroup;
  estudiantes: EstudianteData[] = [];
  selectedEstudiante!: EstudianteData;
  profesores: ProfesorData[] = [];
  selectedProfesor!: ProfesorData;

  constructor(private fb: FormBuilder, private notasService: NotasService, private profesoresService: ProfesoresService, private estudiantesService: EstudiantesService,private router: Router) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      IdProfesor: ['', Validators.required],
      IdEstudiante: ['', Validators.required],
      Valor: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    })
  }

  ngOnInit(): void {
    this.estudiantesService.getEstudiantes()
    .subscribe(estudiantes => {
      this.estudiantes = estudiantes; 
    });
    this.profesoresService.getProfesores()
    .subscribe(profesores => {
        this.profesores = profesores;
    });
  }

  onEstudianteChange(estudiante: EstudianteData) {
    this.selectedEstudiante = estudiante;
  }

  onProfesorChange(profesor: ProfesorData) {
    this.selectedProfesor = profesor;
  }

  agregarNota() {
    this.notasService.createNota(this.form.value).subscribe(
      res => {
        Swal.fire({
          title: '¡Nota Creada!',
          text: 'La nota ha sido creada exitosamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/tabla-notas']);
        });
      },
      error => {
        Swal.fire({
          title: 'Error al crear la nota',
          text: error.message,
          icon: 'error',
        });
      }
    );
  }  

}
