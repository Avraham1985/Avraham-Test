
(function (ng) {
    var app = ng.module('contactTree', ['tree.service', 'tree.directives']);
    app.controller("TreeController", ["TreeService", function (TreeService) {
        var co = this;
        buildTree();
        function buildTree() {
            TreeService.getTree().then(function (result) {
                co.tree = result.data;
               console.log(co.tree);
            }, function (result) {
                alert("Tree no available, Error: " + result);
            });
        }
    }]);
})(angular);
