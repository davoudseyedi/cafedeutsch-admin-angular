import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-ckeditor',
    templateUrl: './ckeditor.component.html',
    styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent implements OnInit {

    @Input() public modelItem: string = '';
    @Input() public errorModelItem: string = '';

    @Output() public content = new EventEmitter();

    public editorConfig: any = {
        toolbar: [{
            name: 'document',
            items: ['Print']
        },
            {
                name: 'clipboard',
                items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord']
            },
            {
                name: 'styles',
                items: ['Format', 'Font', 'FontSize', 'Styles']
            },
            {
                name: 'colors',
                items: ['TextColor', 'BGColor']
            },
            {
                name: 'align',
                items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
            },
            '/',
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']
            },
            {
                name: 'links',
                items: ['Link', 'Unlink']
            },
            {
                name: 'paragraph',
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
            },
            {
                name: 'insert',
                items: ['Image', 'Table']
            },
            {
                name: 'tools',
                items: ['Maximize', 'Source']
            },
            {
                name: 'editing',
                items: ['Scayt']
            }
        ],
        extraAllowedContent: '*(*);*{*};*[*]',
        extraPlugins: 'print,format,font,colorbutton,justify,uploadimage',
        height: 400,
        contentsLangDirection: 'rtl'
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    public getContent(event: any) {
        this.content.emit(event)
    }
}
