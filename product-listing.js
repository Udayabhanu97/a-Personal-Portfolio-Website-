document.addEventListener('DOMContentLoaded', function () {
    const categoryFilter = document.getElementById('category-filter');
    const priceSort = document.getElementById('price-sort');
    const productList = document.getElementById('product-list');

    // Function to filter products by category
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedSort = priceSort.value;

        // Get all product items
        const productItems = document.querySelectorAll('.product-item');

        // Filter and sort products
        productItems.forEach(function (product) {
            const productCategory = product.getAttribute('data-category');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            // Filter by category
            if (selectedCategory === 'all' || productCategory === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        // Sorting by price
        const sortedProducts = Array.from(productItems)
            .filter(product => product.style.display !== 'none')
            .sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                return selectedSort === 'low-to-high' ? priceA - priceB : priceB - priceA;
            });

        // Re-append sorted products to the list
        sortedProducts.forEach(function (product) {
            productList.appendChild(product);
        });
    }

    // Add event listeners for filter and sort changes
    categoryFilter.addEventListener('change', filterProducts);
    priceSort.addEventListener('change', filterProducts);

    // Initialize filter and sort
    filterProducts();
});
