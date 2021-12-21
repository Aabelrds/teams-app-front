import { AuthService } from './../services/auth.service';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from './team';
import swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams!:Team[];

  constructor(private teamService: TeamService, public authService: AuthService) { }

  ngOnInit(): void {

    this.teamService.getTeams().subscribe((

      teams:Team[]) => this.teams = teams
    );
  }
  delete(team: Team): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${team.name}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result:SweetAlertResult) => {
      if (result.value) {

        this.teamService.delete(team.id).subscribe(
          () => {
            this.teams = this.teams.filter(tea => tea !== team)
            swal(
              'Deleted Team!',
              `Team ${team.name} deleted successfully.`,
              'success'
            )
          }
        )

      }
    });
  }

}
