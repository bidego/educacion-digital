class Cart {
    public quantity:any;
    public title:any;
    public price:any;
    public sum:any;
    constructor(quantity:any, title:any, price:any, sum:any) {
        this.quantity = quantity;
        this.title = title;
        this.price = price;
        this.sum = sum;
    }
}

export default Cart;