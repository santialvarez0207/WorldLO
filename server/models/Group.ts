import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const GroupSchema =new Schema({
imgUrl:String,
Name:String,
Description:String,
usserid:String,
ussename:String,
config:[String],

Users:[{
idUser:String,
Name:String,
Admin:String
}],

Public:[{
    idUser:String,
    Name:String,
    cont:String,
    imagen:String,
    lDate:String
}]

});

export interface IGroup extends Document{
imgUrl:string;
Name:string;
Description:string;
usserid:string;
ussename:string;
config:[string];

Users:[{
idUser:string;
Name:string;
Admin:string;
}];

Public:[{
    idUser:string;
    Name:string;
    cont:string;
    imagen:string;
    lDate:string;
}]

}

export default model<IGroup>('Groups',GroupSchema)//envia la estructura a mongo

