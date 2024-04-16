import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstudianteData } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  urlAPI = '/api/Estudiantes';

  constructor(private http: HttpClient) { }

  getEstudiantes(){
    return this.http.get<any>(`${this.urlAPI}/GetAll`);
  }

  getEstudianteID(id: number){
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  createEstudiante(estudiante: EstudianteData) {
    return this.http.post<any>(`${this.urlAPI}/Create`, estudiante);
  }

  editEstudiante(estudiante: EstudianteData, id: number) {
    return this.http.put<any>(`${this.urlAPI}/${id}`, estudiante);
  }

  deleteEstudiante(id: number) {
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }


}
