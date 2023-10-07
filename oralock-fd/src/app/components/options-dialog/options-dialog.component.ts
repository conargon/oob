import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ObjectType, OptionsApp, Schema, Op } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { DefaultLangService } from 'src/app/service/default-lang.service';
import { ObjectTypeService } from 'src/app/service/object-type.service';
import { OpService } from 'src/app/service/op.service';
import { OptionsService } from 'src/app/service/options.service';
import { SchemaService } from 'src/app/service/schema.service';
import { TranslationDbService } from 'src/app/service/translationdb.service';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {

  schemas!: Schema[];
  selectedShemas!: Schema[];
  types!: ObjectType[];
  selectedTypes!: ObjectType[];
  ops!: Op[];
  selectedOps!: Op[];
  defaultLang!: string;
  selectedLang!: string[];

  constructor (    
    private schemaService: SchemaService,
    private objectTypeService: ObjectTypeService,
    private optionService: OptionsService,
    private opService: OpService,
    private translate: TranslateService,
    private translationDbService: TranslationDbService,
    private defaultLangService: DefaultLangService,
    private _snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService,
    private mdDialogRef: MatDialogRef<OptionsDialogComponent>) { 
      mdDialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.schemaService.list().subscribe((list) => {
      this.schemas = list;
      this.selectedShemas = this.schemas.filter(s => s.isRegistered);
    });
    this.objectTypeService.list().subscribe((list) => {
      this.types = list;
      this.selectedTypes = this.types.filter(x => x.active);
    });
    this.opService.list().subscribe((list) => {
      this.ops = list;
      this.selectedOps = this.ops.filter(x => x.log);
    });    
    this.defaultLang = this.translate.defaultLang;
    this.selectedLang=[];
    this.selectedLang.push(this.defaultLang);
  }

  save() {
    let optionsData: OptionsApp = {
      schemas: this.selectedShemas.map(s => s.username), 
      types: this.selectedTypes.map(t => t.id),
      ops: this.selectedOps.map(t => t.id),
      options: [{
        id: 'default.lang',
        value: this.selectedLang[0],
      }]
    }
    this.optionService.save(optionsData).subscribe({
      next: () => {        
        this.defaultLangService.load();
        this.objectTypeService.loadStore();    
        this.schemaService.loadStore();    
        this._snackBar.open(this.translate.instant('options.save.ok'), "Info");
        this.close();
      },
      error: (e) => {
        console.error(e);
        this.confirmDialogService.showError(this.translate.instant('options.save.error', {error:e.error}));      
      }      
    });
  }

  cancel() {
    this.close();
  }

  close() {
    this.mdDialogRef.close();
  }

  changeSchemaList(event: MatCheckboxChange) {
    if(event.checked) {
      this.selectedShemas = this.schemas;
    } else {
      this.selectedShemas = this.selectedShemas.filter(s => s.countLocks > 0);
    }
  }

  changeTypesList(event: MatCheckboxChange) {
    if(event.checked) {
      this.selectedTypes = this.types;
    } else {
      this.selectedTypes = this.types.filter(t => t.countLocks > 0);
    }
  }

  changeOpsList(event: MatCheckboxChange) {
    if(event.checked) {
      this.selectedOps = this.ops;
    } else {
      this.selectedOps = [];
    }
  }

  schemasSelectedList(): string {
    return this.selectedShemas.map(x => x.username).join(', ')
  }

  typesSelectedList(): string {
    return this.selectedTypes.map(x => this.translationDbService.getTranslationPlural(x.label) ).join(', ')
  }

  opsSelectedList(): string {
    return this.selectedOps.map(x => this.translationDbService.getTranslation(x.name) ).join(', ')
  }

}
