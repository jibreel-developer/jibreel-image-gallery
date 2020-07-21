import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-add-card',
  templateUrl: './image-add-card.component.html',
  styleUrls: ['./image-add-card.component.scss'],
})
export class ImageAddCardComponent implements OnInit {
  formData = new FormData();

  imageInBase64: string = '';

  constructor() {}

  onInputChange(event: InputEvent) {
    const input = event.target as HTMLInputElement;

    this.formData.delete(input.name);

    switch (input.name) {
      case 'image':
        const image = input.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.imageInBase64 = fileReader.result as string;
        };
        fileReader.readAsDataURL(image);
        this.formData.append(input.name, image);
        break;
      default:
        this.formData.append(input.name, input.value);
        break;
    }
  }

  ngOnInit(): void {}
}
