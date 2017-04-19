System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "@angular/forms", "@angular/router", "rxjs/Rx", "ng2-simple-page-scroll/ng2-simple-page-scroll", "./components/app.component", "./app.routing", "./auth.http", "./services/auth.service", "./services/palette.service", "./services/thread-list.service", "./components/home.component", "./components/about.component", "./components/login.component", "./components/page-not-found.component", "./components/palette-view.component", "./components/thread-list-view.component", "./components/thread-list-edit.component", "./components/user-edit.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, http_1, forms_1, router_1, ng2_simple_page_scroll_1, app_component_1, app_routing_1, auth_http_1, auth_service_1, palette_service_1, thread_list_service_1, home_component_1, about_component_1, login_component_1, page_not_found_component_1, palette_view_component_1, thread_list_view_component_1, thread_list_edit_component_1, user_edit_component_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {
            },
            function (ng2_simple_page_scroll_1_1) {
                ng2_simple_page_scroll_1 = ng2_simple_page_scroll_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (auth_http_1_1) {
                auth_http_1 = auth_http_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (palette_service_1_1) {
                palette_service_1 = palette_service_1_1;
            },
            function (thread_list_service_1_1) {
                thread_list_service_1 = thread_list_service_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            },
            function (palette_view_component_1_1) {
                palette_view_component_1 = palette_view_component_1_1;
            },
            function (thread_list_view_component_1_1) {
                thread_list_view_component_1 = thread_list_view_component_1_1;
            },
            function (thread_list_edit_component_1_1) {
                thread_list_edit_component_1 = thread_list_edit_component_1_1;
            },
            function (user_edit_component_1_1) {
                user_edit_component_1 = user_edit_component_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    // modules
                    imports: [
                        app_routing_1.AppRouting,
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        router_1.RouterModule,
                        ng2_simple_page_scroll_1.Ng2SimplePageScrollModule.forRoot()
                    ],
                    // directives, components and pipes
                    declarations: [
                        app_component_1.AppComponent,
                        home_component_1.HomeComponent,
                        about_component_1.AboutComponent,
                        login_component_1.LoginComponent,
                        page_not_found_component_1.PageNotFoundComponent,
                        palette_view_component_1.PaletteViewComponent,
                        thread_list_view_component_1.ThreadListViewComponent,
                        thread_list_edit_component_1.ThreadListEditComponent,
                        user_edit_component_1.UserEditComponent
                    ],
                    // providers
                    providers: [
                        auth_http_1.AuthHttp,
                        auth_service_1.AuthService,
                        palette_service_1.PaletteService,
                        thread_list_service_1.ThreadListService
                    ],
                    bootstrap: [
                        app_component_1.AppComponent
                    ]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
