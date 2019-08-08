import { Environment } from './../../stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { status, Genders, religions, nationalityArray, IDtype } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { IPerson, IVictim } from 'src/app/interfaces/person';
import { Person } from 'src/app/stores/person.store';
import { ConvertService } from 'src/app/services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { DeleteComponent } from '../delete/delete.component';
import { Observable } from 'rxjs';
import { MappingService } from 'src/app/services/mapping.service';
import { Geo } from 'src/app/stores/geo.store';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  @ViewChild('stepper') stepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  first_name: AbstractControl;
  last_name: AbstractControl;
  nick_name: AbstractControl;
  phone: AbstractControl;
  unique_id: AbstractControl;
  religion: AbstractControl;
  gender: AbstractControl;
  dob: AbstractControl;
  address: AbstractControl;
  file: AbstractControl;
  nationality: AbstractControl;
  education: AbstractControl;
  country: AbstractControl;
  province: AbstractControl;
  filteredStatesProvince: Observable<any[]>;
  filteredStatesVillage: Observable<any[]>;
  filteredStatesDistrict: Observable<any[]>;
  filteredStatesCommune: Observable<any[]>;
  district: AbstractControl;
  village: AbstractControl;
  commune: AbstractControl;
  id_passport: AbstractControl;
  id_expire: AbstractControl;
  height: AbstractControl;
  weight: AbstractControl;
  color: AbstractControl;
  hair: AbstractControl;
  nose: AbstractControl;
  eyebrow: AbstractControl;
  ear: AbstractControl;
  eye: AbstractControl;
  face: AbstractControl;
  chin: AbstractControl;
  mouth: AbstractControl;
  mark: AbstractControl;

  father_last_name: AbstractControl;
father_first_name: AbstractControl;
father_nick_name: AbstractControl;

mother_last_name: AbstractControl;
mother_first_name: AbstractControl;
mother_nick_name: AbstractControl;

process = false;

selectedFiles: any;

genderList = Genders;
religionList = religions;
countryList = nationalityArray;
idList = IDtype;

  constructor(
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Person,
    private ds: DataService,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    public geo: Geo,

  ) { }

  buildForm(): void {
    this.firstFormGroup = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      nick_name: [null],
      phone: [null, [Validators.required]],
      religion: [this.religionList[0], [Validators.required]],
      address: [null,],
      education: [null],
      gender: [this.genderList[0], [Validators.required]],
      nationality: [this.countryList[0], [Validators.required]],
      dob: [ConvertService.age18(), [Validators.required]],
      file: [null,]
    });

    this.first_name = this.firstFormGroup.controls['first_name'];
    this.last_name = this.firstFormGroup.controls['last_name'];
    this.nick_name = this.firstFormGroup.controls['nick_name'];
    this.phone = this.firstFormGroup.controls['phone'];
    this.education = this.firstFormGroup.controls['education'];
    this.religion = this.firstFormGroup.controls['religion'];
    this.gender = this.firstFormGroup.controls['gender'];
    this.nationality = this.firstFormGroup.controls['nationality'];
    this.dob = this.firstFormGroup.controls['dob'];
    this.address = this.firstFormGroup.controls['address'];
    this.file = this.firstFormGroup.controls["file"];
  
    this.secondFormGroup = this.fb.group({
      id_expire: [null, [Validators.required]],
      unique_id: [null, [Validators.required]],
      id_passport: [this.idList[0],[Validators.required]],

      province: [null, Validators.compose([null, MappingService.validSelected.bind(this)])],
      district: [null, Validators.compose([null, MappingService.validSelected.bind(this)])],
      commune: [null, Validators.compose([null, MappingService.validSelected.bind(this)])],
      village: [null, Validators.compose([null, MappingService.validSelected.bind(this)])],
      country: [this.countryList[0], [Validators.required]],
    });
    this.unique_id = this.secondFormGroup.controls['unique_id'];
    this.id_passport = this.secondFormGroup.controls['id_passport'];
    this.id_expire = this.secondFormGroup.controls['id_expire'];
    this.country = this.secondFormGroup.controls['country'];
    this.province = this.secondFormGroup.controls['province'];
    this.district = this.secondFormGroup.controls['district'];
    this.commune = this.secondFormGroup.controls['commune'];
    this.village = this.secondFormGroup.controls['village'];


    this.thirdFormGroup = this.fb.group({
      height: [null],
      weight: [null],
      color: [null],
      hair: [null],
      nose: [null],
      eyebrow: [null],
      ear: [null],
      eye: [null],
      face: [null],
      chin: [null],
      mouth: [null],
      mark: [null],
    })
    this.height = this.thirdFormGroup.controls['height'];
    this.weight = this.thirdFormGroup.controls['weight'];
    this.color = this.thirdFormGroup.controls['color'];
    this.hair = this.thirdFormGroup.controls['hair'];
    this.nose = this.thirdFormGroup.controls['nose'];
    this.eyebrow = this.thirdFormGroup.controls['eyebrow'];
    this.ear = this.thirdFormGroup.controls['ear'];
    this.eye = this.thirdFormGroup.controls['eye'];
    this.face = this.thirdFormGroup.controls['face'];
    this.chin = this.thirdFormGroup.controls['chin'];
    this.mouth = this.thirdFormGroup.controls['mouth'];
    this.mark = this.thirdFormGroup.controls['mark'];
    
    this.forthFormGroup = this.fb.group({
      father_last_name: [null],
      father_first_name: [null],
      father_nick_name: [null],
      mother_last_name: [null],
      mother_first_name: [null],
      mother_nick_name: [null],
    })
    this.father_last_name = this.forthFormGroup.controls['father_last_name'];
    this.father_first_name = this.forthFormGroup.controls['father_first_name'];
    this.father_nick_name = this.forthFormGroup.controls['father_nick_name'];
    this.mother_last_name = this.forthFormGroup.controls['mother_last_name'];
    this.mother_first_name = this.forthFormGroup.controls['mother_first_name'];
    this.mother_nick_name = this.forthFormGroup.controls['mother_nick_name'];
  }

  ngOnInit() {
    this.buildForm();
    this.store.fetchImages(this.data.key);

    this.geo.fetchProvinceToArray((list) => {
      this.filteredStatesProvince = MappingService.autoComplete(this.province, list, "name");
    });
    let { first_name, last_name,nick_name,religion,education,nationality,id_expire,id_passport,province,district,commune,village,country,height,weight,color,hair,nose,eye,eyebrow,ear,face,chin,mouth,mark,father_first_name,father_last_name,father_nick_name,mother_first_name,mother_last_name,mother_nick_name,phone, unique_id, gender, dob, address } = this.data;
    this.firstFormGroup.patchValue({
      first_name: first_name,
      last_name: last_name,
      nick_name: nick_name,
      religion: religion,
      nationality: nationality,
      phone: phone,
      unique_id: unique_id,
      gender: gender,
      education:education,
      address: ConvertService.toNull(address),
      dob: dob.toDate(),
    })

    this.secondFormGroup.patchValue({
      id_expire: id_expire.toDate(),
      unique_id: unique_id,
      id_passport:id_passport,
      province: province,
      district: district,
      commune: commune,
      village: village,
      country: country,
    })

    this.thirdFormGroup.patchValue({
      height: height,
      weight: weight,
      color:color,
      hair: hair,
      nose: nose,
      eyebrow: eyebrow,
      ear: ear,
      eye: eye,
      face: face,
      chin: chin,
      mouth: mouth,
      mark: mark,
    })
    this.forthFormGroup.patchValue({
      father_last_name: father_last_name,
      father_first_name: father_first_name,
      father_nick_name:father_nick_name,
      mother_last_name: mother_last_name,
      mother_first_name: mother_first_name,
      mother_nick_name: mother_nick_name,
    })

  }


  displayItem(item: any): string {
    return item ? item.name : item;
  }

  onSelectedFile(files) {
    this.selectedFiles = files;
  }

  _onSelectedProvince(event) {
    const { value } = event.option;
    if (value) {
      this.district.enable();
      this.geo.fetchDistrictsToArray(value.key, list => {
        this.filteredStatesDistrict = MappingService.autoComplete(
          this.district,
          list,
          "name"
        );
      });
    } else {
      this.district.disable();
    }
  }

  _onSelectedDistrict(event) {
    const { value } = event.option;
    if (value) {
      this.commune.enable();
      this.geo.fetchCommunesToArray(value.key, list => {
        this.filteredStatesCommune = MappingService.autoComplete(
          this.commune,
          list,
          "name"
        );
      });
    } else {
      this.commune.disable();
    }
  }
  _onSelectedVillage(event) {
    const { value } = event.option;
    if (value) {
      this.village.enable();
      this.geo.fetchVillagesToArray(value.key, list => {
        this.filteredStatesVillage = MappingService.autoComplete(
          this.village,
          list,
          "name"
        );
      });
    } else {
      this.village.disable();
    }
  }


  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  deleteFile(image) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបរូបភាព', memo: 'ដំណើរការនេះនឹងលុបរូបភាពចេញពីប្រព័ន្ធ' },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        const path = `persons/${this.data.key}/${image.name}`;
        this.ds.personRef().doc(this.data.key).collection('files').doc(image.key).delete().then(() => {
          this.storage.ref(path).delete();
          this.snackBar.open(
            "លុបរូបភាព", "ជោគជ័យ",
            { duration: 2000 }
          );
        })
      }
    });
  }

  create() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.forthFormGroup.valid) {
      // let { first_name, last_name, unique_id, phone, dob, gender, address } = f;
      // let { first_name, last_name,nick_name,religion,education,nationality,id_expire,id_passport,province,district,commune,village,country,height,weight,color,hair,nose,eye,eyebrow,ear,face,chin,mouth,mark,father_first_name,father_last_name,father_nick_name,mother_first_name,mother_last_name,mother_nick_name,phone, unique_id, gender, dob, address } = f;
      const formData: IVictim = {
        key: this.data.key,
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        full_name: this.last_name.value + " " + this.first_name.value,
        unique_id: this.unique_id.value,
        nick_name: this.nick_name.value,
        phone: this.phone.value,
        dob: this.dob.value,
        gender: this.gender.value,
        address: this.address.value,
        update_date: new Date(),
        update_by: this.env.user,
        religion: this.religion.value,
        education: this.education.value,
        nationality:this.nationality.value,
        id_expire: this.id_expire.value,
        id_passport:this.id_passport.value,
        country:this.country.value,
        province: this.province.value,
        district:this.district.value,
        commune: this.commune.value,
        village:  this.village.value,
        height: this.height.value,
        weight: this.weight.value,
        color:  this.color.value,
        hair: this.hair.value,
        nose: this.nose.value,
        eyebrow:  this.eyebrow.value,
        ear: this.ear.value,
        eye: this.eye.value,
        face:  this.face.value,
        chin: this.chin.value,
        mark: this.mark.value,
        mouth: this.mouth.value,
        father_last_name: this.father_last_name.value,
        father_first_name: this.father_first_name.value,
        father_nick_name: this.father_nick_name.value,
        father_full_name: this.father_last_name.value + " " + this.father_first_name.value,
        mother_last_name: this.mother_last_name.value,
        mother_first_name: this.mother_first_name.value,
        mother_nick_name: this.mother_nick_name.value,
        mother_full_name: this.mother_last_name.value + " " + this.mother_first_name.value,

      }

      this.store.update(formData, this.selectedFiles, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('កែប្រែទិន្នន័យបានបញ្ចប់', 'ជោគជ័យ', { duration: 5000 });
          this.stepper.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
