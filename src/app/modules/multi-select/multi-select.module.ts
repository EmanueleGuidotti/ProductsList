import { NgModule } from '@angular/core';
import { SelectComponent } from './select/select.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FilteredListComponent} from "../../components/filtered-list/filtered-list.component";

@NgModule({
	declarations: [SelectComponent, FilteredListComponent],
    imports: [CommonModule, SharedModule],
	exports: [SelectComponent, FilteredListComponent]
})
export class MultiSelectModule {}
