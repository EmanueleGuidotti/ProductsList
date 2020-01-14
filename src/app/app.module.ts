import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { DEFAULT_HTTP_TIMEOUT, httpTimeout } from '../productsList.const';
import { HttpCommonInterceptor } from '../interceptors/common.http-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {HomeModule} from "./modules/home/home.module";

@NgModule({
	declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        HomeModule,
    ],
	providers: [
		DataService,
		{ provide: DEFAULT_HTTP_TIMEOUT, useValue: httpTimeout },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpCommonInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
