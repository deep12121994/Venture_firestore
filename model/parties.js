class Parties {
    constructor(name, no, emailId, gstNumber, due, createdBy, modifiedBy, createdDate, modifiedDate){
        this.PartyName = name;
        this.PhoneNo = no;
        this.EmailId = emailId;
        this.GstNumber = gstNumber;
        this.Due = due;
        this.CreatedBy = createdBy;
        this.ModifiedBy = modifiedBy;
        this.CreatedDate = createdDate;
        this.ModifiedDate = modifiedDate;
    }
}

module.exports = Parties;