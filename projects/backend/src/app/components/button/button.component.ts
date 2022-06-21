import { Component, Input } from "@angular/core";

@Component({
    selector: "app-btn",
    styles:[``],
    template: `
        <button [type]="type ? type : 'button'" class="{{ className }}" id="{{id}}" [disabled]="disabled || loading">
            <span class="inline-middle ml-2" *ngIf="loading">
                <div class="spinner-border spinner-border-sm inline-middle" role="status" aria-hidden="true">
                  <span class="visually-hidden" dir="rtl">Loading...</span>
                </div>
            </span>
            <span class="inline-middle">
                <ng-content></ng-content>
            </span>
        </button>
    `
})

export class ButtonDirective {

    @Input() public className:any;
    @Input() public id:any;
    @Input() public loading?:boolean;
    @Input() public type?:string;
    @Input() public disabled?:boolean;

    constructor() {}

    ngOnChanges($change:any) {
        if ( $change.className ) {
            this.className = $change.className.currentValue;
        }
        if ( $change.id ) {
            this.id = $change.id.currentValue;
        }
        if ( $change.loading ) {
            this.loading = $change.loading.currentValue;
        }
        if ( $change.disabled ) {
            this.disabled = $change.disabled.currentValue;
        }
    }

}
