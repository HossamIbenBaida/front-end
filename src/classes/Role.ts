import { Entity } from "@/interfaces/entity";
import { Permission } from "./permission";

export class Role implements Entity{
    id : number;
    name: string;
    permissions : Permission[];
 
    constructor (id = 0, name = '', permissions: Permission[] = []){

        this.id = id;
        this.name = name;
        this.permissions=permissions;
    }

}