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
    }
}());

let UIController = (function() {
    const DOMstrings = {
        inputMoney: '#addMoney',
        inputProdSelect: '#productSelection'
    };
    
    return {
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
    
}());

let controller = (function(dataCtrl, UICtrl) {
    let data = dataCtrl.getData();
    let DOM = UICtrl.getDOMstrings();
    
    let productSelection = function() {
        data.products.forEach(function(element) {
            let newOption = '<option value="' + element.name + '">'+ element.name + '</option>';
            document.querySelector(DOM.inputProdSelect).insertAdjacentHTML('beforeend', newOption);
        });
    };
    
    return {
        init: function() {
            productSelection();
        }
    }
}(dataController, UIController));

controller.init();