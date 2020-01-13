import {
	TestBed,
	async,
	ComponentFixture,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "./modules/shared/shared.module";
import {DataService} from "./services/data.service";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [
              RouterTestingModule,
              BrowserAnimationsModule,
              HttpClientTestingModule,
              SharedModule
          ],
          declarations: [AppComponent],
          providers: [DataService]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
