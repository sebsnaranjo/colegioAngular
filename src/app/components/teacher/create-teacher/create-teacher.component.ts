import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit{

  form: FormGroup;

  constructor(private fb: FormBuilder, private profesorService: ProfesoresService, private router: Router) {
    this.form = this.fb.group({
      Nombre: ['Julian', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  agregarProfesor() {
    this.profesorService.createProfesore(this.form.value).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El profesor se ha creado correctamente.",
          icon: "success",
        }).then(() => {
          this.router.navigate(['/tabla-profesores']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al crear el profesor. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  

}
