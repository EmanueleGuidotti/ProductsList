import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {MultiSelectModule} from "../multi-select/multi-select.module";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, MultiSelectModule, SharedModule],
    exports: [HomeComponent]
})
export class HomeModule {}
