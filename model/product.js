class Products {
    constructor(name, brand, itemLocation, qty, salePrice, saleTaxInEx, purchasePrice, purchaseTaxInEx, 
        gstpercentage, createdBy, modifiedBy, createdDate, modifiedDate)
    {
        this.ProductName = name;
        this.Brand = brand;
        this.ItemLocation = itemLocation;
        this.Quantity = qty;
        this.SalePrice = salePrice;
        this.SaleTaxInEx = saleTaxInEx;
        this.PurchasePrice = purchasePrice;
        this.PurchaseTaxInEx = purchaseTaxInEx;
        this.GSTPercentage = gstpercentage;
        this.CreatedBy = createdBy;
        this.ModifiedBy = modifiedBy;
        this.CreatedDate = createdDate;
        this.ModifiedDate = modifiedDate;
    }
}

module.exports = Products;