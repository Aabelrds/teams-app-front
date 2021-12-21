import { AuthService } from './../services/auth.service';
import { TeamService } from './../services/team.service';
import { Team } from './../teams/team';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title:string = "New Team"
  team: Team = new Team();

  constructor(private teamService:TeamService,
    private router: Router,
     private activatedRoute: ActivatedRoute,
     private authService:AuthService) { }

  ngOnInit(): void {

    if (this.authService.usuario.username== null) {
      swal('Error', `Debes Iniciar Sesion!`, 'error');
      this.router.navigate(['/login']);
    }

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.teamService.getTeam(id).subscribe((team) => this.team = team);
      }
    });

  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.team);
    this.teamService.create(this.team)
    .subscribe(
      team => {
        this.router.navigate(['/teams']);
        swal('Nuevo cliente', `El cliente ${this.team.name} ha sido creado con éxito`, 'success');
      },
      err => {
       // this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.team);
    this.teamService.update(this.team)
      .subscribe(
        team => {
          this.router.navigate(['/teams']);
          swal('Cliente Actualizado', `${this.team.name}`, 'success');
        },
        err => {
          //this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }
}
