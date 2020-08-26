import { Schema,model,Document }from 'mongoose';

const usuarioSchema =new Schema({
name:String,
password:String,
mail:String,
tipeuser:String,
like1:String,
like2:String,
like3:String,

Group:[{
name:String,
id:String,
}],

Like:[{
name:String,
id:String,
}],

Chat:[{
idFriend:String,
NameFriend:String,
mensaje:[String],
orden:[String],
}],

config:[String],
}); // esta es la estructura que se envia a mongod

export interface Iusuario extends Document{
    name:string;
    password:string;
    mail:string;
    tipeuser:string;
    like1:string;
    like2:string;
    like3:string;

    Group:[{
      name:string;
      id:string;
      }];
      
      Like:[{
      name:string;
      id:string;
      }];
      
      Chat:[{
      idFriend:string;
      NameFriend:string;
      mensaje:[string];
      orden:[string];
      }];
      
      config:[string];

} //estructura con la que se trabaja en el procesado de backend
export default model<Iusuario>('Usuario',usuarioSchema)//envia la estructura a mongo