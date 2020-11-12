export class establecer_fecha{
    private fecha = new Date()
    private day = this.fecha.getDay()
    private mes = this.fecha.getMonth()
    private diaDelMes = this.fecha.getDate()
    public año = this.fecha.getFullYear()
    public solo_diames:Array<number> = [this.diaDelMes]

    //--------------------------------funciones----------------------------
  
  //******************************array de los 5 dias de la semana************************************* 
  Nombre_dia (): Array<string> {
    

    let Dias_semana: Array<string> = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB']
    let diasOrganizador: Array<string> = [Dias_semana[this.day]]
    let contador=0
    this.day++ 
    if (this.day >= 4) { //si el dia es miercoles o los siguientes de este, 
      for(var i=0; i<4; i++){
        if(this.day>6){
          diasOrganizador.push(Dias_semana[contador])
          contador++
        }else{
          diasOrganizador.push(Dias_semana[this.day])
        }
        this.day++
      }
    } else {
        for(var i=0; i<4; i++){
          console.log("hola");
          diasOrganizador.push(Dias_semana[this.day])
          this.day++
        }}

    return diasOrganizador;
  }
  
  
  //***********************array de los 5 meses correspondientes de la semana****************************** 
  Nombre_mes (): Array<string> {
    let meses: Array<string> = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    let mesesOrganizador: Array<string> = [meses[this.mes]]
    this.diaDelMes++

    if( (this.mes == 0||2||4||6||7||9||11) && (this.diaDelMes >= 29)){ //si tiene 31 dias el mes y el dia en que se encuentra es mayor o igual a 28 dias
      for(var i=0; i<4; i++){
        
        if(this.diaDelMes>31){
          mesesOrganizador.push(meses[this.mes+1])
        }else{
          mesesOrganizador.push(meses[this.mes])
        }
        this.diaDelMes++

      }
    } else if((this.mes != 0||2||4||6||7||9||11) && (this.diaDelMes >= 28)){
        for(var i=0; i<4; i++){
            
            if(this.diaDelMes>30){
              mesesOrganizador.push(meses[this.mes+1])
            }else{
              mesesOrganizador.push(meses[this.mes])
            }
            this.diaDelMes++

        }
    } else{
        for(var i=0; i<4; i++){
            mesesOrganizador.push(meses[this.mes])
            this.diaDelMes++
    }}
    return mesesOrganizador;
  }

  dia_mes():Array<string>{
    let dia: number = this.diaDelMes
    let meses: Array<string> = this.Nombre_mes()
    let textos: Array<string> = [dia + " de " + meses[0]]
    let texto:string
    
    for(let i=1; i<5; i++){

    if( ((this.mes == 0||2||4||6||7||9||11) && (dia == 32))||((this.mes != 0||2||4||6||7||9||11) && (dia == 30))){
        dia = 1
        texto= (dia + i) + " de " + meses[i+1]
        this.solo_diames.push(dia+i)
        textos.push(texto)
        
    }else{ 
        dia++
        texto= (dia) + " de " + meses[i]
        this.solo_diames.push(dia)
        textos.push(texto)}
        }    
    return textos;

}
  
}