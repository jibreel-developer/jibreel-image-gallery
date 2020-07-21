import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ImageAddCardComponent } from '../image-add-card/image-add-card.component';
import { from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-uloader',
  templateUrl: './images-uloader.component.html',
  styleUrls: ['./images-uloader.component.scss'],
})
export class ImagesUloaderComponent implements OnInit {
  counter = [0];
  submitting = false;

  @ViewChildren(ImageAddCardComponent) listOfImageAddCard: QueryList<
    ImageAddCardComponent
  >;

  constructor(private imageService: ImageService, private router: Router) {}

  onSubmit() {
    this.submitting = true;
    from(this.listOfImageAddCard.map((i) => i))
      .pipe(
        mergeMap((request) => {
          return this.imageService.post(request.formData);
        })
      )
      .subscribe(
        null,
        () => (this.submitting = false),
        () => {
          // to stay on same page
          // this.submitting = false;
          // this.counter = [];
          // setTimeout(() => (this.counter = [0]));

          alert('all created successfully!');

          // to navigate to list
          this.router.navigateByUrl('/list');
        }
      );
  }

  isAllFormValid() {
    return this.listOfImageAddCard
      ?.map(
        (i) =>
          !!i.formData.get('image') &&
          !!i.formData.get('title') &&
          !!i.formData.get('description')
      )
      .every((i) => i);
  }

  ngOnInit(): void {}
}
