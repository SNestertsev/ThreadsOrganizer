System.register(["@angular/core", "@angular/router", "../services/auth.service", "../services/thread-list.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, auth_service_1, thread_list_service_1, HomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (thread_list_service_1_1) {
                thread_list_service_1 = thread_list_service_1_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
                function HomeComponent(authService, threadListService, router) {
                    this.authService = authService;
                    this.threadListService = threadListService;
                    this.router = router;
                    this.title = "Welcome View";
                    this.lists = null;
                    this.hasLists = false;
                }
                HomeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.authService.isLoggedIn()) {
                        var s = this.threadListService.getAll();
                        s.subscribe(function (lists) {
                            _this.lists = lists;
                            _this.hasLists = (_this.lists.length > 0);
                        }, function (error) { return _this.errorMessage = error; });
                    }
                };
                HomeComponent.prototype.onSelect = function (list) {
                    this.selectedList = list;
                    console.log("Thread list with Id " + this.selectedList.Id + " has been clicked: loading list viewer...");
                    this.router.navigate(["thread-list/view", this.selectedList.Id]);
                };
                return HomeComponent;
            }());
            HomeComponent = __decorate([
                core_1.Component({
                    selector: "home",
                    templateUrl: "./app/components/home.component.html"
                }),
                __metadata("design:paramtypes", [auth_service_1.AuthService,
                    thread_list_service_1.ThreadListService,
                    router_1.Router])
            ], HomeComponent);
            exports_1("HomeComponent", HomeComponent);
        }
    };
});
