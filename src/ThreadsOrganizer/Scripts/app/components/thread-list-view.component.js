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
    var core_1, router_1, auth_service_1, thread_list_service_1, ThreadListViewComponent;
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
            ThreadListViewComponent = (function () {
                function ThreadListViewComponent(authService, threadListService, router, activatedRoute) {
                    this.authService = authService;
                    this.threadListService = threadListService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.items = null;
                }
                ThreadListViewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.threadListService.get(id).subscribe(function (list) { return _this.list = list; });
                        this.threadListService.getItems(id).subscribe(function (items) { return _this.items = items; });
                    }
                    else if (id === 0) {
                        console.log("id is 0: switching to edit mode...");
                        this.router.navigate(["thread-list/edit", 0]);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                };
                ThreadListViewComponent.prototype.onListDetailEdit = function (list) {
                    this.router.navigate(["thread-list/edit", list.Id]);
                };
                ThreadListViewComponent.prototype.onBack = function () {
                    this.router.navigate(['']);
                };
                return ThreadListViewComponent;
            }());
            ThreadListViewComponent = __decorate([
                core_1.Component({
                    selector: "list-view",
                    templateUrl: "./app/components/thread-list-view.component.html"
                }),
                __metadata("design:paramtypes", [auth_service_1.AuthService,
                    thread_list_service_1.ThreadListService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ThreadListViewComponent);
            exports_1("ThreadListViewComponent", ThreadListViewComponent);
            ;
        }
    };
});
