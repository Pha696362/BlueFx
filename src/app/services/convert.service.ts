import { months } from './../dummy/report';
import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  static toDate(sqlDate:any){
    const date=moment(sqlDate);
    return date;
  }
  static toCalendar(date:any){
    return moment(date).days()
  }

  static fromPeriodToDate(dateString: string) {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }
  static toPeriodToDate(dateString: Date) {
    return moment(dateString).toDate();
  }

  static getDaySchedule(days) {
    var daysInput = Object.keys(days).map(function (key) {
      return { name: key, value: days[key] };
    });

    daysInput = daysInput.filter(m => m.value === true)
    daysInput.sort((a: any, b: any) => {
      var day1 = a.name
      var day2 = b.name
      if (daysOfWeek[day1] < daysOfWeek[day2]) {
        return -1;
      } else if (daysOfWeek[day1] > daysOfWeek[day2]) {
        return 1;
      } else {
        return 0;
      }
    });
    let result = '';
    daysInput.forEach(item => {
      if (item.name === 'monday')
        result = result + 'Monday / '
      else if (item.name.toLowerCase() === 'tuesday')
        result = result + 'Tuesday / '
      else if (item.name.toLowerCase() === 'friday')
        result = result + 'Friday / '
      else if (item.name.toLowerCase() === 'saturday')
        result = result + 'Saturday / '
      else if (item.name.toLowerCase() === 'sunday')
        result = result + 'Sunday / '
      else if (item.name.toLowerCase() === 'thursday')
        result = result + 'Thursday / '
      else
        result = result + 'Wednesday / '
    })
    if (result.length > 3)
      result = result.substring(0, result.length - 3)
    return result;
  }

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  }
  static toFloatFixed2(value) {
    if (value === null || value === "" || value === undefined) {
      return 0;
    }
    if (Number(value) === NaN) return 0;
    return Number(value.toFixed(2));
  }

  static toNumber(value) {
    if (value === null || value === "" || value === undefined) {
      return 0;
    }
    if (Number(value) === NaN) return 0;
    return Number(value);
  }
  static toNull(value) {
    if (value === null || value === "" || value === undefined) {
      return null;
    }
    return value;
  }
  static isNullUndefinedEmpty(value) {
    if (value === null || value === "" || value === undefined) {
      return true;
    }
    return false;
  }
  static toNullInputValue(input: AbstractControl) {
    if (input === undefined || undefined === null) return null;
    const value = input.value;
    if (value === null || value === "" || value === undefined) {
      return null;
    }
    return value;
  }

  static age18() {
    return moment().add(-18, 'year').toDate();
  }

  static yearSuffix() {
    return moment().format('YY').toString();
  }
  static addWeek(interval: number) {
    return moment().add(interval, 'week').toDate()
  }

  static addMonth(interval: number) {
    return moment().add(interval, 'month').toDate()
  }

  static generate_sample_invoiceNo(config) {
    const number = moment().format('YYMMDD').toString() + (config + 1).toString();
    return number;
  }

  static toMonthKey(date: Date) {
    const dateKey = moment(date).format('YYYYMM');
    return dateKey.toString();
  }

  static toYearKey(date: Date) {
    const dateKey = moment(date).format('YYYY');
    return dateKey.toString();
  }

  static yearKey() {
    return Number(moment().format('YYYY'))
  }

  static yearNumberKey(date: Date) {
    return Number(moment(date).format('YYYY'))
  }

  static monthNumberKey(date: Date) {
    return Number(moment(date).format('MM'))
  }

  static pageKey() {
    return Number(moment().format('YYYYMMDDHHmmss'))
  }

  static toDateKey(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
  }

  static toDateStringKey(date: Date) {
    return String(moment(date).format('YYYYMMDD'))
  }

  static dateKey() {
    return Number(moment().format('YYYYMMDD'))
  }

  static dateThreeOneKey(day, month, year) {
    const date = `${year}${month}${day}`;
    return this.toDateSting(moment(date).toDate());
  }

  static toDateSting(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  static dateLastMonth(month: number) {
    return moment(new Date()).subtract(month, 'months').startOf('month');
  }

  static getDefaultDateReport(day: number) {
    const yearMonth = moment(new Date).format('YYYYMM');
    const yearMonthDay = `${yearMonth}${day}`;
    const toDate = moment(yearMonthDay).toDate();
    return {
      form_date: this.toDateSting(moment(toDate).subtract(3, 'months').add(1, 'days')),
      to_date: this.toDateSting(toDate),
    };
  }

  static getDateOfMonth(day: number, months) {
    const yearMonth = moment(new Date).format('YYYYMM');
    const yearMonthDay = `${yearMonth}${day}`;
    const toDate = moment(yearMonthDay).toDate();
    return {
      form_date: this.toDateSting(moment(toDate).subtract(months, 'months').add(1, 'days')),
      to_date: this.toDateSting(toDate),
    };
  }

  static getDateOfYear(day: number) {
    const yearMonth = moment(new Date).format('YYYYMM');
    const year = moment(new Date).format('YYYY');
    const yearMonthDay = `${yearMonth}${day}`;
    const toDate = moment(yearMonthDay).toDate();
    return {
      form_date: this.toDateSting(moment(`${year}0101`, 'YYYYMMDD').toDate()),
      to_date: this.toDateSting(toDate),
    };
  }

  static hourToNumber(time) {
    return Number(moment(time, 'hh:mm a').format('HH').toString() + '.' + moment(time, 'hh:mm a').format('mm').toString());
  }

  static toHour(time) {
    return moment(time, 'hh:mm a').format('hh:mm a')
  }

  static generate_invoiceNo(config) {
    var number = moment().format('YYMMDD').toString() + (config.invoice_no + 1).toString();
    return Number(number);
  }

  static generate_testing_invoiceNo(config) {
    var number = moment().format('YYMMDD').toString() + (config.invoice_shufit + 1).toString();
    return number;
  }

  static generate_puc_id(config) {
    var number = moment().format('YY').toString() + (config.puc_id + 1).toString();
    return number;
  }

  static addDays(totalDay: number) {
    return moment().add(totalDay, 'days').toDate();
  }

  static addExpiredMonth(interval: number) {
    return moment().add(interval, 'months').toDate();
  }

  // static getDaySchedule(days) {
  //   var daysInput = Object.keys(days).map(function (key) {
  //     return { name: key, value: days[key] };
  //   });

  //   daysInput = daysInput.filter(m => m.value === true)
  //   daysInput.sort((a: any, b: any) => {
  //     var day1 = a.name
  //     var day2 = b.name
  //     if (daysOfWeek[day1] < daysOfWeek[day2]) {
  //       return -1;
  //     } else if (daysOfWeek[day1] > daysOfWeek[day2]) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   let result = '';
  //   daysInput.forEach(item => {
  //     if (item.name === 'monday')
  //       result = result + 'Monday / '
  //     else if (item.name.toLowerCase() === 'tuesday')
  //       result = result + 'Tuesday / '
  //     else if (item.name.toLowerCase() === 'friday')
  //       result = result + 'Friday / '
  //     else if (item.name.toLowerCase() === 'saturday')
  //       result = result + 'Saturday / '
  //     else if (item.name.toLowerCase() === 'sunday')
  //       result = result + 'Sunday / '
  //     else if (item.name.toLowerCase() === 'thursday')
  //       result = result + 'Thursday / '
  //     else
  //       result = result + 'Wednesday / '
  //   })
  //   if (result.length > 3)
  //     result = result.substring(0, result.length - 3)
  //   return result;
  // }


}

export const daysOfWeek = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7
}

export function toMonthKh(date: Date) {
  const index = moment(date).format("MM");
  return months[index].name
}


export function toDayOfMonth(date: Date) {
  const index = moment(date).format("DD");
  return index;
}


export function toMonthOfYear(date: Date) {
  const index = moment(date).format("MM");
  return index;
}

export function toYearOfPeriod(date: Date) {
  const index = moment(date).format("YYYY");
  return index;
}

export function sum(data: Array<any>, field: string) {
  if (!data) return 0;
  return data.reduce((a, b) => a + Number(b[field]), 0)
}

// export function getDateReport(optionKey, endDayOfMonth) {
//   const items = periodData.filter(m => m.key === optionKey)[0];
//   switch (items.key) {
//     case 1:
//       const day1 = ConvertService.getDefaultDateReport(endDayOfMonth).form_date
//       const day2 = ConvertService.getDefaultDateReport(endDayOfMonth).to_date
//       return {
//         fromDate: day1,
//         toDate: day2
//       }
//     case 2:
//       const day12 = ConvertService.getDateOfMonth(endDayOfMonth, 1).form_date
//       const day22 = ConvertService.getDateOfMonth(endDayOfMonth, 1).to_date
//       return {
//         fromDate: day12,
//         toDate: day22
//       }
//     case 3:
//       const day13 = ConvertService.getDateOfMonth(endDayOfMonth, 6).form_date
//       const day23 = ConvertService.getDateOfMonth(endDayOfMonth, 6).to_date
//       return {
//         fromDate: day13,
//         toDate: day23
//       }
//     case 4:
//       const day14 = ConvertService.getDateOfYear(endDayOfMonth).form_date
//       const day24 = ConvertService.getDateOfYear(endDayOfMonth).to_date
//       return {
//         fromDate: day14,
//         toDate: day24
//       }
//     default:
//       break;
//   }
// }


export function toClassDate(date:Date){
  return {
    day:moment(date).format("DD"),
    month:moment(date).format("MM"),
    year:moment(date).format("YYYY"),
    hour:this.toNumber(moment(date).format("hh")),
    minute:this.toNumber(moment(date).format("mm"))
  }
}


export function toDateExpiredDate(period:any) {
  return moment().add(period,'month').toDate()
}


export function toNearExpiredDate() {
  return moment().subtract(7,'day').toDate()
}