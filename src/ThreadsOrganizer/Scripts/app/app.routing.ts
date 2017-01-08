import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { UserEditComponent } from "./user-edit.component";

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
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] =
    [
    ];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);