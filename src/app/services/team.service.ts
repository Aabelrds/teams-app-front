import { Player } from './../players/player';
import { Team } from './../teams/team';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { of,Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  urlEndPoint:string = 'http://localhost:8080/api/teams';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http:HttpClient,private authService:AuthService) { }


   agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getTeams(): Observable<Team[]>{
    //return of(TEAMS);
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Team[] )
    );
  }

  create(team: Team) : Observable<Team> {
    return this.http.post<Team>(this.urlEndPoint, team, { headers: this.agregarAuthorizationHeader() })
  }


  getTeam(id:number): Observable<Team>{
    return this.http.get<Team>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(team: Team): Observable<Team>{
    return this.http.put<Team>(`${this.urlEndPoint}/${team.id}`, team, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Team>{
    return this.http.delete<Team>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.urlEndPoint + '/players', { headers: this.agregarAuthorizationHeader() }).pipe(
      map( (response) => response as Player[] )
    );
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


}
