import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageAddCardComponent } from './image-add-card/image-add-card.component';
import { ImagesUloaderComponent } from './images-uloader/images-uloader.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ViewImageModalComponent } from './view-image-modal/view-image-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageAddCardComponent,
    ImagesUloaderComponent,
    LoginModalComponent,
    ViewImageModalComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [
		FormsModule,
    ImageAddCardComponent,
    ImagesUloaderComponent,
    LoginModalComponent,
    ViewImageModalComponent,
  ],
  entryComponents: [LoginModalComponent, ViewImageModalComponent],
})
export class ComponentsModule {}
