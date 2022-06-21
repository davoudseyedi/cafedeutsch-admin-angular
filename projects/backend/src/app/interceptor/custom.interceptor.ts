import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { MessageService } from "../services/message.service";

const STATE_KEY_PREFIX = 'http_requests:';

@Injectable()

export class CustomInterceptor implements HttpInterceptor {

    constructor( private authService : AuthService,
                 private transferState : TransferState,
                 @Inject(PLATFORM_ID) private platformId : Object,
                 private router : Router,
                 private messageService: MessageService ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler):any {

        const adminToken = this.authService.getAdminToken();

        if ( !!adminToken  ) {
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + adminToken
                }
            })

        }

        if ( isPlatformServer(this.platformId) && ( request.url.indexOf('api/auth') > -1 || request.url.indexOf('api/admin') > -1) ) {

            return EMPTY;


        }

        if ( request.method != 'GET' ) {

            return next.handle(request).pipe(
                catchError((error: HttpErrorResponse) => {

                    this.handleError(request, error);

                    return throwError(error.error);

                })
            );

        }

        const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + request.url.substr(request.url.indexOf('api'), request.url.length));

        if ( isPlatformBrowser(this.platformId) ) {

            // Try reusing transferred response from server
            const cachedResponse = this.transferState.get(key, null);
            this.messageService.send('progress-bar', '');

            if ( cachedResponse ) {

                this.transferState.remove(key); // cached response should be used for the very first time
                return of(new HttpResponse({
                    body: cachedResponse.body,
                    status: 200,
                    statusText: 'OK (from server)',
                    // headers are not transferred by current implementation.
                }));
            }
            return next.handle(request).pipe(
                catchError( (error: HttpErrorResponse) => {

                    this.handleError(request, error);

                    return throwError(error.error);

                } )
            );
        }

        if ( isPlatformServer(this.platformId) ) {
            // Try saving response to be transferred to browser

            return next.handle(request).pipe(tap(event => {
                if ( event instanceof HttpResponse && event.status == 200 ) {
                    // Only body is preserved as it is and it seems sufficient for now.
                    // It would be nice to transfer whole response, but http response is not
                    // a POJO and it needs custom serialization/deserialization.
                    const response = {
                        body: event.body
                    };
                    this.transferState.set(key, response);
                }
            }));
        }

    }

    public handleError(request:any, error:any) {

        if ( error.status == 401 ) {

            if ( request.url.indexOf('/api/admin') > -1 ) {

                this.authService.logoutAdmin();

                let queryParams = {};

                if ( this.router.url.indexOf('/login') == -1 )
                {
                    queryParams = {redirect_link: this.router.url};
                } else {
                    if ( this.router.url.indexOf('redirect_link') != -1 )
                    {
                        let oldRedirect = this.router.url.split('?')[1].replace('redirect_link=', '');
                        queryParams = {redirect_link: decodeURIComponent(oldRedirect)};
                    }
                }

                this.router.navigate(['/login'], {queryParams});

            }


        }

    }

}
