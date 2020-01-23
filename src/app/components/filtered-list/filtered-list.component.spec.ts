import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { FilteredListComponent } from './filtered-list.component';
import { DebugElement } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../modules/shared/shared.module";
import {DataModel} from "../../data.model";
import * as data from "../../../../mocks/data.json";
const redItems =  [
    {
        "brand": "Bugatti Veyron",
        "colors":  [
            "red",
            "black",
        ],
        "id": 1,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg",
        "type": "car",
    },
    {
        "brand": "Boeing 787 Dreamliner",
        "colors":  [
            "red",
            "white",
            "black",
            "green",
        ],
        "id": 2,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg",
        "type": "airplane",
    },
    {
        "brand": "Canadair North Star",
        "colors":  [
            "red",
            "blue",
            "yellow",
            "green",
        ],
        "id": 4,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/BOAC_C-4_Argonaut_Heathrow_1954.jpg/600px-BOAC_C-4_Argonaut_Heathrow_1954.jpg",
        "type": "airplane",
    },
    {
        "brand": "Airbus A400M Atlas",
        "colors":  [
            "red",
            "white",
        ],
        "id": 5,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/A400M-1969.jpg/600px-A400M-1969.jpg",
        "type": "airplane",
    },
    {
        "brand": "Prairie 2-6-2",
        "colors":  [
            "red",
            "white",
            "grey",
        ],
        "id": 7,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/CFR_Steam_locomotive.jpg/600px-CFR_Steam_locomotive.jpg",
        "type": "train",
    },
    {
        "brand": "Amer 4-4-0",
        "colors":  [
            "red",
            "black",
        ],
        "id": 9,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/440woodcut.jpg/600px-440woodcut.jpg",
        "type": "train",
    },
    {
        "brand": "Ferrari F40",
        "colors":  [
            "red",
            "yellow",
        ],
        "id": 10,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg",
        "type": "car",
    },
]

describe('FilteredListComponent', () => {
	let component: FilteredListComponent;
	let fixture: ComponentFixture<FilteredListComponent>;
	let debugElement: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                SharedModule,
            ],
			declarations: [FilteredListComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(FilteredListComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilteredListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

    it('should create the component', () => {
        const jsonData: DataModel[] = data.getAll;
        const listInstance = debugElement.componentInstance;
        component.vehicles = jsonData;
        component.cdf.markForCheck();
        fixture.autoDetectChanges(true);
        expect(component).toBeTruthy();
        expect(listInstance).toBeTruthy();
    });

    it('should render all items', async(async()=> {
        const jsonData: DataModel[] = data.getAll;
        component.vehicles = jsonData;
        component.cdf.markForCheck();
        fixture.autoDetectChanges(true);
        await fixture.whenStable().then(async () => {
            expect(fixture).toMatchSnapshot();
        });
    }));

    it('should render only red items', async(async()=> {
        const redData: DataModel[] = redItems;
        component.vehicles = redData;
        component.cdf.markForCheck();
        fixture.autoDetectChanges(true);
        await fixture.whenStable().then(async () => {
            expect(fixture).toMatchSnapshot();
        });
    }));

});
