import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Observable } from "rxjs";


@Injectable()

export class MessageService {

    private subject = new Subject<any>();

    constructor() {
    }

    //////////////////////// Methods
    /**
     * This method will pass the message to observable.
     * @param key
     * @param message
     */
    public send(key:string, message: any) {
        this.subject.next({
            key: key,
            value: message,
        });
    }
    /**
     * This method will pass the message to observable.
     * @param message
     */
    public jsonLd(json:any) {
        this.send('jsonLd', json);
    }

    /**
     * This method will return observable to user.
     * @returns {Observable<any>}
     */
    public get(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * This method will clear observable.
     */
    public clear() {
        this.subject.next(null);
    }
}
