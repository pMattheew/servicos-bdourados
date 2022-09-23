import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../servicos/servico.model';

@Injectable({
    providedIn: 'root'
})
export class ServicosService {
    public apiUrl: '';

    constructor(public http:HttpClient) { }

    getServicos(): Observable<Servico[]> {
        return this.http.get<Servico[]>('https://api-servicos-bdourados.herokuapp.com/public/api/servicos')
    }
}