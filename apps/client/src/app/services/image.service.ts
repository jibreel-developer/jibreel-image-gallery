import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IMAGES_CURD } from '../util/api';
import { ReplaySubject, Subject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagesObservable: Subject<Image[]> = new ReplaySubject(1);
  get = this.imagesObservable.asObservable();
  private images: Image[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Image[]>(IMAGES_CURD).subscribe((images) => {
      this.images = images;
      this.imagesObservable.next(this.images.map((i) => ({ ...i })));
    });
  }

  post(image: FormData) {
    return this.http.post<Image>(IMAGES_CURD, image).pipe(
      tap((image) => {
        this.images.push(image);
        this.imagesObservable.next(this.images.map((i) => ({ ...i })));

        if (image instanceof HttpResponse) {
        }
      })
    );
  }
}
