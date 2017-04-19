System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ThreadList;
    return {
        setters: [],
        execute: function () {
            ThreadList = (function () {
                function ThreadList(Id, Title, Description) {
                    this.Id = Id;
                    this.Title = Title;
                    this.Description = Description;
                }
                return ThreadList;
            }());
            exports_1("ThreadList", ThreadList);
        }
    };
});
