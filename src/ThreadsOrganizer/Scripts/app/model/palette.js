System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Palette;
    return {
        setters: [],
        execute: function () {
            Palette = (function () {
                function Palette(Id, Title, Description, Logo) {
                    this.Id = Id;
                    this.Title = Title;
                    this.Description = Description;
                    this.Logo = Logo;
                    this.Items = null;
                }
                return Palette;
            }());
            exports_1("Palette", Palette);
        }
    };
});
