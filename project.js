class GiftManager {
    constructor() {
        this.packages = [];
    }

    // Method to validate input fields
    validateInput(sender, recipient, packageId, address, weight) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const numericRegex = /^[0-9]+$/;
        const addressRegex = /^[a-zA-Z\s,]+$/;

        if (!sender.match(nameRegex)) throw new Error("Invalid Sender Name. Alphabetic characters only.");
        if (!recipient.match(nameRegex)) throw new Error("Invalid Recipient Name. Alphabetic characters only.");
        if (!packageId.match(numericRegex)) throw new Error("Invalid Package ID. Numeric values only.");
        if (!address.match(addressRegex)) throw new Error("Invalid Delivery Address.");
        if (isNaN(weight) || weight <= 0) throw new Error("Invalid Weight. Must be a positive number.");
    }

    // Method to generate tracking code
    generateTrackingCode(packageId, weight, sender, recipient) {
        const nameLengths = sender.length + recipient.length;
        const result = (parseInt(packageId) + parseFloat(weight)) * Math.pow(nameLengths, 2);
        return Math.sqrt(result).toFixed(2);
    }

    // Method to add a package
    addPackage(sender, recipient, packageId, address, weight) {
        try {
            this.validateInput(sender, recipient, packageId, address, weight);
            const trackingCode = this.generateTrackingCode(packageId, weight, sender, recipient);
            this.packages.push({ sender, recipient, packageId, address, weight, trackingCode });
            console.log(`Package added! Tracking Code: ${trackingCode}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    // Method to sort packages by weight
    sortPackagesByWeight() {
        this.packages.sort((a, b) => a.weight - b.weight);
    }

    // Display all packages
    displayPackages() {
        console.table(this.packages);
    }
}

// Example usage
const manager = new GiftManager();
manager.addPackage("Santa Claus", "John Doe", "12345", "123 Candy Cane Lane", 5);
manager.addPackage("Mrs. Claus", "Jane Doe", "67890", "456 Snowflake Drive", 2);
manager.sortPackagesByWeight();
manager.displayPackages();
