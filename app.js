let dataController = (function() {
    const data = {
      bills: [5, 10, 20, 50 ,100],
      products: [
        {name: 'Dulce candy', price: 25},
        {name: 'Springles', price: 30},
        {name: 'Tostadas Grills', price: 40},
        {name: 'Toxic Pizza', price: 67},
        {name: 'Orange Juice', price: 80}
      ]
    };
    
    return {
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
    let fundsArr = [];
    let totalFunds = 0;
    let change = 0;
    
    let productSelection = function() {
        data.products.forEach(function(element) {
            let newOption = '<option value="' + element.price + '">'+ element.name + ' - $' + element.price + '</option>';
            document.querySelector(DOM.inputProdSelect).insertAdjacentHTML('beforeend', newOption);
        });
    };
    
    let getSum = function(a, b) {
        return a + b;
    }
    
    let addFunds = function() {
        document.querySelector(DOM.fundsBtn).addEventListener('click', function() {
            let money = parseFloat(document.querySelector(DOM.inputMoney).value);
            if (money > 0 && !isNaN(money)) {
                fundsArr.push(money);
            }
            if (fundsArr.length) {
                totalFunds = fundsArr.reduce(getSum);
                document.querySelector(DOM.fundsLabel).textContent = '$' + totalFunds;
            }
            UICtrl.clearFields();
        });
    };
    
    let moneyChange = function() {
        document.querySelector(DOM.purchaseBtn).addEventListener('click', function() {
            let product = document.querySelector(DOM.inputProdSelect).value;
            if (totalFunds > 0) {
                if (totalFunds < product) {
                    UICtrl.uiChange(DOM.changeLabel, '$0');
                    UICtrl.uiChange(DOM.message, 'Fondos insuficientes!');
                    UICtrl.clearFields();
                } else {
                    change = totalFunds - product;
                    UICtrl.uiChange(DOM.changeLabel, '$' + change);
                    fundsArr = [];
                    totalFunds = 0;
                    UICtrl.uiChange(DOM.fundsLabel, '$' + totalFunds);
                    UICtrl.uiChange(DOM.message, 'Gracias por su compra!');
                    UICtrl.clearFields();
                }
            } else {
                UICtrl.uiChange(DOM.changeLabel, '$0');
                UICtrl.uiChange(DOM.message, 'Por favor ingrese dinero');
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