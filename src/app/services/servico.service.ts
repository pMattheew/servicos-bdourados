import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico.model';

@Injectable({
    providedIn: 'root'
})
export class ServicosService {
    public apiUrl: '';

    constructor(public http:HttpClient) { }

    getServicos(): Observable<Servico[]> {
        return this.http.get<Servico[]>('https://api-servicos-bdourados.herokuapp.com/public/api/servicos')
    }

    addServico(servico: Servico): Observable<Servico> {
        return this.http.post<Servico>('https://api-servicos-bdourados.herokuapp.com/public/api/servicos', servico);
    }
    
    updateServico(servicoId: number, servico: Servico): Observable<Servico> {
        return this.http.put<Servico>(`https://api-servicos-bdourados.herokuapp.com/public/api/servicos/${servicoId}`, servico);
    }
    
}