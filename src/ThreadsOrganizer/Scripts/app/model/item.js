System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters: [],
        execute: function () {
            Item = (function () {
                function Item(Id, Name, Color, Description, PaletteId) {
                    this.Id = Id;
                    this.Name = Name;
                    this.Color = Color;
                    this.Description = Description;
                    this.PaletteId = PaletteId;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    };
});
