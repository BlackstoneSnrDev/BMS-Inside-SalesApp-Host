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
  public hide: boolean = false;
  public coach: any;

  public capsStatus: any;
  public items: number[] = [1];
  public uploadedImg: any[] = [];
  public blobURLImg: any;
  public phoneList: any[] = [0];

  constructor(
    private DataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.tenantForm = new FormGroup({
      tenantLogo: new FormControl('defaultVortexLogo', [
        Validators.required,
        Validators.minLength(1),
      ]),
      tenantCoach: new FormControl('', [
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
      ]),
      adminEmail: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      adminPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phoneNumber0: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ]),
    });

    this.DataService.getMyTDData().subscribe(
      (response) => {
        this.coach = response.selectCoach;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clonePhoneField() {
    let id = this.items.length;
    let valLast = id - 1;

    if (this.tenantForm.get('phoneNumber' + valLast)?.value) {
      this.items.push(id);
      this.tenantForm.addControl(
        'phoneNumber' + id,
        new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('[1-9]{1}[0-9]{9}'),
        ])
      );

      this.phoneList.push(this.tenantForm.get('phoneNumber' + valLast)?.value);
      console.log(this.tenantForm);
      this.hide = false;
    } else {
      this.hide = true;
      setTimeout(() => {
        this.hide = false;
      }, 5000);
    }
  }

  removeClonedPhoneField(indexSection: any) {
    let id = this.items.length - 1;

    if (id > 0) {
      this.tenantForm.removeControl('phoneNumber' + id);
      this.items.splice(indexSection, 1);
      this.phoneList.splice(indexSection, 1);
    }
  }

  phoneEdited(indexSection: any) {
    let val = this.tenantForm.get('phoneNumber' + indexSection)?.value;
    if (this.phoneList[indexSection]) {
      this.phoneList[indexSection] = val;
      console.log(this.tenantForm);
    } else {
      this.phoneList[indexSection] = val;
      console.log(this.tenantForm);
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
    console.log(this.tenantForm.value);
    console.log(this.phoneList);
    this.DataService.createNewTenant(this.tenantForm.value.adminUsername, this.tenantForm.value.adminPassword, this.tenantForm.value.tenantName);
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Tenant was created successfully.',
    });
    this.tenantForm.reset()
    this.tenantForm.patchValue({
      tenantLogo: 'defaultVortexLogo'
    })
  }
}
