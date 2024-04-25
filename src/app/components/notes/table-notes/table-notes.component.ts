import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotaData } from 'src/app/interfaces/nota.interface';
import { NotasService } from 'src/app/services/notas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-notes',
  templateUrl: './table-notes.component.html',
  styleUrls: ['./table-notes.component.css']
})
export class TableNotesComponent implements OnInit {

  listNotas: NotaData[] = [];

  displayedColumns: string[] = ['IdNota', 'Nombre', 'NombreProfesor','NombreEstudiante','Valor', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private notasService: NotasService, private router: Router) {}


  ngOnInit(): void {
    this.getNotas();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    } else {
      console.error('Paginator is still not defined after view init');
    }
  }

  getNotas(){
    this.notasService.getNotas().subscribe(
      res => {
        this.listNotas = res;
        this.dataSource = new MatTableDataSource(this.listNotas)
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

  editarNota(element: any){
    const idNota = element.IdNota;
    this.router.navigate(['/editar-nota', idNota]);
  }

  eliminarNota(element: any) {
    const idNota = element.IdNota;
  
    this.notasService.deleteNota(idNota).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "La nota se ha eliminado correctamente.",
          icon: "success",
        }).then(() => {
          this.getNotas();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al eliminar la nota. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    );
  }
  

}
