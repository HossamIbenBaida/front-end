import { Entity } from "@/interfaces/entity";
export class OrderItem implements Entity {
 id:number;
 title:string;
 price:number;
 quantity:number;

constructor(id:number=0,title:string='',price:number=0,quantity:number=0){
    this.id = id ;
    this.title = title;
    this.price = price;
    this.quantity=quantity;
}


    
}