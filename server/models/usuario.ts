import { Schema,model,Document }from 'mongoose';

const usuarioSchema =new Schema({
name:String,
password:String,
mail:String,
tipeuser:String,
like1:String,
like2:String,
like3:String,
NomLL:String,
LLreid:[String],
G:[String],
config:[String],
Lre:[{
    NomL:String,
    Lreid:[String]
  }],

  
msg:[{
    Ncontacto:String,
    idcontacto:String,
    ord:[String],
    dm:[String],
}]
}); // esta es la estructura que se envia a mongod

export interface Iusuario extends Document{
    name:string;
    password:string;
    mail:string;
    tipeuser:string;
    like1:string;
    like2:string;
    like3:string;

      NomLL:string;
      LLreid:[string];
      G:[string];
      config:[string];

      Lre:[{
        NomL:string;
        Lreid:[string];
      }];
      msg:[{
        Ncontacto:string;
        idcontacto:string;
        ord:[string];
        dm:[string];
    }];
} //estructura con la que se trabaja en el procesado de backend
export default model<Iusuario>('Usuario',usuarioSchema)//envia la estructura a mongo