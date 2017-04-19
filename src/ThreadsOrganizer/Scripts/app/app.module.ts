///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import "rxjs/Rx";
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll/ng2-simple-page-scroll';

import { AppComponent } from "./components/app.component";
import { AppRouting } from "./app.routing";
import { AuthHttp } from "./auth.http";
import { AuthService } from "./services/auth.service";
import { PaletteService } from "./services/palette.service";
import { ThreadListService } from "./services/thread-list.service";
import { HomeComponent } from "./components/home.component";
import { AboutComponent } from "./components/about.component";
import { LoginComponent } from "./components/login.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import { PaletteViewComponent } from "./components/palette-view.component";
import { ThreadListViewComponent } from "./components/thread-list-view.component";
import { ThreadListEditComponent } from "./components/thread-list-edit.component";
import { UserEditComponent } from "./components/user-edit.component";

@NgModule({
    // modules
    imports: [
        AppRouting,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2SimplePageScrollModule.forRoot()
    ],
    // directives, components and pipes
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        LoginComponent,
        PageNotFoundComponent,
        PaletteViewComponent,
        ThreadListViewComponent,
        ThreadListEditComponent,
        UserEditComponent
    ],
    // providers
    providers: [
        AuthHttp,
        AuthService,
        PaletteService,
        ThreadListService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }