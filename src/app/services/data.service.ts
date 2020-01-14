import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const GETALL_URL: string = '/getAll';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(private httpClient: HttpClient) {}

	getAll(): Observable<Array<any>> {
		return this.httpClient.get<Array<any>>(GETALL_URL);
	}

}
