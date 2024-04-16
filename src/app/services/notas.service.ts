import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaData } from '../interfaces/nota.interface';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  urlAPI = '/api/Notas';

  constructor(private http: HttpClient) { }

  getNotas(){
    return this.http.get<any>(`${this.urlAPI}/GetAll`);
  }

  getNotasID(id: number){
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  createNota(nota: NotaData) {
    return this.http.post<any>(`${this.urlAPI}/Create`, nota);
  }

  editNota(nota: any, id: number) {
    return this.http.put<any>(`${this.urlAPI}/${id}`, nota);
  }

  deleteNota(id: number) {
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }
}
