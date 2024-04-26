import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay, mergeMap, tap } from 'rxjs/operators';

const MAX_RETRIES = 3; // Set the maximum number of retries
const BACKOFF_TIME = 10000; // Delay between retries in milliseconds

@Injectable()
export class MyRetryInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let retries = 0;
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger
        if (error && error.status === 429) { // Check for 429 Too Many Requests
        console.log('calling this')

          const retryAfter = error.headers.get('Retry-After');
            
          if (retryAfter && retries < MAX_RETRIES) {
            retries++;
            const delayTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : BACKOFF_TIME;
            console.log(`Too many requests, retrying in ${delayTime} ms (attempt ${retries})`);

            return of(null).pipe(
              delay(delayTime),
              tap(() => request = request.clone()) // Clone the request for retry
            ).pipe(mergeMap(() => next.handle(request)));
          }
          return throwError(error); // If retries exhausted or not 429 error, throw original error
        }
        return throwError(error); // Other errors are not handled here
      })
    );
  }
}
