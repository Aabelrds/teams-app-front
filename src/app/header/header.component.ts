import swal  from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router : Router) { }

  ngOnInit(): void {


  }

  logOut():void{
    let userName = this.authService.usuario.username;
    this.authService.logout();
    swal('Succes', `${userName}, You have successfully logged out! `, 'success');
    this.router.navigate(['/login']);
  }

}
