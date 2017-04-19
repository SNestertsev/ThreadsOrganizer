System.register(["@angular/core", "@angular/router", "../services/auth.service", "../services/thread-list.service", "../model/thread-list"], function (exports_1, context_1) {
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
    var core_1, router_1, auth_service_1, thread_list_service_1, thread_list_1, ThreadListEditComponent;
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
            },
            function (thread_list_1_1) {
                thread_list_1 = thread_list_1_1;
            }
        ],
        execute: function () {
            ThreadListEditComponent = (function () {
                function ThreadListEditComponent(authService, threadListService, router, activatedRoute) {
                    this.authService = authService;
                    this.threadListService = threadListService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ThreadListEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = +this.activatedRoute.snapshot.params['id'];
                    if (id) {
                        this.threadListService.get(id).subscribe(function (list) {
                            _this.list = list;
                            console.log(_this.list);
                        });
                    }
                    else if (id === 0) {
                        console.log("id is 0: adding a new list...");
                        this.list = new thread_list_1.ThreadList(0, "New List", null);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                };
                ThreadListEditComponent.prototype.onInsert = function (list) {
                    var _this = this;
                    this.threadListService.add(list).subscribe(function (data) {
                        _this.list = data;
                        console.log("ThreadList " + _this.list.Id + " has been added.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ThreadListEditComponent.prototype.onUpdate = function (list) {
                    var _this = this;
                    this.threadListService.update(list).subscribe(function (data) {
                        _this.list = data;
                        console.log("ThreadList " + _this.list.Id + " has been updated.");
                        _this.router.navigate(["thread-list/view", _this.list.Id]);
                    }, function (error) { return console.log(error); });
                };
                ThreadListEditComponent.prototype.onDelete = function (list) {
                    var _this = this;
                    var id = list.Id;
                    this.threadListService.delete(id).subscribe(function (data) {
                        console.log("ThreadList " + id + " has been deleted.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ThreadListEditComponent.prototype.onBack = function () {
                    this.router.navigate([""]);
                };
                ThreadListEditComponent.prototype.onListDetailView = function (list) {
                    this.router.navigate(["thread-list/view", list.Id]);
                };
                return ThreadListEditComponent;
            }());
            ThreadListEditComponent = __decorate([
                core_1.Component({
                    selector: "list-edit",
                    templateUrl: "./app/components/thread-list-edit.component.html"
                }),
                __metadata("design:paramtypes", [auth_service_1.AuthService,
                    thread_list_service_1.ThreadListService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ThreadListEditComponent);
            exports_1("ThreadListEditComponent", ThreadListEditComponent);
        }
    };
});
