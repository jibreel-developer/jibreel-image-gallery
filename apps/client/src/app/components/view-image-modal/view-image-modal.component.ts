import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-image-modal',
  templateUrl: './view-image-modal.component.html',
  styleUrls: ['./view-image-modal.component.scss'],
})
export class ViewImageModalComponent implements OnInit {
  @Input() image?: Image;

  baseUrl = environment.baseUrl;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
