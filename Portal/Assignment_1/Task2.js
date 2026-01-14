const products =[
    {name: 'Pen', categories: ['stationary', 'writing']},
    {name: 'Laptops', categories: ['electronics', 'computers']},
    {name: 'chair', categories: []},
    {name: 'Water Bottle', categories: ['kitchen', 'storage']},
];

function productDetails(products) {
        // Use .map to create a new array with formatted strings
        return products.map(product => {
            // Check if categories exist, if not, set to 'No Categories'
            const categories = product.categories.length > 0 ? product.categories.join(', ') : 'No Categories';
            // Return the formatted string
            return `${product.name}: ${categories}`;
        });
}

const details = productDetails(products);
console.log(details);

// Callback fn. : index, value, array