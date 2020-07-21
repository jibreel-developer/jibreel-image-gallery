import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  get user() {
    return this.userService.details;
  }

  openLoginPopup() {
    this.modalService.open(LoginModalComponent);
  }

  logout() {
    this.userService.logout();
  }
}
