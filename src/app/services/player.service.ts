import { Injectable } from '@angular/core';
import { Player } from './../players/player';
import { Team } from './../teams/team';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { of,Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  urlEndPoint:string = 'http://localhost:8080/api/players';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http:HttpClient,private authService:AuthService) { }


   agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getPlayers(): Observable<Player[]>{
    //return of(Players);
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Player[] )
    );
  }

  create(player: Player) : Observable<Team> {
    return this.http.post<Team>(this.urlEndPoint, player, { headers: this.agregarAuthorizationHeader() })
  }


  getPlayer(id:number): Observable<Player>{
    return this.http.get<Player>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(player: Player): Observable<Player>{
    return this.http.put<Player>(`${this.urlEndPoint}/${player.id}`, player, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Player>{
    return this.http.delete<Player>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }


  subirFoto(archivo: File, id:any): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
     resp => resp
    );

  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.urlEndPoint + '/teams', { headers: this.agregarAuthorizationHeader() }).pipe(
      map( (response) => response as Team[] )
    );
  }
}
