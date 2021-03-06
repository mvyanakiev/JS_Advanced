class PaymentProcessor{
    constructor(options){
        this.types = options
        this.precision = options
        this.payments = []
    }

    set precision(p){
        let dtos;
        if(Object.is(p, undefined)){
            dtos = 2;
            this._precision = dtos

        }else{
            if(p.hasOwnProperty('precision')){
                this._precision = p.precision
            }else{
                dtos = 2;
                this._precision = dtos
            }
        }
    }

    get precision(){
        return this._precision
    }

    set types(t){
        let dto
        if(Object.is(t, undefined)){  //typeof()   //t.types === undefined
            dto = ["service", "product", "other"]
            this._types = dto
        }else{
            if(t.hasOwnProperty('types')){

                this._types = t.types
            }else{
                dto = ["service", "product", "other"]
                this._types = dto
            }
        }
    }

    get types(){
        return this._types
    }

    registerPayment(id, name, type, value){
        if(id === '' || id === null){
            throw new Error("Invalid ID")
        }
        if(name === '' || name === null){
            throw new Error("Invalid Name")
        }
        if(isNaN(value)){
            throw new Error("Invalid value")
        }
        if(type === '' || type === null){
            throw new Error("Invalid TypE")
        }
        if(Array.isArray(this.types)){
            if(!this.types.includes(type)){
                throw new Error('Invalid type')
            }
        } else if(this.types[0] !== type){
            throw new Error('Invalid type')
        }

        let counter = 0
        for(let i = this.payments.length - 1; i >= 0; i--){
            if(this.payments[i].id === id){
                counter++;
            }
        }
        if(counter !== 0){
            throw new Error("ID Already exists")
        }

        let payment = value.toFixed(this.precision)

        this.payments.push({id:id, name:name, type:type, value:payment})
    }

    deletePayment(id){
        if(!this.payments.filter(p => p.id === id)){
            throw new Error('ID not found')
        }
        let counter = 0;
        for(let i = this.payments.length - 1; i >= 0; i--){
            if(this.payments[i].id === id){
                this.payments.splice(i, 1);
                counter++;
            }
        }
        if(counter === 0){
            throw new Error("No entry with such ID")
        }
    }

    get(id){
        if(!this.payments.filter(p => p.id === id)){
            throw new Error('ID not found')
        }
        let name, value, result, type;
        for(let i = this.payments.length - 1; i >= 0; i--){
            if(this.payments[i].id === id){
                name = this.payments[i].name
                value = this.payments[i].value
                type = this.payments[i].type
            }
        }


        if(!value.toString().includes('.')){
            result = `Details about payment ID: ${id}` + '\n'
                + `- Name: ${name}` + '\n'
                + `- Type: ${type}` + '\n'
                + `- Value: ${value.toFixed(2)}`;
        }else {
            result = `Details about payment ID: ${id}` + '\n'
                + `- Name: ${name}` + '\n'
                + `- Type: ${type}` + '\n'
                + `- Value: ${value}`;
        }

        return result
    }

    setOptions(options){
        this.types = options
        this.precision = options
    }

    toString(){
        let balancePari = 0.00;
        let result = '';
        for (let i = 0; i < this.payments.length; i++) {
            balancePari += Number(this.payments[i].value)

        }
        if(!balancePari.toString().includes('.')){
            result = `Summary: ` + '\n' +
                `- Payments: ${this.payments.length}` + '\n' +
                `- Balance: ${balancePari.toFixed(2)}`
        }else{
            result = `Summary: ` + '\n' +
                `- Payments: ${this.payments.length}` + '\n' + `- Balance: ${balancePari}`
        }

        return result
    }
}



// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());
//
// Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
//
// generalPayments.setOptions({types: ['product', 'material']});
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
// console.log(generalPayments.get('E028'));
// generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);
//
// // Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// // Should throw an error (ID not found)
// generalPayments.get('E027');
//
// generalPayments.deletePayment('E028');
// console.log(generalPayments.toString());
//
//
//
// Initialize processor with custom types
// const servicePyaments = new PaymentProcessor({types: ['service']});
// servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
// servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
// console.log(servicePyaments.toString());
//
// Initialize processor with custom precision
// const transactionLog = new PaymentProcessor({precision: 5});
// transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
// console.log(transactionLog.toString());