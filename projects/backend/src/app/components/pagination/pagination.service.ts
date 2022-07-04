import {Injectable, Optional, RendererFactory2, ViewEncapsulation, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BrowserModule, Meta} from '@angular/platform-browser';

@Injectable(

)
export class PaginationService {
    renderer : any;

    constructor(
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document:any
    ) {

        this.renderer = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
    }

    updateTag(tag: LinkDefinition) {
        this.removeTag(tag);
        this.addTag(tag);
    }


    removeTag(tag: LinkDefinition) {
        try {

            const selector = this._parseSelector(tag);

            const canonical = this.document.querySelector(selector);
            const head = this.document.head;

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }
            if (!!canonical) {
                this.renderer.removeChild(head, canonical);
            }
        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }


    addTag(tag: LinkDefinition) {
        this.removeTag(tag);
        try {

            const link = this.renderer.createElement('link');
            const head = this.document.head;


            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }


            Object.keys(tag).forEach((prop: string) => {
                return this.renderer.setAttribute(link, prop, tag[prop]);
            });

            this.renderer.appendChild(head, link);

        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    private _parseSelector(tag: LinkDefinition): string {
        const attr: string = tag.rel ? 'rel' : 'hreflang';
        return `link[${attr}="${tag[attr]}"]`;
    }
}

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
    [prop: string]: string;
};

