import { HotToastService } from '@ngneat/hot-toast';
import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { doc, updateDoc, Firestore } from '@angular/fire/firestore';
import { Request } from '../../models/request.model';


@Component({
  selector: 'upload-imager',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})

export class UploadImagesComponent implements OnInit {

  @ViewChild('uploadControl') uploadControl: ElementRef;
  @Input() editAttached: string[];
  uploadFileName = 'Choose File';
  myImage: any;
  tableArray = [];
  @Input() request: Request;
  urlForDownload: string;
  requestId: string;

  constructor(private firestore: Firestore,
              private toast: HotToastService) { }

  ngOnInit(): void {
    console.log(this.request.downloadUrl);
    if(this.editAttached) {
      this.tableArray = this.editAttached;
    }

}

  onFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.myImage =  e.target.files[0];
      this.uploadFileName = '';
      Array.from(e.target.files).forEach((file: File) => {
        this.uploadFileName += file.name + ',';
      });
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = res => {
          const ratio = img.width / img.height;
          const elem = document.createElement('canvas');
          elem.width = 400;
          elem.height = 400 / ratio;
          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, 400, 400 / ratio);
          const data = ctx.canvas.toDataURL();
        };
      };
      fileReader.readAsDataURL(e.target.files[0]);

      this.uploadControl.nativeElement.value = "";
    } else {
      this.uploadFileName = 'Choose File';
    }
  }

  reset() {
    this.tableArray = [];
    this.uploadFileName = 'Choose File';
  }

 submitImg() {
  const storage = getStorage();
  const storageRef = ref(storage, 'images/' + this.request.id + '.jpeg');
  // 'file' comes from the Blob or File API
  const uploadTask = uploadBytesResumable(storageRef, this.myImage);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the
      // total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      this.toast.error("Error Uploading!");
    },
    () => {
      this.toast.success('Image successfully uploaded!');
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.urlForDownload = downloadURL;
        this.storeUrl();
      });
    }
  );
  this.reset();
  }

  async storeUrl() {
    const docRef = doc(this.firestore, "requests", this.request.id);
    await updateDoc(docRef, {
      downloadUrl: this.urlForDownload
    });
  }
}
