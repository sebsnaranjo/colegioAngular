import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorData } from 'src/app/interfaces/profesor.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent {
  form: FormGroup;
  profesorId!: number;

  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.profesorId = +params['id'];
      this.profesorService
        .getProfesoreID(this.profesorId)
        .subscribe((profesor) => {
          this.form.patchValue(profesor); 
        });
    });
  }

  editarProfesor() {
    const profesor: ProfesorData = {
      IdProfesor: this.profesorId,
      Nombre: this.form.value['Nombre']
    };
  
    this.profesorService.editProfesore(profesor, this.profesorId).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El profesor se ha editado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/tabla-profesores']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al editar el profesor. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }  

}
