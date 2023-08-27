import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  constructor() { }
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    this.autofitColumns(json, worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private autofitColumns(json: any[], worksheet: XLSX.WorkSheet) {

    const jsonKeys = Object.keys(json[0]);

    let objectMaxLength: number[] = []; 
    for (let i = 0; i < json.length; i++) {
      let value = json[i];
      for (let j = 0; j < jsonKeys.length; j++) {
        if (typeof value[jsonKeys[j]] == "number") {
          objectMaxLength[j] = 10;
        } else {

          const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

          objectMaxLength[j] =
            objectMaxLength[j] >= l
              ? objectMaxLength[j]
              : l;
        }
      }

      let key = jsonKeys;
      for (let j = 0; j < key.length; j++) {
        objectMaxLength[j] =
          objectMaxLength[j] >= key[j].length
            ? objectMaxLength[j]
            : key[j].length;
      }
    }

    const wscols = objectMaxLength.map(w => { return { width: w} });

    worksheet["!cols"] = wscols;

  }  
}