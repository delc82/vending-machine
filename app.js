let dataController = (function() {
    const data = {
        bill: 0,
        bills: [5, 10, 20, 50 ,100],
        billsInChange: [],
        money: 0,
        change: 0,
        rest: 0,
        fundsArr: [],
        totalFunds: 0,
        productPrice: 0,
        products: [
            {name: 'Dulce candy', price: 25},
            {name: 'Springles', price: 30},
            {name: 'Tostadas Grills', price: 40},
            {name: 'Toxic Pizza', price: 67},
            {name: 'Orange Juice', price: 80},
            {name: 'Limonade Freeze', price: 90}
        ]
    };
    
    return {
        testing: function() {
          console.log(data);  
        },
        getData: function() {
            return data;
        }
    };
}());

let UIController = (function() {
    const DOMstrings = {
        inputMoney: '#addMoney',
        fundsBtn: '#fundsButton',
        inputProdSelect: '#productSelection',
        purchaseBtn: '#purchaseButton',
        fundsLabel: '.funds',
        changeLabel: '.change',
        message: '.message'
    };
    
    let clearValues = function() {
      document.querySelector(DOMstrings.inputMoney).value = '';  
    };
    
    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        clearFields: function() {
            clearValues();
        },
        uiChange: function(uiElement, message) {
            document.querySelector(uiElement).textContent = message;
        }
    };
    
}());

let controller = (function(dataCtrl, UICtrl) {
    let data = dataCtrl.getData();
    let DOM = UICtrl.getDOMstrings();
    
    let productSelection = function() {
        data.products.forEach(function(element) {
            let newOption = '<option value="' + element.price + '">'+ element.name + ' - $' + element.price + '</option>';
            document.querySelector(DOM.inputProdSelect).insertAdjacentHTML('beforeend', newOption);
        });
    };
    
    let getSum = function(a, b) {
        return a + b;
    };
    
    let addFunds = function() {
        document.querySelector(DOM.fundsBtn).addEventListener('click', function() {
            data.money = parseFloat(document.querySelector(DOM.inputMoney).value);
            if (data.money > 0 && !isNaN(data.money)) {
                data.fundsArr.push(data.money);
            }
            if (data.fundsArr.length) {
                data.totalFunds = data.fundsArr.reduce(getSum);
                document.querySelector(DOM.fundsLabel).textContent = '$' + data.totalFunds;
            }
            UICtrl.clearFields();
        });
    };
    
    let moneyChange = function() {
        document.querySelector(DOM.purchaseBtn).addEventListener('click', function() {
            data.productPrice = document.querySelector(DOM.inputProdSelect).value;
            if (data.totalFunds > 0) {
                if (data.totalFunds < data.productPrice) {
                    UICtrl.uiChange(DOM.changeLabel, '$0');
                    UICtrl.uiChange(DOM.message, 'Insufficient funds!');
                    UICtrl.clearFields();
                } else {
                    data.change = data.totalFunds - data.productPrice;
                    data.rest = data.change;
                    for (let i = data.bills.length; i >= 0; i--) {
                        data.bill = data.bills[i];
                        if (data.rest >= data.bill) {
                            while (data.rest >= data.bill) {
                                data.rest = data.rest - data.bill;
                                data.billsInChange.push(data.bill);
                            }
                        }
                    };
                    data.fundsArr = [];
                    data.totalFunds = 0;
                    UICtrl.uiChange(DOM.changeLabel, '$' + data.change + ' => Bills given:' + ' ' + '(' + data.billsInChange + ')');
                    UICtrl.uiChange(DOM.fundsLabel, '$' + data.totalFunds);
                    UICtrl.uiChange(DOM.message, 'Thanks for your purchase!');
                    UICtrl.clearFields();
                }
            } else {
                UICtrl.uiChange(DOM.changeLabel, '$0');
                UICtrl.uiChange(DOM.message, 'Please add some money');
                UICtrl.clearFields();
            }
        });
    };
    
    return {
        init: function() {
            addFunds();
            productSelection();
            moneyChange();
        }
    };
}(dataController, UIController));

controller.init();