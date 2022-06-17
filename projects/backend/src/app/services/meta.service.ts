import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

import { LinkService } from "./link.service";

import {Config} from "./config";

@Injectable()

/**
 * Meta service will work with meta tags in html header and help in SEOs.
 * include: Meta description - Meta keyword - Title - Canonicals
 */
export class MetaService {

    constructor( private metaService: Meta,
                private titleService: Title,
                @Inject(DOCUMENT) private doc:any,
                private linkService: LinkService ) {}

    /**
     * This method will set description meta.
     *
     * @param {string} metaDescription
     */
    public setDescription(metaDescription: string,url:any=null) {

        this.metaService.updateTag(
            {
                name: "description",
                content: metaDescription && metaDescription.length > 5 ? metaDescription : Config.DEFAULT_META_DESCRIPTION,

            });

        this.clearOgTags(url);

    }

    /**
     * This method will return current description.
     * @returns {promise.Promise<string> | string}
     */
    public getDescriptionTag() {

        let metas = this.doc.getElementsByTagName('meta');

        for ( let i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute('name') == 'description' ) {
                return metas[i].content;
            }
        }

        return Config.DEFAULT_META_DESCRIPTION;
    }

    /**
     * this method will fire to set meta tags with custom property.
     *
     * @param property
     * @param content
     */
    public setMetaCustomProperty(property:any, content:any) {
        this.metaService.addTag({ property: property, content: content });
    }

    /**
     * this method will fire to make some meta tags with custom property -> value | content -> value.
     *
     * @param keyValueObj
     */
    public setMetaProperties(keyValueObj:any) {
        keyValueObj.forEach((item:any) => {
            this.metaService.addTag({ property: item.property, content: item.content });
        })
    }

    /**
     * this method will fire to make some meta tags with custom name -> value | content -> value.
     *
     * @param keyValueObj
     */
    public setMetaTags(keyValueObj:any) {
        keyValueObj.forEach((item:any) => {
            this.metaService.addTag({ name: item.name, content: item.content });
        })
    }

    /**
     * this method will fire to set new meta tags with custom values.
     *
     * @param name
     * @param content
     */
    public setMetaCustomTag(name:any, content:any) {
        this.metaService.addTag({ name: name, content: content });
    }

    /**
     * This method will set keyword meta.
     *
     * @param {string} metaKeyword
     */
    public setKeyword(metaKeyword: string) {
        this.metaService.updateTag(
            {
                name: "keywords",
                content: metaKeyword,
            });
    }

    /**
     * This method will change the meta keyword and meta description to default values.
     */
    public clearMetaTags() {
        this.metaService.updateTag(
            {
                name: "description",
                content: Config.DEFAULT_META_DESCRIPTION,
            });
        this.metaService.updateTag(
            {
                name: "keywords",
                content: Config.DEFAULT_META_KEYWORDS,
            });
    }

    /**
     * This method will fire to set title to head of html.
     *
     * @param {string} newTitle
     */
    public setTitle(newTitle: string = Config.DEFAULT_META_TITLE) {
        this.titleService.setTitle(newTitle);
    }

    /**
     * This method will return the current title of site.
     *
     * @returns {string}
     */
    public getTitle() {
        return this.titleService.getTitle();
    }

    /**
     * This method will change the title to default.
     */
    public clearTitle() {
        this.setTitle(Config.DEFAULT_META_TITLE);
    }

    /**
     * This method will set canonical in html header.
     *
     * @param {string} url
     */
    public setCanonical(url: string) {
        this.linkService.removeCanonicalLink();
        if ( url.indexOf("https") === -1 ) {
            url = Config.SITE_URL + url;
        }
        this.linkService.addTag( { rel: 'canonical', href: url } );
    }

    /**
     * This method will return the current canonical.
     *
     * @returns {string}
     */
    public getCanonical() {
        return document.getElementById("canonical")!.getAttribute("href");
    }

    /**
     * This method will change the canonical to default.
     */
    public clearCanocical() {
        this.linkService.removeCanonicalLink();
        this.linkService.addTag( { rel: 'canonical', href: Config.SITE_URL } );
    }

    /**
     * This method will clear meta OG tags for public pages.
     */
    public clearOgTags(url:any = null) {

        const metas = this.doc.getElementsByTagName('meta');
        let pageTitle = this.getTitle();
        let pageUrl = url ? url : this.doc.URL;

        if ( pageUrl.indexOf('http') == -1 ) {
            pageUrl = Config.SITE_URL + pageUrl;
        }

        let pageDescription = this.getDescriptionTag();

        let validRoute = [
            {
                name: "og:title",
                value: pageTitle
            },
            {
                name: "og:type",
                value: 'website'
            },
            {
                name: "og:url",
                value: pageUrl
            },
            {
                name: "og:image",
                value: Config.SITE_URL + '/assets/img/og-image.png'
            },
            {
                name: "og:image:type",
                value: 'image/png'
            },
            {
                name: "og:image:width",
                value: '200'
            },
            {
                name: "og:image:height",
                value: '200'
            },
            {
                name: "og:image:alt",
                value: Config.SITE_URL
            },
            {
                name: "og:description",
                value: pageDescription
            },
            {
                name: "og:locale",
                value: "fa_IR"
            },
            {
                name: "og:site_name",
                value: Config.SITE_URL,
            },
            {
                name: "twitter:site",
                value: "hostiran"
            },
            {
                name: "twitter:title",
                value: pageTitle
            },
            {
                name: "twitter:description",
                value: pageDescription
            },
        ];

        let validRouteProfile = [
            "og:site_name",
            "og:type",
            "og:image",
        ];

        for ( let i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute('property') ) {
                for ( let item of validRouteProfile ) {
                    let metaName = metas[i].getAttribute('property');
                    if ( item == metaName ) {
                        this.metaService.updateTag({ property: metaName, content: '' });
                        break;
                    }
                }
            }
        }
        for ( let item of validRoute ) {
            this.metaService.updateTag({ property: item.name, content: item.value });
        }
        let head = this.doc.getElementsByTagName('head')[0];
        head.setAttribute('prefix', 'og: http://ogp.me/ns#');
    }

}
