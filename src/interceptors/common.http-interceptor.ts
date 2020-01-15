import { Injectable, Inject } from "@angular/core";
import {
    HttpInterceptor,
    HttpEvent,
    HttpHeaders,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import {
    timeout,
    retryWhen,
    takeWhile,
    delay,
    mergeMap,
    scan
} from "rxjs/operators";
import * as pl from "../productsList.const";

@Injectable()
export class HttpCommonInterceptor implements HttpInterceptor {
    constructor(
        @Inject(pl.DEFAULT_HTTP_TIMEOUT) private defaultHttpTimeout: number
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        /* instanbul ignore else */
        let headers: HttpHeaders = req.headers || new HttpHeaders();
        headers = headers.append("Content-Type", "application/json; charset=utf-8");
        if (!headers.has("accept")) {
            headers = headers.append("accept", "application/json; charset=utf-8");
        }
        const newReq = req.clone({
            headers,
            url: pl.baseUrl.concat(req.url)
        });
        return next.handle(newReq).pipe(
            timeout(this.defaultHttpTimeout),
            retryWhen(error => {
                return error.pipe(
                    mergeMap((error: any) => {
                        if (error.status >= 500) {
                            return of(error.status);
                        }
                        return throwError(error);
                    }),
                    scan(attempt => {
                        return ++attempt;
                    }, 0),
                    takeWhile(attempt => attempt < pl.defaultRetryAttempts),
                    delay(pl.defaultRetryDelay)
                );
            })
        );
    }
}
