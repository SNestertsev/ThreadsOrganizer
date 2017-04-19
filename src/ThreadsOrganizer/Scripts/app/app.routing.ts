import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home.component";
import { AboutComponent } from "./components/about.component";
import { LoginComponent } from "./components/login.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import { PaletteViewComponent } from "./components/palette-view.component";
import { ThreadListViewComponent } from "./components/thread-list-view.component";
import { ThreadListEditComponent } from "./components/thread-list-edit.component";
import { UserEditComponent } from "./components/user-edit.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: UserEditComponent
    },
    {
        path: "account",
        component: UserEditComponent
    },
    {
        path: "palettes",
        component: PaletteViewComponent
    },
    {
        path: "thread-list/view/:id",
        component: ThreadListViewComponent
    },
    {
        path: "thread-list/edit/:id",
        component: ThreadListEditComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] =
    [
    ];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);