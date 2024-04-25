import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteData } from 'src/app/interfaces/estudiante.interface';
import { NotaData } from 'src/app/interfaces/nota.interface';
import { ProfesorData } from 'src/app/interfaces/profesor.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { NotasService } from 'src/app/services/notas.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.css']
})
export class EditNotesComponent {
  form: FormGroup;
  notasID!: number;

  estudiantes: EstudianteData[] = [];
  selectedEstudiante!: EstudianteData;
  profesores: ProfesorData[] = [];
  selectedProfesor!: ProfesorData;

  constructor(
    private fb: FormBuilder,
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      IdProfesor: ['', Validators.required],
      IdEstudiante: ['', Validators.required],
      Valor: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.notasID = +params['id'];
      this.notasService
        .getNotasID(this.notasID)
        .subscribe((notas) => {
          this.form.patchValue(notas);
        });
    });

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

  editarNota() {
    const nota = {
      IdNota: this.notasID,
      Nombre: this.form.value['Nombre'],
      IdEstudiante: this.form.value['IdEstudiante'],
      IdProfesor: this.form.value['IdProfesor'],
      Valor: this.form.value['Valor'],
    };
    this.notasService.editNota(nota, this.notasID).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "La nota se ha editado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/tabla-notas']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al editar la nota. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  

}
