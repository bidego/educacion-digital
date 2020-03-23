import moment from "moment";

class Order {
    public id:string;
    public items:string;
    public totalAmount:string
    public date: string;
    constructor(id:string,items:string,totalAmount:string,date:string) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        /* No Android support
        return this.date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        */
       return moment(this.date).format('YYYY Do YYYY, hh:mm');
    }
}

export default Order;