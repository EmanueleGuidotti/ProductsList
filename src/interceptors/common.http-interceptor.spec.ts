import { DataService } from '../app/services/data.service';
import {
    HttpTestingController,
    HttpClientTestingModule,
    RequestMatch
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS, HttpRequest } from "@angular/common/http";
import { HttpCommonInterceptor } from "./common.http-interceptor";
import { httpTimeout, DEFAULT_HTTP_TIMEOUT, baseUrl } from "../productsList.const";

describe("HttpInterceptor", () => {
    let service: DataService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DataService,
                { provide: DEFAULT_HTTP_TIMEOUT, useValue: httpTimeout },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpCommonInterceptor,
                    multi: true
                }
            ]
        });

        service = TestBed.get(DataService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should add 'Content-Type' header", () => {
        service.getAll().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.flush("{}");
        expect(httpReq.request.headers.has("Content-Type")).toEqual(true);
    });

    it("should retry when error is thrown", () => {
        service.getAll().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.error(new ErrorEvent("timeout"), { status: 500 });
    });

    it("should not retry when 404 error is thrown", () => {
        service.getAll().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.error(new ErrorEvent("not found"), { status: 404 });
    });
});
