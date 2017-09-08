import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChartComponent} from "./chart/chart.component";
import {ChartsModule} from "ng2-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MdButtonModule, MdCheckboxModule,
    MdInputModule, MdSelectModule
} from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
        ChartComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
