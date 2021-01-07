class BankAccountData {
    constructor(displayName, type, amount, openingBalance, createdBy, modifiedBy, createdDate, modifiedDate){
        this.DisplayName = displayName;
        this.Type = type;
        this.Amount = amount;
        this.OpeningBalance = openingBalance;
        this.CreatedBy = createdBy;
        this.ModifiedBy = modifiedBy;
        this.CreatedDate = createdDate;
        this.ModifiedDate = modifiedDate;
    }
}

module.exports = BankAccountData;