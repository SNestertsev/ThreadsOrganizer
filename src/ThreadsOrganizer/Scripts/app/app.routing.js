System.register(["@angular/router", "./home.component", "./login.component", "./page-not-found.component", "./user-edit.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, login_component_1, page_not_found_component_1, user_edit_component_1;
    var appRoutes, AppRoutingProviders, AppRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            },
            function (user_edit_component_1_1) {
                user_edit_component_1 = user_edit_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: "",
                    component: home_component_1.HomeComponent
                },
                {
                    path: "home",
                    redirectTo: ""
                },
                {
                    path: "login",
                    component: login_component_1.LoginComponent
                },
                {
                    path: "register",
                    component: user_edit_component_1.UserEditComponent
                },
                {
                    path: "account",
                    component: user_edit_component_1.UserEditComponent
                },
                {
                    path: '**',
                    component: page_not_found_component_1.PageNotFoundComponent
                }
            ];
            exports_1("AppRoutingProviders", AppRoutingProviders = []);
            exports_1("AppRouting", AppRouting = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
