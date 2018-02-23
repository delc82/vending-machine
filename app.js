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
        changeLabel: '.change'
    };
    
    return {
        getDOMstrings: function() {
            return DOMstrings;
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
            let addChange = document.querySelector(DOM.inputMoney).value;
            let product = document.querySelector(DOM.inputProdSelect).value;
            let change = addChange - product;
            document.querySelector(DOM.changeLabel).textContent = '$' + change;
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