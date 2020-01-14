import { TestBed } from '@angular/core/testing';
import * as data from "../../../mocks/data.json"
import { DataService } from './data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DataService', () => {
    let httpTestingController: HttpTestingController;
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(DataService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(service).toBeDefined();
    });

    it("should get the array data", async () => {
        service.getAll().subscribe(result => {
            expect(result).toMatchSnapshot();
        });
        const req = httpTestingController.expectOne("/getAll");
        req.flush(data);
    });
});
