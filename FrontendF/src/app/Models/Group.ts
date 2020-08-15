export interface Group {
    _id:string;
    imgUrl:string;
    Name:string;
    Description:string;
    usserid:string;
    ussename:string;
    Admins:Array<string>;
    Users:Array<string>;
    publicgroup:Array<string>;
}
