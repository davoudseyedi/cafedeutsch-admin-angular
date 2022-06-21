import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JalaliDatePipe } from "./jalali-date.pipe";
import { GetAttributePipe } from "./get-attribute.pipe";
import { TranslateOptionsPipe } from "./translate-options.pipe";
import { PriceFormatPipe } from "./price-format.pipe";
import { SafePipe } from "./safe-url.pipe";
import { StatusPipe } from './status.pipe';
import { ConvertStatusPipe } from "./convert-status.pipe";
import { StatusLinkPipe } from "./statusLink.pipe";
import { JalaliRelativePipe } from "./jalali-relative.pipe";
import {ReversePipe} from "./reverse.pipe";

@NgModule({
    declarations: [
        ConvertStatusPipe,
        JalaliDatePipe,
        GetAttributePipe,
        TranslateOptionsPipe,
        PriceFormatPipe,
        SafePipe,
        StatusPipe,
        StatusLinkPipe,
        JalaliRelativePipe,
        ReversePipe
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ConvertStatusPipe,
        JalaliDatePipe,
        GetAttributePipe,
        TranslateOptionsPipe,
        PriceFormatPipe,
        SafePipe,
        StatusPipe,
        StatusLinkPipe,
        JalaliRelativePipe,
        ReversePipe
    ],
})

export class PipeModule {}
