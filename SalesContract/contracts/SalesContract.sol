pragma solidity ^0.4.17;

contract SalesContract {
    address public seller;
    uint public orderNumber;
    uint public productsCount;

    string[] public listedProductsIds;
    mapping(string => Product) products;
    
    struct Product {
        string productId;
        string productDescription;
        uint unitPrice;
        uint availableQty;
    }
    
    struct Order {
        address purchaser;
        string productId;
        uint qty;
        uint unitPrice;
        uint totalPrice;
        bool paid;
        bool shipped;
        bool received;
    }
    
    mapping(uint => Order) orders;
    uint[] public listedOrderNumbers;
    
    constructor () public payable {
        seller = msg.sender;
        orderNumber = 0;
        productsCount = 0;
    }
    event ProductEvent(Product product);
    // products functions
    function addProduct(
        string _productId,
        string _productDescription,
        uint _unitPrice,
        uint _availableQty
    ) public {
        require(msg.sender == seller, "Sorry, you are not allowed to add products.");
        listedProductsIds.push(_productId);
        Product memory newProduct = Product({
           productId: _productId,
           productDescription: _productDescription,
           unitPrice: _unitPrice,
           availableQty: _availableQty
        });
        products[_productId] = newProduct;
        productsCount++;
        emit ProductEvent(newProduct);
    }
    
    function getListedProductsIdLength() public view returns (uint) {
        return listedProductsIds.length;
    }
    
    function retrieveProduct(string _productId) public view returns (
        string, string, uint, uint
    ) {
        return (
            products[_productId].productId,
            products[_productId].productDescription,
            products[_productId].unitPrice,
            products[_productId].availableQty
        );
    }
    
    function deleteListedProduct(uint _index) public {
        delete listedProductsIds[_index];
        productsCount--;
    }
    // function getListedProductsId(uint _index) public view returns (string) {
    //     return listedProductsIds[_index];
    // }
    function getListedProduct(uint _index) public view returns (string) {
        return listedProductsIds[_index];
    }
    
    event OrderEvent(Order order);
    // Orders functions
    function orderProduct(string _productId, uint _qty) public payable {
        Product storage product = products[_productId];
        require(product.availableQty > 0, "There is no more stock of the product.");
        require(product.availableQty >= _qty, "Sorry, there is not enough qty to meet your request at the moment.");
        uint totalPrice = product.unitPrice * _qty;
        require(msg.value == totalPrice, "Your payment has to be the same as the total price of the order.");
        Order memory newOrder = Order({
            purchaser: msg.sender,
            productId: product.productId,
            qty: _qty,
            unitPrice: product.unitPrice,
            totalPrice: totalPrice,
            paid: true,
            shipped: false,
            received: false
        });
        orderNumber++;
        orders[orderNumber] = newOrder;
        listedOrderNumbers.push(orderNumber);
        product.availableQty = product.availableQty - _qty;
        Product memory updatedProduct = product;
        emit OrderEvent(newOrder);
        emit ProductEvent(updatedProduct);
    } 
    
    function ship(uint _orderNumber) public {
        require(msg.sender == seller, "Sorry, only the seller can ship the order.");
        Order storage order = orders[_orderNumber];
        require(order.paid == true, "Payment is not made yet. Please pay first.");
        require(order.shipped == false, "The order is already shipped.");
        require(order.received == false, "The order is already received.");
        order.shipped = true;
    }

    function receive(uint _orderNumber) public {
        Order storage order = orders[_orderNumber];
        require(msg.sender == order.purchaser, "Sorry, only the purchaser who ordered the goods/services can receive them.");
        require(order.paid == true, "Payment is not made yet. Please pay first.");
        require(order.shipped == true, "The order is not yet shipped yet.  Please ask your seller to ship.");
        require(order.received == false, "The order is already received.");
        order.received = true;
        seller.transfer(order.totalPrice);
    }

    function retrieveOrder(uint _orderNumber) public view returns (
        address, string, uint, uint, uint, bool, bool, bool
    ) {
        Order storage order = orders[_orderNumber];
        return (
            order.purchaser,
            order.productId,
            order.qty,
            order.unitPrice,
            order.totalPrice,
            order.paid,
            order.shipped,
            order.received
        );
    }
}