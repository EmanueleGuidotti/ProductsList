import { async, ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModel } from './select.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;
	let debugElement: DebugElement;

	const vehicles: SelectModel[] = [
		{ type: 'car' },
		{ type: 'airplane' },
		{ type: 'train' }
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule, BrowserAnimationsModule],
			declarations: [SelectComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	}));

	it('should create the component', () => {
		const selectInstance = debugElement.componentInstance;
		component.vehicles = vehicles;
		component.title = 'Vehicles Types';
		component.cdf.markForCheck();
		fixture.autoDetectChanges(true);
		expect(component).toBeTruthy();
		expect(selectInstance).toBeTruthy();
	});

	it(`should select render 3 options`, async () => {
		component.vehicles = vehicles;
		component.title = 'Vehicles Types';
		component.cdf.markForCheck();
		fixture.autoDetectChanges(true);
		const trigger = debugElement.query(By.css('.mat-select-trigger'));
		trigger.triggerEventHandler('click', null);
		await fixture.whenStable().then(() => {
			const inquiryOptions = debugElement.queryAll(By.css('.mat-option-text'));
			expect(inquiryOptions.length).toEqual(3);
		});
	});

	it(`should the first option is Car`, async () => {
		component.vehicles = vehicles;
		component.title = 'Vehicles Types';
		component.cdf.markForCheck();
		fixture.autoDetectChanges(true);
		const trigger = debugElement.query(By.css('.mat-select-trigger'));
		trigger.triggerEventHandler('click', null);
		await fixture.whenStable().then(async () => {
			const options = debugElement.queryAll(By.css('.mat-option'));
			options[0].triggerEventHandler('click', null);
			const element = debugElement.query(By.css('.mat-select-value-text span'));
			expect(element.nativeElement.textContent).toContain('car');
			expect(fixture).toMatchSnapshot();
		});
	});
});
