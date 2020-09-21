import { Component, OnInit } from '@angular/core';
import { ExamService } from "../../services/exam.service";
import { GroupService } from "../../services/Group.service";
import {ImagenesService} from "../../services/Imagenes.service";
import {PageService} from "../../services/Page.service";
import {PublicGService} from "../../services/PublicG.service";
import {QuestionService} from "../../services/question.service";
import {UsuarioService} from "../../services/usuario.service";
import {DebateService} from "../../services/debate.service";

//------------------------------------------

import { Exam } from "../../Models/exam";
import { Group } from "../../Models/Group";
import {Imagenes} from "../../Models/Imagenes";
import {Page} from "../../Models/Page";
import {PublicG} from "../../Models/PublicG";
import {Question} from "../../Models/question";
import {Usuario} from "../../Models/usuario";
import {Debate} from "../../Models/Debate";
@Component({
  selector: 'app-death-star',
  templateUrl: './death-star.component.html',
  styleUrls: ['./death-star.component.css']
})
export class DeathStarComponent implements OnInit {

  constructor(public ExamService:ExamService,public GroupService:GroupService,public ImagenesService:ImagenesService,
    public PageService:PageService,public PublicGService:PublicGService,public QuestionService:QuestionService,
    public UsuarioService:UsuarioService, public DebateService:DebateService) { }

  ngOnInit(): void {
    this.ExamService.getExams().subscribe(res=>{
      var y = res as Exam[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.ExamService.deleteExam(y[i]._id).subscribe(res=>{})
      }
    })

    this.GroupService.getGroups().subscribe(res=>{
      var y = res as Group[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.GroupService.deleteGroup(y[i]._id).subscribe(res=>{})
      }
    })

    this.ImagenesService.getImageness().subscribe(res=>{
      var y = res as Imagenes[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.ImagenesService.deleteImagenes(y[i]._id).subscribe(res=>{})
      }
    })

    this.PageService.getPaginas().subscribe(res=>{
      var y = res as Page[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.PageService.deletePagina(y[i]._id).subscribe(res=>{})
      }
    })

    this.PublicGService.getPublicGs().subscribe(res=>{
      var y = res as PublicG[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.PublicGService.deletePublicG(y[i]._id).subscribe(res=>{})
      }
    })


    this.QuestionService.getQuestions().subscribe(res=>{
      var y = res as Question[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.QuestionService.deleteQuestion(y[i]._id).subscribe(res=>{})
      }
    })


    this.UsuarioService.getusuarios().subscribe(res=>{
      var y = res as Usuario[];
      var x = res.length;
      for (var i=2;i<=x-1;i++){
        this.UsuarioService.deleteusuarios(y[i]._id).subscribe(res=>{})
      }
    })

    this.DebateService.getDebates().subscribe(res=>{
      var y = res as Debate[];
      var x = res.length;
      for (var i=0;i<=x-1;i++){
        this.DebateService.deleteDebate(y[i]._id).subscribe(res=>{})
      }
    })



  }

}
