import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {
  public users$: Observable<Usuario[]>;
  public selectedUser: Usuario;
  public showModal = false;

  constructor(private userService: UsersService,
    ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }
  newUser(){
    this.showModal = true;
    this.selectedUser = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });

  }

  editUser(user: Usuario){
    this.selectedUser = {...user};
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }
  deleteUser(user: Usuario){};

  closeDialog(){
    this.showModal = false;
  }

}
