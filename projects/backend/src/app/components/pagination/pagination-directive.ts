import {Component, Input, Output, EventEmitter, OnInit, OnChanges, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationService} from './pagination.service';
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-pagination',
    styles: [`
      .pointer{
        cursor: pointer;
      }
        /*.pagination {*/
        /*    padding: 0;*/
        /*    !*overflow-x: auto;*!*/
        /*    white-space: nowrap;*/
        /*    margin-top: 5px;*/
        /*    margin-bottom: 0px;*/
        /*    display: flex;*/
        /*    align-items: center;*/
        /*    justify-content: center;*/
        /*}*/

        /*@media (max-width: 667px) {*/
        /*    .pagination {*/
        /*        white-space: unset !important;*/
        /*        display: block !important;*/
        /*    }*/

        /*    .page-data {*/
        /*        position: relative !important;*/
        /*    }*/
        /*    .display-count span{*/
        /*        font-size: 10px !important;*/
        /*    }*/
        /*    .page-data p {*/
        /*        font-size: 10px  !important;*/
        /*    }*/


        /*}*/

        /*ul {*/
        /*    display: inline-block;*/
        /*}*/

        /*ul li {*/
        /*    display: inline-block;*/
        /*    text-align: center;*/
        /*}*/

        /*.go-to span, .go-to input {*/
        /*    display: inline-block !important;*/
        /*}*/

        /*.go-to input {*/
        /*    max-width: 75px;*/
        /*}*/

        /*.go-to span {*/
        /*    margin-left: 10px;*/
        /*}*/

        /*.active {*/
        /*    background-color: #f1f2f4 !important;*/
        /*    color: #213368FF !important;*/
        /*    font-weight: bold;*/
        /*    border-radius: 5px;*/
        /*}*/

        /*li:hover {*/
        /*    text-decoration: none;*/
        /*    cursor: pointer;*/
        /*}*/

        /*span.disabled {*/
        /*    cursor: unset;*/
        /*    color: #98b0c3;*/
        /*}*/

        /*.page-link {*/
        /*    padding: 0.5rem 5px;*/
        /*    margin: 0 4px;*/
        /*    font-size: 1.1rem;*/
        /*    height: 32px;*/
        /*    width: 32px;*/
        /*    background: transparent;*/
        /*    border: none;*/
        /*    display: flex;*/
        /*    justify-content: center;*/
        /*    align-items: center;*/
        /*    color:#8e8e8e*/
        /*}*/
        /*.page-item .page-link{*/
        /*    background: #0a1f44;*/
        /*    border-radius: 0.25rem !important;*/
        /*}*/

        /*.page-data {*/
        /*    position: absolute;*/
        /*    !*right: 8px;*!*/
        /*    !*top: 8px;*!*/
        /*}*/

        /*.page-data p {*/
        /*    margin: 0;*/
        /*    color: #0a1f44;*/
        /*    font-size: 14px;*/
        /*    font-weight: bold;*/
        /*}*/
        /*.display-count span {*/
        /*    font-size: 14px;*/
        /*    color: #0a1f44;*/
        /*    font-weight: bold;*/
        /*}*/
    `],
    templateUrl: './pagination-directive.html',
})

/**
 * This class will present pagination directive.
 */
export class PaginationDirective implements OnInit, OnChanges {

    @Input() public elementId?: string;
    @Input() public currentPage: number = 1;
    @Input() public perPage: number = 20;
    @Input() public useHref?: boolean;
    @Input() public total: number = 1;
    @Input() public showMorePaginate = false;
    @Input() public perPageList :any = [];
    @Input() public paginationModel: any = {};
    @Input() public qParams: any = {};

    @Output() public changePage = new EventEmitter<any>();
    @Output() public changePerPage = new EventEmitter<any>();

    public firstPage = 1;
    public lastPage = 1;

    public PAGE_LIMIT = 6;
    public pageArray: any[] = [];
    public pageUrl = '';

    public goToPageNumber: any = null;


    constructor(private route: ActivatedRoute,
                private linkService: PaginationService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {

        const params: any = this.route.snapshot.queryParamMap;

        if (params.get('perPage') && this.paginationModel.perPage && this.qParams.perPage) {

            this.paginationModel.perPage = parseInt(params.get('perPage'));
            this.qParams.perPage = params.get('perPage');

        }

        if (params.get('currentPage')) {

            if ( this.paginationModel.currentPage != params.get('currentPage') ) {

                this.paginationModel.currentPage = parseInt(params.get('currentPage'));
                this.qParams.currentPage = params.get('currentPage');

                if (this.paginationModel.currentPage > 1) {

                    this.changePage.emit(this.paginationModel.currentPage);

                }

            }

        }

        this.preparePageArray();

        const url: any = this.route.snapshot.queryParams;
        this.preparePageUrl();

        if (url.page) {

            this.currentPage = parseInt(url.page, 10);
            this.changePage.emit(this.currentPage);

        }

    }

    ngOnChanges($change: any) {

        if ($change.currentPage) {

            this.currentPage = parseInt($change.currentPage.currentValue, 10);
            this.preparePageArray();
            this.setLinkTag(this.currentPage);

        }

        if ($change.perPage) {

            this.perPage = $change.perPage.currentValue;
            this.preparePageArray();

        }

        if ($change.total) {

            this.total = $change.total.currentValue;
            this.preparePageArray();

        }

        this.preparePageUrl();

    }

    public setLinkTag(currentPage: number): void {

        if (isPlatformBrowser(this.platformId)) {

            const nextPage = currentPage + 1;
            const prevPage = currentPage - 1;

            if (currentPage !== this.lastPage) {

                this.linkService.updateTag({rel: 'next', href: window.location.pathname + '?page=' + nextPage});

                if (currentPage === 1) {

                    this.linkService.removeTag({rel: 'prev', href: window.location.pathname + '?page=' + prevPage});

                } else {

                    if (!this.showMorePaginate) {

                        this.linkService.updateTag({rel: 'prev', href: window.location.pathname + '?page=' + prevPage});

                    }

                }

            }

            if (currentPage >= this.lastPage) {

                const lastPage = currentPage - 1;
                this.linkService.removeTag({rel: 'next', href: window.location.pathname + '?page=' + lastPage});
                this.linkService.addTag({rel: 'prev', href: window.location.pathname + '?page=' + lastPage});

            }

        } else {

            return;

        }

    }

    public onNextClick() {

        if (this.currentPage === this.pageArray.length) {

            return true;

        }

        this.currentPage ? this.currentPage++ : null;

        this.onChangePageClick(this.currentPage, true);

        return true;

    }

    public onPreviousClick() {

        if (this.currentPage === 1) {

            return true;

        }

        this.currentPage ? this.currentPage-- : null;

        this.onChangePageClick(this.currentPage, true);

        return true;

    }

    public onChangePageClick(pageNumber: any, forceAdd = false) {

        if (forceAdd) {

            this.currentPage = pageNumber;
            this.changePage.emit(pageNumber);

        }

        if (pageNumber < this.firstPage || pageNumber > this.lastPage || pageNumber === this.currentPage) {

            return true;

        }

        this.currentPage = pageNumber;
        this.changePage.emit(pageNumber);

        return true;

    }

    public submitPerPage(e:any){
        this.changePerPage.emit(e);
    }

    private preparePageArray() {

        this.pageArray = [];
        const allPageCount = Math.ceil(this.total / this.perPage);
        this.firstPage = 1;
        this.lastPage = allPageCount > 0 ? allPageCount : 1;
        let tempLimit = this.PAGE_LIMIT;
        this.pageArray.push(this.currentPage);

        for (let i = this.currentPage - 1; i >= this.firstPage; i--) {

            if (tempLimit > this.PAGE_LIMIT / 2) {

                tempLimit--;
                this.pageArray.unshift(i);

            } else {

                break;

            }

        }

        for (let i = this.currentPage + 1; i <= this.lastPage; i++) {

            if (tempLimit > 0) {

                tempLimit--;
                this.pageArray.push(i);

            } else {

                break;

            }
        }
    }

    private preparePageUrl() {

        const temp = this.route.snapshot.queryParams; // todo: Route param doesn't get current route??!
        const routeParams = [];

        for (const key in temp) {

            if (key !== 'page') {

                routeParams.push(key + '=' + temp[key]);

            }

        }

        const url = routeParams.length > 0 ? '?' + routeParams.join('&') : '';

        this.pageUrl = (this.router.url.indexOf('?') !== -1 ? this.router.url.substr(0,
            this.router.url.indexOf('?')) : this.router.url) + url;

        if (this.pageUrl.indexOf('?') !== -1) {

            this.pageUrl = this.pageUrl + '&page=';

        } else {

            this.pageUrl = this.pageUrl + '?page=';

        }
    }
}
