import { Component } from '@angular/core';
// Get table data
import { DataService } from '../../services/services.service';
// PrimeNG
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'register-tenant-component',
  templateUrl: './register-tenant.component.html',
  styleUrls: [
    './register-tenant.component.css',
    '../../css/neumorphism.component.css',
  ],
})
export class RegisterTenant {
  public tenantForm!: FormGroup;
  public hide: boolean = true;

  public capsStatus: any;
  public items: number[] = [1];
  public uploadedImg: any[] = [];
  public blobURLImg: any;

  constructor(
    private DataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.tenantForm = new FormGroup({
      tenantLogo: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      tenantName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      adminUsername: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      adminPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        //Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]),
      phoneNumber0: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

//   capStatus(e: KeyboardEvent) {
//     let value = this.tenantForm.touched;
//     if (value && e.getModifierState('CapsLock')) {
//       this.capsStatus = 'Caps lock is ON.';
//     } else {
//       this.capsStatus = 'Caps lock is OFF.';
//     }
//   }

  clonePhoneField() {
    let id = this.items.length;
    this.tenantForm.addControl(
      'phoneNumber' + id,
      new FormControl('', [Validators.required, Validators.minLength(1)])
    );

    this.items.push(id);
  }

  removeClonedPhoneField() {
    let id = this.items.length - 1;

    if (id > 0) {
      this.tenantForm.removeControl('phoneNumber' + id);
      this.items.pop();
    }
  }

  uploadImgLogo(event: any, uploadFile: any) {
    this.uploadedImg = event.files;
    let imgObj = document.createElement('img');
    const blob = new Blob([event.files[0]], { type: 'image/jpeg' });
    const blobURL = URL.createObjectURL(blob);
    imgObj.style.width = '7.2rem';
    imgObj.style.height = '7.2rem';
    imgObj.style.borderRadius = '8rem';
    imgObj.style.marginLeft = '33%';
    imgObj.style.position = 'absolute';
    imgObj.style.top = '1rem';
    imgObj.src = blobURL;
    this.blobURLImg = imgObj;
    document.getElementById('blobImg')?.append(imgObj);

    this.tenantForm.patchValue({
      tenantLogo: this.uploadedImg,
    });

    uploadFile.clear();

    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Image added successfully.',
    });
  }

  saveNewTenant() {
    console.log('save new tenant');
    console.log(this.tenantForm.value);
    this.DataService.createNewTenant(this.tenantForm.value.adminUsername, this.tenantForm.value.adminPassword, this.tenantForm.value.tenantName);
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Tenant created successfully.',
    });
  }
}