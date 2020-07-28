import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const GroupSchema =new Schema({
imgUrl:String,
Name:String,
Description:String,
usserid:String,
ussename:String,
Admins:[String],
Users:[String],
publicgroup: [String]

});

export interface IGroup extends Document{
imgUrl:string;
Name:string;
Description:string;
usserid:string;
ussename:string;
Admins:[string];
Users:[string];
publicgroup:[string];
}

export default model<IGroup>('Groups',GroupSchema)//envia la estructura a mongo

