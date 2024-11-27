var products = []; 
        var cart = []; 
       
        var productReq = new XMLHttpRequest();
        productReq.open('GET', 'https://dummyjson.com/products');
        productReq.send();

        productReq.onreadystatechange = function () {
            if (productReq.readyState === 4 && productReq.status === 200) {
                var response = JSON.parse(productReq.responseText);
                products = response.products;
                displayProducts(products);
            }
        };

       
        function displayProducts(productsToDisplay) {
            var container = document.getElementById('product-container');
            container.innerHTML = '';
            productsToDisplay.forEach(product => {
                var card = document.createElement('div');
                card.className = 'card';

                var img = document.createElement('img');
                var h1 = document.createElement('h1');
                var h2 = document.createElement('h2');
                var h3 = document.createElement('h3');
                var button = document.createElement('button');

                img.src = product.thumbnail;
                img.alt = product.title;
                h1.textContent = product.title;
                h2.textContent = product.description;
                h3.textContent = `Price: $${product.price}`;
                button.textContent = 'Add to Cart';

                button.onclick = function () {
                    addToCart(product);
                };

                card.append(img, h1, h2, h3, button);
                container.appendChild(card);
            });
        }

        function searchProducts() {
            var query = document.getElementById('search-input').value.toLowerCase();
            var filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        }

        function addToCart(product) {
            cart.push(product);
            updateCart();
        }

        function updateCart() {
            document.getElementById('cart-count').textContent = cart.length;

            var cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                var cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                var img = document.createElement('img');
                var p = document.createElement('p');
                var button = document.createElement('button');

                img.src = item.thumbnail;
                img.alt = item.title;
                p.textContent = item.title;
                button.textContent = 'Remove';

                button.onclick = function () {
                    cart.splice(index, 1);
                    updateCart();
                };

                cartItem.append(img, p, button);
                cartItems.appendChild(cartItem);
            });
        }

       
        function toggleCartSidebar() {
            var sidebar = document.getElementById('cart-sidebar');
            sidebar.classList.toggle('active');
        }