class ChequeData {
    constructor(chequeId, partyName, inOut, amount, refOrderId, refOrderType, status, modeRef, paymentFromOrToRef, 
        createdBy, modifiedBy, createdDate, modifiedDate)
    {
        this.ChequeId = chequeId;
        this.PartyName = partyName;
        this.InOut = inOut;
        this.Amount = amount;
        this.RefOrderId = refOrderId;
        this.RefOrderType = refOrderType;
        this.Status = status;
        this.ModeRef = modeRef;
        this.PaymentFromOrToRef = paymentFromOrToRef;
        this.CreatedBy = createdBy;
        this.ModifiedBy = modifiedBy;
        this.CreatedDate = createdDate;
        this.ModifiedDate = modifiedDate;
    }
}

module.exports = ChequeData;