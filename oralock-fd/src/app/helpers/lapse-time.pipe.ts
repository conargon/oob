import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'lapse'})
export class LapseTimePipe implements PipeTransform {

  constructor (private translate: TranslateService) {}

  transform(d: string): string {
    let d0: Date = new Date(d);
    let now: Date = new Date();
    let seconds = Math.floor((now.getTime() - d0.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    if(days > 0) {
        return this.translate.instant('lapse.days', {days: days, hours: hours, minutes: minutes});
    } else if(hours > 0) {
        return this.translate.instant('lapse.hours', {hours: hours, minutes: minutes});
    } else if(minutes > 0) {
        return this.translate.instant('lapse.minutes', {minutes: minutes});
    } else {
        return this.translate.instant('lapse.seconds', {seconds: seconds});
    }

    
  }
}