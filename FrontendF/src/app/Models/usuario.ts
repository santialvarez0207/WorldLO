export class Usuario { //los modelos estilo mongodb en el frontend para tener la estructura

    _id: string;
    name: string;
    password: string;
    mail: string;
    tipeuser:string;
    like1:number;
    like2:number;
    like3:number;

    
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


    
}
