import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  submitting = false;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  onSubmit(form: NgForm) {
    this.submitting = true;
    this.userService.login(form.value).subscribe(
      () => this.activeModal.close(),
      () => (this.submitting = false)
    );
  }

  ngOnInit(): void {}
}
