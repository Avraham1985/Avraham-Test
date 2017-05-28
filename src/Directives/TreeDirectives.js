
(function (ng) {
    var app = ng.module('tree.directives', []);
    app.directive('nodeTree', function () {
        return {
            template: '<node ng-repeat="node in tree"></node>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=contacts'
            }
        };
    });
    //directive
    app.directive('node', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'view/node.html',
            link: function (scope, element) {
                // here checking that if current node has children then rendering children
                if (scope.node && scope.node.contacts && scope.node.contacts.length > 0) {
                    scope.node.childrenVisibility = true;
                    var childNode = $compile('<ul class="tree" ng-if="!node.childrenVisibility"><node-tree contacts="node.contacts"></node-tree></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.node.childrenVisibility = false;
                }
            },
            controller: ["$scope", function ($scope) {
                // this function is for just toggle the visibility of children
                $scope.toggleVisibility = function (node) {
                    if (node.contacts) {
                        node.childrenVisibility = !node.childrenVisibility;
                    }
                };
                // check all the nodes
                $scope.checkNode = function (node) {
                    node.type = !node.type;
                    function checkChildren(c) {
                        angular.forEach(c.contacts, function (c) {
                            c.type = c.type;
                            checkChildren(c);
                        });
                    }
                    checkChildren(node);
                };
            }]
        };
    });
})(angular);