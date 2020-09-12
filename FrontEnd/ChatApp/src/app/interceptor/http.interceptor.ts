import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';


@Injectable({
    providedIn: 'root'
})
export class ChatHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private sharedService: SharedService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('ChatAppToken');


        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${token}`,
                }

             });
        }

        return next.handle(request).pipe(
            catchError(
                (err: any, caught) => {
                    this.handleError(err);
                    return throwError(err);
                })
        );
    }



    handleError(err: any) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
                // unauthorized users
                this.sharedService.error('User is unauthorized.', '');
            }
            else if (err.status === 400){

                // common error
                // handle at where we get error, during hit of api

            } else if (err.status === 401) {
                // access rights issue
                localStorage.clear();
                this.router.navigateByUrl('login');
            }
             else if (err.status === 502) {
                // server issue
                this.sharedService.error('Service is down. Sorry for the inconvience caused.', '');

            } else if (err.status === 500) {
                // server issue
                this.sharedService.error('There is system error,Please contact to administrator', '');

            } else if (err.status === 0) {
                // No Internet cases(Most of the times)
                this.sharedService.error('Please connect your internet.', '');
            } else {

                if (err.hasOwnProperty('error') && (err.error.hasOwnProperty('message')) || err.error.hasOwnProperty('error')) {
                    this.sharedService.error(`${err.error.message || err.error.error}`, '');
                }
            }
        }
    }


}
