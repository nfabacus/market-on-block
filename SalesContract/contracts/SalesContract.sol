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
    
    // products functions
    function addProduct(
        string _productId,
        string _productDescription,
        uint _unitPrice,
        uint _availableQty
    ) public {
        require(msg.sender == seller);
        listedProductsIds.push(_productId);
        Product memory newProduct = Product({
           productId: _productId,
           productDescription: _productDescription,
           unitPrice: _unitPrice,
           availableQty: _availableQty
        });
        products[_productId] = newProduct;
        productsCount++;
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
    
    // Orders functions
    function orderProduct(string _productId, uint _qty) public payable {
        Product storage product = products[_productId];
        require(product.availableQty > 0);
        require(product.availableQty >= _qty);
        uint totalPrice = product.unitPrice * _qty;
        require(msg.value == totalPrice);
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
    } 
    
    function ship(uint _orderNumber) public {
        require(msg.sender == seller);
        Order storage order = orders[_orderNumber];
        require(order.paid == true);
        require(order.shipped == false);
        require(order.received == false);
        order.shipped = true;
    }

    function receive(uint _orderNumber) public {
        Order storage order = orders[_orderNumber];
        require(msg.sender == order.purchaser);
        require(order.paid == true);
        require(order.shipped == true);
        require(order.received == false);
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