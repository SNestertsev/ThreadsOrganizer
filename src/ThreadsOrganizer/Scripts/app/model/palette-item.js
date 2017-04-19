System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PaletteItem;
    return {
        setters: [],
        execute: function () {
            PaletteItem = (function () {
                function PaletteItem(Id, Name, Description, Color) {
                    this.Id = Id;
                    this.Name = Name;
                    this.Description = Description;
                    this.Color = Color;
                }
                return PaletteItem;
            }());
            exports_1("PaletteItem", PaletteItem);
        }
    };
});
