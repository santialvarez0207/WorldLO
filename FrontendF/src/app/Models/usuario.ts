export class Usuario { //los modelos estilo mongodb en el frontend para tener la estructura
_id:string;
  name:string;
  password:string;
  mail:string;
  tipeuser:string;
  like1:string;
  like2:string;
  like3:string;
  solis:Array<string>;

  Group:Array<{
    name:string;
    id:string;
    }>;
    
    Like:Array<{
    name:string;
    id:string;
    }>;
    
    Chat:Array<{
    ultimo:string;
    idFriend:string;
    NameFriend:string;
    mensaje:Array<string>;
    orden:Array<string>;
    }>;
    
    config:Array<string>;


    
}
