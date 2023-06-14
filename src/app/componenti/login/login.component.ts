
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../servizi/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() buttonClick = new EventEmitter<void>();

  openL() {

    this.buttonClick.emit();

  }


}
