pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract SalesContract {
    address public seller;
    uint public orderNumber;
    
    constructor () public payable {
        seller = msg.sender;
        orderNumber = 0;
    }
    
    // Products
    string[] public listedProductsIds;
    mapping(string => Product) products;
    uint public productsCount;
    
    struct Product {
        string productId;
        string productDescription;
        uint unitPrice;
        uint availableQty;
    }
    
    function addProduct(
        string _productId,
        string _productDescription,
        uint _unitPrice,
        uint _availableQty
    ) public {
        require(msg.sender == seller);
        Product memory newProduct = Product({
           productId: _productId,
           productDescription: _productDescription,
           unitPrice: _unitPrice,
           availableQty: _availableQty
        });
        products[_productId] = newProduct;
        listedProductsIds.push(_productId);
        productsCount++;
    }
    
    function retrieveProduct(string _productId) public view returns (Product) {
        return products[_productId];
    }
    
    function deleteListedProduct(uint _index) public {
        delete listedProductsIds[_index];
        productsCount--;
    }
    
    function getListedProductsIds() public view returns (string[]) {
        return listedProductsIds;
    }
    
    // Orders
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
    
    function retrieveOrder(uint _orderNumber) public view returns (Order) {
        return orders[_orderNumber];
    }    
}