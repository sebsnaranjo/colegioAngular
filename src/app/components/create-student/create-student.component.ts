import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit{

  form: FormGroup;

  constructor(private fb: FormBuilder, private estudiantesSerive: EstudiantesService, private router: Router) {
    this.form = this.fb.group({
      Nombre: ['Julian', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  agregarEstudiante() {
    this.estudiantesSerive.createEstudiante(this.form.value).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El estudiante se ha creado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/tabla-estudiantes']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al crear el estudiante. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  
}
