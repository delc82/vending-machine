var inventoryController = (function(){
	let inventory = {
  	products: [25, 50, 75, 100],
    bills: [10, 20, 50, 100]
  };
	return {
  	getInventory: function() {
    	return {
      	drinks: inventory.products,
        bills: inventory.bills
      }
    }
  }
}());

var controller = (function(inventoryCtrl) {
	let data = {
  	drinks: inventoryCtrl.getInventory().drinks,
    bills: inventoryCtrl.getInventory().bills,
    message: '',
  };
  
	let funds = function(int, obj) {
  	data.drinks.map(function(obj) {
    	if (int < data.drinks[data.drinks.indexOf(obj)]) {
      	data.message = 'Insufficient funds!';
      } else {
      	data.message = 'Thanks for your purchase!';
      }
      document.querySelector('.message').textContent = data.message;
    })
  };
  
  let getChange = function(int, obj) {
  	let change = 0;
    change = int - data.drinks[data.drinks.indexOf(obj)];
    if (change < 0) {
    	change = 0;
    }
    document.querySelector('.change').textContent = change;
  };
  
	return {
  	showData: function() {
    	document.querySelector('.products').textContent = data.drinks;
      document.querySelector('.bills').textContent = data.bills;
    },
  	init: function(int, obj) {
    	funds(int);
      getChange(int, obj);
    }
  }
}(inventoryController));

controller.showData();

(function(){
	document.querySelector('#selectButton').addEventListener('click', function(e) {
    controller.init(parseInt(document.querySelector('#addMoney').value), parseInt(document.querySelector('#productSelection').value));
    e.preventDefault();
  });
}())
