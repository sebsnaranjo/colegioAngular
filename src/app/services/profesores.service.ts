import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfesorData } from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  urlAPI = '/api/Profesor';

  constructor(private http: HttpClient) { }

  getProfesores(){
    return this.http.get<any>(`${this.urlAPI}/GetAll`);
  }

  getProfesoreID(id: number){
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  createProfesore(profesor: ProfesorData) {
    return this.http.post<any>(`${this.urlAPI}/Create`, profesor);
  }

  editProfesore(profesor: ProfesorData, id: number) {
    return this.http.put<any>(`${this.urlAPI}/${id}`, profesor);
  }

  deleteProfesor(id: number) {
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }
}
