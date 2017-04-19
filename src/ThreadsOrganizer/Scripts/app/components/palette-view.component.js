System.register(["@angular/core", "@angular/router", "ng2-simple-page-scroll/ng2-simple-page-scroll", "../services/auth.service", "../services/palette.service"], function (exports_1, context_1) {
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
    var core_1, router_1, ng2_simple_page_scroll_1, auth_service_1, palette_service_1, PaletteViewComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_simple_page_scroll_1_1) {
                ng2_simple_page_scroll_1 = ng2_simple_page_scroll_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (palette_service_1_1) {
                palette_service_1 = palette_service_1_1;
            }
        ],
        execute: function () {
            PaletteViewComponent = (function () {
                function PaletteViewComponent(authService, paletteService, router, activatedRoute, simplePageScrollService) {
                    this.authService = authService;
                    this.paletteService = paletteService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.simplePageScrollService = simplePageScrollService;
                    this.threadFoundFlag = 'yes';
                }
                PaletteViewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var s = this.paletteService.getAll();
                    s.subscribe(function (palettes) {
                        _this.palettes = palettes.sort(function (a, b) {
                            var x = a.Title.toLowerCase();
                            var y = b.Title.toLowerCase();
                            if (x < y) {
                                return -1;
                            }
                            if (x > y) {
                                return 1;
                            }
                            return 0;
                        });
                        if (_this.palettes.length > 0) {
                            _this.currentPalette = _this.palettes[0];
                            _this.getPaletteItems(_this.currentPalette.Id);
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                PaletteViewComponent.prototype.onChangePalette = function (palette) {
                    this.currentPalette = palette;
                    console.log("onChangePalette: " + palette.Title);
                    this.getPaletteItems(palette.Id);
                    this.foundItem = null;
                    this.searchString = null;
                    this.threadFoundFlag = 'yes';
                };
                PaletteViewComponent.prototype.getPaletteItems = function (paletteId) {
                    var _this = this;
                    this.paletteItems = null;
                    this.paletteService.get(paletteId).subscribe(function (palette) {
                        palette.Items.subscribe(function (items) { return _this.paletteItems = items; }, function (error) { return _this.errorMessage = error; });
                    }, function (error) { return _this.errorMessage = error; });
                };
                PaletteViewComponent.prototype.search = function () {
                    //console.log(this.searchString);
                    if (this.searchString) {
                        for (var i = 0; i < this.paletteItems.length; i++) {
                            var item = this.paletteItems[i];
                            if (item.Name == this.searchString) {
                                console.info("Found item with Id: " + item.Id);
                                this.simplePageScrollService.scrollToElement("#item" + item.Id, -130);
                                this.foundItem = item;
                                this.threadFoundFlag = 'yes';
                                return;
                            }
                        }
                        this.simplePageScrollService.scrollToElement("#item" + this.paletteItems[0].Id, -200);
                        this.foundItem = null;
                        this.threadFoundFlag = 'no';
                    }
                    else {
                        this.foundItem = null;
                        this.threadFoundFlag = 'yes';
                    }
                };
                return PaletteViewComponent;
            }());
            PaletteViewComponent = __decorate([
                core_1.Component({
                    selector: "palette-view",
                    templateUrl: "./app/components/palette-view.component.html",
                    animations: [
                        core_1.trigger('threadFound', [
                            core_1.state('yes', core_1.style({
                                'border-color': 'transparent',
                            })),
                            core_1.state('no', core_1.style({
                                'border-color': 'red'
                            })),
                            core_1.transition('yes => no', core_1.animate('400ms ease-in-out')),
                            core_1.transition('no => yes', core_1.animate('400ms ease-in-out'))
                        ]),
                    ]
                }),
                __metadata("design:paramtypes", [auth_service_1.AuthService,
                    palette_service_1.PaletteService,
                    router_1.Router,
                    router_1.ActivatedRoute,
                    ng2_simple_page_scroll_1.SimplePageScrollService])
            ], PaletteViewComponent);
            exports_1("PaletteViewComponent", PaletteViewComponent);
            ;
        }
    };
});
