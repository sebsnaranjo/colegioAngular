import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteData } from 'src/app/interfaces/estudiante.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})

export class TableInfoComponent implements OnInit {

  listEstudiantes: EstudianteData[] = [];

  displayedColumns: string[] = ['IdEstudiante', 'Nombre', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private estudianteService: EstudiantesService, private router: Router) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    } else {
      console.error('Paginator is still not defined after view init');
    }
  }

  getEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(
      res => {
        this.listEstudiantes = res;
        this.dataSource = new MatTableDataSource(this.listEstudiantes)
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

  editarEstudiante(element: any){
    const idEstudiante = element.IdEstudiante;
    this.router.navigate(['/editar-estudiante', idEstudiante]);
  }

  eliminarEstudiante(element: any) {
    const idEstudiante = element.IdEstudiante;
  
    this.estudianteService.deleteEstudiante(idEstudiante).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "El estudiante se ha eliminado correctamente.",
          icon: "success",
        }).then(() => {
          this.getEstudiantes();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al eliminar el estudiante. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }  
}
