import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona';
import { FileService } from 'src/app/service/file.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  Persona: persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService, public fileService: FileService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  cargarPersona() {
    this.personaService.detail(1).subscribe(data => { this.Persona = data })
  }
  uploadImage($event: any, id?:number) {
    const name = "perfil_"+id;
    this.fileService.uploadFile($event,name)
   
  }

  editar(): void {
    this.personaService.detail(1).subscribe(
      data => {
        this.Persona = data;
      }, err => {
        alert("No se pudo editar la informacion Personal");
      });
  }

  onUpdate(): void {
  this.Persona.img = this.fileService.url;
    this.personaService.update(this.Persona.id, this.Persona).subscribe(
      data => {
        this.cargarPersona();
        alert("Informacion personal editada");
      },
      err => {
        alert("No se pudo editar la informacion Personal");
      }
    );
  }
}
