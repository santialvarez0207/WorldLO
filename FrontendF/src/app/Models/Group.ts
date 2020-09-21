export interface Group {
    _id:string;
    imgUrl:string;
    Name:string;
    Description:string;
    usserid:string;
    ussename:string;
    config:Array<string>;
    
    Users:Array<{
    idUser:string;
    Name:string;
    Admin:string;
    }>;
    
    Public:Array<{
        idUser:string;
        Name:string;
        cont:string;
        imagen:string;
        lDate:string;
    }>;
}
