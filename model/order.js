class Orders {
    constructor(orderId, billNo, refOrderId, orderType, orderDate, modifiedDate, partyName, partyNo, gstNumber, mode, modeRef, 
        totalQuantity, subTotal, totalTaxAmount, totalDiscountAmount, totalDiscountPercentage, totalAmount, 
        receivedPaidAmount, orderBalance, createdBy)
    {
        this.OrderId = orderId;
        this.BillNo = billNo;
        this.RefOrderId = refOrderId;
        this.OrderType = orderType;
        this.OrderDate = orderDate;
        this.ModifiedDate = modifiedDate;
        this.PartyName = partyName;
        this.PartyNo = partyNo;
        this.GstNumber = gstNumber;
        this.Mode = mode;
        this.ModeRef = modeRef;
        this.TotalQuantity = totalQuantity;
        this.SubTotal = subTotal;
        this.TotalTaxAmount = totalTaxAmount;
        this.TotalDiscountAmount = totalDiscountAmount;
        this.TotalDiscountPercentage = totalDiscountPercentage;
        this.TotalAmount = totalAmount;
        this.ReceivedPaidAmount = receivedPaidAmount;
        this.BalanceAmount = orderBalance;
        this.CreatedBy = createdBy;
        
    }
}

module.exports = Orders;