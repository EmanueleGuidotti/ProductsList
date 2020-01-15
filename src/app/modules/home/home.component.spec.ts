import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {DebugElement} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../shared/shared.module";
import {DataService} from "../../services/data.service";
import {DataModel} from "../../data.model";
import * as data from "../../../../mocks/data.json";
import {SelectModel} from "../multi-select/select/select.model";
import {MultiSelectModule} from "../multi-select/multi-select.module";

describe('HomeComponent', () => {
    let component: HomeComponent;
		let fixture: ComponentFixture<HomeComponent>;
		let debugElement: DebugElement;
    let testBedService: TestBed;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                SharedModule,
                MultiSelectModule
            ],
            declarations: [HomeComponent],
            providers: [DataService]
        }).compileComponents();
        testBedService = TestBed.get(DataService);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    }));

    it('should create', async(
        inject([DataService], (dataService: DataService) => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        })
    ));

    it('should create the component', async(
        inject([DataService], (dataService: DataService) => {
            const homeInstance = debugElement.componentInstance;
            expect(homeInstance).toBeTruthy();
        })
    ));

    it('should map vehicles type', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.getVehilcesNames(jsonData);
            expect(Array.isArray(component.vehiclesData)).toBe(true);
            expect(component.vehiclesData).toMatchSnapshot();
            await fixture.whenStable().then(async () => {
                expect(fixture).toMatchSnapshot();
            });
        })
    ));

    it('should map vehicles colors', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.getVehilcesColors(jsonData);
            expect(Array.isArray(component.vehiclesColors)).toBe(true);
            expect(component.vehiclesColors).toMatchSnapshot();
            await fixture.whenStable().then(async () => {
                expect(fixture).toMatchSnapshot();
            });
        })
    ));

    it('should map vehicles brands', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.getVehilcesBrands(jsonData);
            expect(Array.isArray(component.vehilcesBrands)).toBe(true);
            expect(component.vehilcesBrands).toMatchSnapshot();
            await fixture.whenStable().then(async () => {
                expect(fixture).toMatchSnapshot();
            });
        })
    ));

    it('should filter type', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.data = jsonData;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.filterType('car');
            expect(Array.isArray(component.data)).toBe(true);
            expect(component.data).toMatchSnapshot();
        })
    ));

    it('should filter color', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.data = jsonData;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.filterColor('red');
            expect(Array.isArray(component.data)).toBe(true);
            expect(component.data).toMatchSnapshot();
        })
    ));

    it('should filter brand', async(
        inject([DataService], async (dataService: DataService) => {
            const jsonData: DataModel[] = data.getAll;
            component.data = jsonData;
            component.ngOnInit();
            fixture.autoDetectChanges(true);
            expect(dataService).toBe(testBedService);
            component.filterBrand('Bugatti Veyron');
            expect(Array.isArray(component.data)).toBe(true);
            expect(component.data).toMatchSnapshot();
        })
    ));

});

