import { extname } from 'path';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { SEPARATE } from '@constants/string.const';

@Injectable()
export class StringService {
  sPrefix = 'NBA';

  removeVN(str: string): string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.trim();
    // Remove punctuations
    return str;
  }

  removeSpecialCharacters(str: string, sReplace = ' '): string {
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      sReplace,
    );
    return str;
  }

  removeExtraSpace(sString: string) {
    sString = sString.replace(/\s\s+/g, ' ');
    return sString;
  }

  replaceAllSpace(sString: string, sReplace = '') {
    sString = sString.replace(/\s/g, sReplace);
    return sString;
  }

  onlyAlphabet(sString: string, sReplace = ''): string {
    sString = sString.replace(/[^a-zA-Z0-9 ]/g, sReplace);
    return sString;
  }

  onlyNumber(sString: string, sReplace = ''): string {
    sString = sString.replace(/[^0-9 ]/g, sReplace);
    return sString;
  }

  seo(sString: string, sReplace = '-'): string {
    sString = this.removeVN(sString);
    sString = this.onlyAlphabet(sString, sReplace);
    sString = this.removeExtraSpace(sString);
    sString = this.replaceAllSpace(sString, sReplace);
    sString = sString.toLowerCase();
    return sString;
  }

  compress(sString: string): string {
    let compress = sString.trim();
    compress = compress.toLowerCase();
    compress = this.removeSpecialCharacters(compress);
    compress = this.removeExtraSpace(compress);
    return compress;
  }

  genRand(length = 15, iType = 0): string {
    let sString = '';
    let sCodeAlphabet = '0123456789';

    if (iType != 1) {
      //Only Number
      sCodeAlphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      sCodeAlphabet += 'abcdefghijklmnopqrstuvwxyz';
    }

    const iMax = sCodeAlphabet.length; // edited

    for (let i = 0; i < length; i++) {
      const iRand = Math.floor(Math.random() * iMax);
      sString += sCodeAlphabet.charAt(iRand);
    }

    return sString;
  }

  separate(sString: string): string[] {
    const separates = SEPARATE;
    let aSep = [];
    for (const sep of separates) {
      aSep = sString.split(sep);
      if (aSep.length > 1) {
        return aSep;
      }
    }

    return aSep;
  }

  getFileName(file) {
    const ext = extname(file.originalname);
    const fileName = file.originalname.replace(ext, '');
    const formatPrefix = moment().format('YYYY-MM-DD h:m:s');
    const name = this.seo(fileName);
    const prefix = this.seo(formatPrefix);
    const milliseconds = moment().milliseconds();
    return `${prefix}-${milliseconds}-${name}${ext}`;
  }
}
