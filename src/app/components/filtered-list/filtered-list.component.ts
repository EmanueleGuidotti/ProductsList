import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    Input, OnChanges,
    OnInit, SimpleChanges
} from '@angular/core';
import { DataModel } from '../../data.model';

@Component({
	selector: 'filtered-list-component',
	templateUrl: './filtered-list.component.html',
	styleUrls: ['./filtered-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredListComponent implements OnInit, OnChanges {
	@Input() vehicles: DataModel[];

	constructor(public cdf: ChangeDetectorRef) {}

	ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }
}
