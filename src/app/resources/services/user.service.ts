import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    constructor(public http:HttpClient) { }

    registrarUsuario(usuario: Usuario): Observable<Usuario>
    {        
        return this.http.post<Usuario>('https://api-servicos-bdourados.herokuapp.com/public/api/register', usuario);
    }

    logarUsuario(usuario: Usuario): Observable<Usuario>
    {        
        return this.http.post<Usuario>('https://api-servicos-bdourados.herokuapp.com/public/api/login', usuario);
    }

    estaLogado() {
       return (localStorage.getItem('isLogged') == 'true') ? true : false
    }

    logar() {
        return localStorage.setItem('isLogged', 'true');
    }

    deslogar() {
        return localStorage.setItem('isLogged', 'false');
    }

}