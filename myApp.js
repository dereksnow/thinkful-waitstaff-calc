angular.module('myApp', [])
    .controller('FormCtrl', ['$scope',
        function($scope) {
            function subtotalCalc(basePrice, tax) {
                return (basePrice + basePrice * tax / 100);
            }

            function tipCalc(subtotal, tipPercent) {
                return (subtotal * tipPercent / 100);
            }

            $scope.data = {
                subtotal: 0,
                tip: 0,
                total: 0,
                tipTotal: 0,
                mealCount: 0,
                avgTipPerMeal: 0
            };
	    // Preserve copy of original data for reset
	    $scope.originalData = angular.copy($scope.data);

            $scope.submit = function() {
                if ($scope.myForm.$valid) {
                    console.log('The form is valid');
                    $scope.data.mealCount++;
                    $scope.data.subtotal = subtotalCalc($scope.basePrice, $scope.taxRate);
                    $scope.data.tip = tipCalc($scope.data.subtotal, $scope.tipPercent);
                    $scope.data.total = $scope.data.subtotal + $scope.data.tip;
                    $scope.data.tipTotal = $scope.data.tip + $scope.data.tipTotal;
                    $scope.data.avgTipPerMeal = $scope.data.tipTotal / $scope.data.mealCount;
                    $scope.submitted = false;
                }
            };

            $scope.cancel = function() {
                $scope.basePrice = "";
                $scope.taxRate = "";
                $scope.tipPercent = "";
            };

            $scope.reset = function() {
                $scope.cancel();
                $scope.data = angular.copy($scope.originalData);
                $scope.myForm.$setPristine();
            };
        }
    ]);
