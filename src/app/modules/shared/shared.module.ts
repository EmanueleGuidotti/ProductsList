import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatGridListModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from "@angular/material/card";

@NgModule({
	declarations: [],
	imports: [CommonModule, MatSelectModule, MatGridListModule, MatListModule, MatCardModule],
	exports: [MatSelectModule, MatGridListModule, MatListModule, MatCardModule],
	providers: []
})
export class SharedModule {}
