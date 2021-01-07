const { get } = require("mongoose");

class OrderDetails {
    constructor(additionalCharges, additionalInfo, brand, createdBy, discountAmount, discountPercentage,modifiedDate, 
        orderId, orderType, price, productName, quantity, subTotal, taxInEx, totalAmount)
    {
    
        this.OrderId = orderId;
        this.OrderType = orderType;
        this.ProductName = productName;
        this.Brand = brand;
        this.AdditionalInfo = additionalInfo;
        this.TaxInEx = taxInEx;
        this.Quantity = quantity;
        this.Price = price;
        this.AdditionalCharges = additionalCharges;
        this.GSTPercentage = gstpercentage;
        this.GSTAmount = gstamount;
        this.SubTotal = subTotal;
        this.TotalAmount = totalAmount;
        this.DiscountPercentage = discountPercentage;
        this.DiscountAmount = discountAmount;
        this.ModifiedDate = modifiedDate;
        this.CreatedBy = createdBy;
    }
}

module.exports = OrderDetails;