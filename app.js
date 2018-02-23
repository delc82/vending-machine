let dataController = (function() {
    const data = {
      bills: [5, 10, 20, 50 ,100],
      products: [
        {name: 'Dulce candy', price: 25},
        {name: 'Springles', price: 30},
        {name: 'Tostadas Grills', price: 40}
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
        inputProdSelect: '#productSelection',
        purchaseBtn: '#purchaseButton',
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
    
    let moneyChange = function() {
        document.querySelector(DOM.purchaseBtn).addEventListener('click', function() {
            let money = document.querySelector(DOM.inputMoney).value;
            let product = document.querySelector(DOM.inputProdSelect).value;
            if (money > 0 && !isNaN(money)) {
                if (money < product) {
                    document.querySelector(DOM.changeLabel).textContent = '$0';
                    document.querySelector(DOM.message).textContent = 'Fondos insuficientes!';
                    UICtrl.clearFields();
                } else {
                    let change = money - product;
                    document.querySelector(DOM.changeLabel).textContent = '$' + change;
                    document.querySelector(DOM.message).textContent = 'Gracias por su compra!';
                    UICtrl.clearFields();
                }
            } else {
                document.querySelector(DOM.changeLabel).textContent = '$0';
                document.querySelector(DOM.message).textContent = 'Por favor ingrese dinero';
                UICtrl.clearFields();
            }
        });
    };
    
    return {
        init: function() {
            productSelection();
            moneyChange();
        }
    };
}(dataController, UIController));

controller.init();