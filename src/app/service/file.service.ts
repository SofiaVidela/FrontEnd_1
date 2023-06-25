import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes,list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url:string='';
  constructor(private storage: Storage) { }

  public uploadFile($event: any, name: string) {
    const file = $event.target.file[0];
    console.log(file);
    const fileRef = ref(this.storage, `files/` + name)
    uploadBytes(fileRef, file)
      .then(response => { this.getFiles() })
      .catch(error=> console.log(error))
  }
  getFiles(){
    const filesRef = ref (this.storage,'files')
    list(filesRef)
    .then(async response => {
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        console.log("La URL es:"+ this.url);
      }
    } )
    .catch(error => console.log(error))
  }
 
}