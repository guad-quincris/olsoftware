import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rol, State, Usuario } from '../interfaces/usuario';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  @Input() user: Usuario;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();

  public rol = Object.keys(Rol)
    .slice(Object.keys(Rol).length/2)
    .map(key => ({
      label: key,
      key: Rol[key]
    }));


  public state = Object.keys(State)
    .slice(Object.keys(State).length/2)
    .map(key => ({
      label: key,
      key: State[key]
    }));

  constructor(private userService: UsersService ) { }

  ngOnInit() {
  }

  private newUser(userFormValue){
    const key = this.userService.addUser(userFormValue).key;
    const userFormValueKey = {
      ...userFormValue,
      key
    }
  }

  private editUser(userFormValue){
    const userFormValueWithKey = {...userFormValue, $key: this.user.$key};
    const userFormValueWithFormattedKey = {...userFormValue, key: this.user.$key};
    delete userFormValueWithFormattedKey.$key;
  };

  onSubmit(userForm: NgForm){
    const userFormValue = {... userForm.value} ;
    if(userForm.valid){
      userFormValue.rol = userFormValue.rol ==='' ? false : userFormValue.rol;
    }
    if(userForm.valid){
      userFormValue.state = userFormValue.state ==='' ? false : userFormValue.state;
    }
    this.newUser(userFormValue);
    window.location.replace('#');
  }

  onClose(){
    this.closeDialog.emit(true);
  }

}
