import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef, EventEmitter, Output,
} from '@angular/core';
import { SelectModel } from './select.model';
import {MatSelectChange} from "@angular/material/select";

@Component({
	selector: 'select-component',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
	@Input() vehicles: SelectModel[];
	@Input() title: string;
    n:string="";

	constructor(public cdf: ChangeDetectorRef) {}

	public sendValue(n: MatSelectChange) {
        this.n = n.source.value;
    }
}
