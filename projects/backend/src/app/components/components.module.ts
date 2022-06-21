import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {LoadingComponent} from "./loading/loading.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {PipeModule} from "../pipes/pipe.module";
import {CkeditorComponent} from "./ckeditor/ckeditor.component";
import {CKEditorModule} from "ckeditor4-angular";
import {ButtonDirective} from "./button/button.component";
import {ConfirmModalComponent} from "./confirm-modal/confirm-modal.component";

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    SidebarComponent,
    CkeditorComponent,
    ButtonDirective,
    ConfirmModalComponent
  ],
  exports: [
    HeaderComponent,
    LottieModule,
    LoadingComponent,
    FooterComponent,
    SidebarComponent,
    CkeditorComponent,
    CKEditorModule,
    ButtonDirective,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    LottieModule.forRoot({player: playerFactory}),
    PipeModule
  ],
  providers: [],
})

export class ComponentsModule {}
