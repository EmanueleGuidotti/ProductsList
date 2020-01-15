import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import { DataModel } from '../../data.model';
import { SelectModel } from '../multi-select/select/select.model';
import { DataService } from '../../services/data.service';
import { SelectComponent } from '../multi-select/select/select.component';

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewChecked {
	private title: string = 'trafficmeister';
	data: DataModel[];
	vehiclesData: SelectModel[];
	vehiclesColors: SelectModel[];
	vehilcesBrands: SelectModel[];

	@ViewChild('SelectData', { static: false }) dataChild: SelectComponent;
	@ViewChild('SelectColor', { static: false }) colorChild: SelectComponent;
	@ViewChild('SelectModel', { static: false }) modelChild: SelectComponent;

	choosenColor: string = '';
	choosenModel: string = '';
	choosenType: string = '';

	constructor(
		private dataService: DataService,
		private cdf: ChangeDetectorRef
	) {}

	public getVehilcesNames(dataSource: DataModel[]) {
		this.vehiclesData = dataSource.reduce(
			(all: SelectModel[], item: DataModel) => {
				all = all || [];
				if (!all.some((e: DataModel) => e.type === item.type))
					all.push({ type: item.type });
				return all;
			},
			[]
		);
	}

	public getVehilcesColors(dataSource: DataModel[]) {
		this.vehiclesColors = dataSource.reduce(
			(all: SelectModel[], item: DataModel) => {
				all = all || [];
				item.colors.map(color => {
					if (!all.some((e: DataModel) => e.type === color))
						all.push({ type: color });
				});
				return all;
			},
			[]
		);
	}

	public getVehilcesBrands(dataSource: DataModel[]) {
		this.vehilcesBrands = dataSource.reduce(
			(all: SelectModel[], item: DataModel) => {
				all = all || [];
				if (!all.some((e: DataModel) => e.type === item.brand))
					all.push({ type: item.brand });
				return all;
			},
			[]
		);
	}

	public filterColor(filterChoose: string) {
		this.data = this.data.reduce((all: DataModel[], item: DataModel) => {
			all = all || [];
			if (item.colors.includes(filterChoose)) all.push(item);
			return all;
		}, []);
		this.getVehilcesBrands(this.data);
		this.getVehilcesNames(this.data);
	}

	public filterBrand(filterChoose: string) {
		this.data = this.data.filter(
			(item: DataModel) => item.brand === filterChoose
		);
		this.getVehilcesNames(this.data);
		this.getVehilcesColors(this.data);
	}

	public filterType(filterChoose: string) {
		this.data = this.data.filter(
			(item: DataModel) => item.type === filterChoose
		);
		this.getVehilcesBrands(this.data);
		this.getVehilcesColors(this.data);
	}

	ngAfterViewChecked(): void {
		if (this.choosenColor !== this.colorChild.n) {
			this.choosenColor = this.colorChild.n;
			this.filterColor(this.choosenColor);
		}
		if (this.choosenModel !== this.modelChild.n) {
			this.choosenModel = this.modelChild.n;
			this.filterBrand(this.choosenModel);
		}
		if (this.choosenType !== this.dataChild.n) {
			this.choosenType = this.dataChild.n;
			this.filterType(this.choosenType);
		}
	}

	ngOnInit() {
		this.dataService.getAll().subscribe(
			(res: DataModel[]) => {
				this.data = res;
				this.cdf.detectChanges();
				this.getVehilcesNames(this.data);
				this.getVehilcesColors(this.data);
				this.getVehilcesBrands(this.data);
			},
			err => {
				console.log(err);
			}
		);
	}
}
