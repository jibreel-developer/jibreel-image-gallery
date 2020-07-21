import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewImageModalComponent } from 'src/app/components/view-image-modal/view-image-modal.component';
import { ImageService } from 'src/app/services/image.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  sortBy = 'title';
  images: Image[] = [];
  baseUrl = environment.baseUrl;

  constructor(
    private modalService: NgbModal,
    private imageService: ImageService
  ) {}

  zoomImage(image: Image) {
    const modalRef = this.modalService.open(ViewImageModalComponent, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    modalRef.componentInstance.image = image;
  }

  sort() {
    this.images.sort((a, b) => {
      let A = this.sortBy == 'size' ? a.size : a.title;
      let B = this.sortBy == 'size' ? b.size : b.title;
      if (A > B) return 1;
      if (A < B) return -1;
      return 0;
    });
  }

  ngOnInit(): void {
    this.imageService.get.subscribe((images) => {
      this.images = [...images];
      this.sort();
    });
  }
}
