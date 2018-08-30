pragma solidity ^0.4.17;

contract SalesContract {
    address public seller;

    constructor () public payable {
        seller = msg.sender;
    }
    
    struct Product {
        string productId;
        string productDescription;
        uint unitPrice;
        uint availableQty;
    }
    Product[] public products;
    
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
        products.push(newProduct);
    }
    
    function getProductsCount() public view returns (uint) {
        return products.length;
    }
    
    struct Order {
        address purchaser;
        uint productIndex;
        string productId;
        uint qty;
        uint unitPrice;
        uint totalPrice;
        bool paid;
        bool shipped;
        bool received;
    }
    
    Order[] public orders;
    
    function orderProduct(uint _productIndex, uint _qty) public payable {
        Product storage product = products[_productIndex];
        require(product.availableQty > 0);
        require(product.availableQty >= _qty);
        uint totalPrice = product.unitPrice * _qty;
        require(msg.value == totalPrice);
        Order memory newOrder = Order({
            purchaser: msg.sender,
            productIndex: _productIndex,
            productId: product.productId,
            qty: _qty,
            unitPrice: product.unitPrice,
            totalPrice: totalPrice,
            paid: true,
            shipped: false,
            received: false
        });
        orders.push(newOrder);
        product.availableQty = product.availableQty - _qty;
    }
    
    function getOrdersCount() public view returns (uint) {
        return orders.length;
    }
    
    function ship(uint _orderIndex) public {
        require(msg.sender == seller);
        Order storage order = orders[_orderIndex];
        require(order.paid == true);
        require(order.shipped == false);
        require(order.received == false);
        order.shipped = true;
    }

    function receive(uint _orderIndex) public {
        Order storage order = orders[_orderIndex];
        require(msg.sender == order.purchaser);
        require(order.paid == true);
        require(order.shipped == true);
        require(order.received == false);
        order.received = true;
        seller.transfer(order.totalPrice);
    }    
}