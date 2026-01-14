const orders = [
    {id:1, items:[{name:'Pen', price:10, quantity:2}, {name: 'Notebook', price:50, quantity:1}]},
    {id:2, items:[{name:'Bag', price:700, quantity:1}, {name: 'Bottle', price:300, quantity:2}]},
    {id:3, items:[{name:'Chair', price:1500}]},
    {id:4, items:[]},
    {id:5, items:[{name:'Lamp', quantity:3}]} // Missing Price
];

function getHighValueOrders(){

    return orders.filter(orders => {
        const totalValue = orders.items.reduce((sum, item) => {
            return sum + (item.price ? item.price * (item.quantity || 1): 0);
        }, 0);
        return totalValue > 1000;
    });   
}

// function getHighValueOrders(orders){
//     // Use .filter to find orders with total value greater than 1000
//     return orders.filter(order => {
//         const totalValue = order.items.reduce((sum, item) => {             // Calculate the total value of the order
//             return sum + (item.price ? item.price * (item.quantity || 1) : 0);
//         }, 0); // This 0  is the initial value for the accumulator (sum) in the .reduce method. It means that when the reduction starts, sum is set to 0.

//         // Return true if total value is greater than 1000
//         return totalValue > 1000;
//     });
// }

const highValueOrder =  getHighValueOrders();
console.log(highValueOrder);


// .filter returns a new array containing all elements that match the condition.

// .find returns the first element that matches the condition, or undefined if none found.

// .reduce is used to calculate the total value of each order by summing up the price of each item multiplied by its quantity.
// If an item does not have a price, it is treated as 0 in the calculation  
