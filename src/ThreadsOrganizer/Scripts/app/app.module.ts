///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import "rxjs/Rx";

import { AppComponent } from "./app.component";
import { AppRouting } from "./app.routing";
import { AuthHttp } from "./auth.http";
import { AuthService } from "./auth.service";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { UserEditComponent } from "./user-edit.component";

@NgModule({
    // directives, components and pipes
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        PageNotFoundComponent,
        UserEditComponent
    ],
    // modules
    imports: [
        AppRouting,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    // providers
    providers: [
        AuthHttp,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }