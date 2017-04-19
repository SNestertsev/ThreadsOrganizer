System.register(["@angular/core", "@angular/http", "rxjs/Observable", "../auth.http"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, auth_http_1, PaletteService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (auth_http_1_1) {
                auth_http_1 = auth_http_1_1;
            }
        ],
        execute: function () {
            PaletteService = (function () {
                function PaletteService(http) {
                    this.http = http;
                    this.baseUrl = "api/palette/"; // Web API URL
                    this.cachedData = null;
                }
                PaletteService.prototype.getAll = function () {
                    var _this = this;
                    if (this.cachedData) {
                        return Observable_1.Observable.of(this.cachedData);
                    }
                    else {
                        var url = this.baseUrl;
                        return this.http.get(url)
                            .map(function (response) { return response.json(); })
                            .catch(this.handleError)
                            .do(function (data) { _this.cachedData = data; });
                    }
                };
                PaletteService.prototype.get = function (id) {
                    var _this = this;
                    if (id == null) {
                        throw new Error("id is required.");
                    }
                    return this.getAll()
                        .map(function (list) { return list.find(function (p) { return p.Id === id; }); })
                        .do(function (p) {
                        var url = _this.baseUrl + id;
                        p.Items = _this.http.get(url)
                            .map(function (response) { return response.json(); })
                            .catch(_this.handleError);
                    });
                };
                // calls the [POST] /api/palette/ Web API method to add a new palette.
                PaletteService.prototype.add = function (list) {
                    var url = this.baseUrl;
                    return this.http.post(url, JSON.stringify(list), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [PUT] /api/palette/{id} Web API method to update an existing palette.
                PaletteService.prototype.update = function (list) {
                    var url = this.baseUrl + list.Id;
                    return this.http.put(url, JSON.stringify(list), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [DELETE] /api/palette/{id} Web API method to delete the palette with the given id.
                PaletteService.prototype.delete = function (id) {
                    var url = this.baseUrl + id;
                    return this.http.delete(url)
                        .catch(this.handleError);
                };
                // returns a viable RequestOptions object to handle Json requests
                PaletteService.prototype.getRequestOptions = function () {
                    return new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            "Content-Type": "application/json"
                        })
                    });
                };
                PaletteService.prototype.handleError = function (error) {
                    // output errors to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server error");
                };
                return PaletteService;
            }());
            PaletteService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [auth_http_1.AuthHttp])
            ], PaletteService);
            exports_1("PaletteService", PaletteService);
        }
    };
});
