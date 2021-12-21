import { AuthService } from './../services/auth.service';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from './team';

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

}
