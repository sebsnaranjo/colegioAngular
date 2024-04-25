import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteData } from 'src/app/interfaces/estudiante.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent {
  form: FormGroup;
  estudianteId!: number;

  constructor(
    private fb: FormBuilder,
    private estudiantesSerive: EstudiantesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      Nombre: ['Julian', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.estudianteId = +params['id'];
      this.estudiantesSerive
        .getEstudianteID(this.estudianteId)
        .subscribe((estudiante) => {
          this.form.patchValue(estudiante);
        });
    });
  }

  editarEstudiante() {
    const estudiante: EstudianteData = {
      IdEstudiante: this.estudianteId,
      Nombre: this.form.value['Nombre']
    };
  
    this.estudiantesSerive.editEstudiante(estudiante, this.estudianteId).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El estudiante se ha editado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/tabla-estudiantes']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al editar el estudiante. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  

}
