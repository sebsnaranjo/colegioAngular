import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfesorData } from 'src/app/interfaces/profesor.interface';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-teacher',
  templateUrl: './table-teacher.component.html',
  styleUrls: ['./table-teacher.component.css']
})
export class TableTeacherComponent implements OnInit{

  listProfesores: ProfesorData[] = [];

  displayedColumns: string[] = ['IdProfesor', 'Nombre', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private profesorService: ProfesoresService, private router: Router) {}

  ngOnInit(): void {
    this.getProfesores();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    } else {
      console.error('Paginator is still not defined after view init');
    }
  }

  getProfesores(){
    this.profesorService.getProfesores().subscribe(
      res => {
        this.listProfesores = res;
        this.dataSource = new MatTableDataSource(this.listProfesores)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarProfesor(element: any){
    const idProfesor = element.IdProfesor;
    this.router.navigate(['/editar-profesor', idProfesor]);
  }

  eliminarProfesor(element: any) {
    const idProfesor = element.IdProfesor;
  
    this.profesorService.deleteProfesor(idProfesor).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El profesor se ha eliminado correctamente.",
          icon: "success",
        }).then(() => {
          this.getProfesores();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al eliminar el profesor. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  

}
