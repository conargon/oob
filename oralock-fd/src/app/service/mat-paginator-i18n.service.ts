import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorTranslator extends MatPaginatorIntl {

    override itemsPerPageLabel: string = '';
    override nextPageLabel: string = '';
    override previousPageLabel: string = '';
    override firstPageLabel: string = '';
    override lastPageLabel: string = '';

    constructor(private translateService: TranslateService) {
        super();
    }

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        this.getTranslations();
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize)
            + ' ' + this.translateService.instant('page.of') + ' ' + length;
    };

    private getTranslations() {
        this.itemsPerPageLabel = this.translateService.instant('page.items');
        this.nextPageLabel = this.translateService.instant('page.next');
        this.previousPageLabel = this.translateService.instant('page.previous');
        this.firstPageLabel = this.translateService.instant('page.first');
        this.lastPageLabel = this.translateService.instant('page.last');
    }
}