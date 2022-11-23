import Masker from 'vanilla-masker';

import { translate } from '~/services/i18n';

const invalidCPF: string[] = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

const invalidCNPJ: string[] = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999'
];

export const isCpf = (cpf: string) => {
  if (!cpf) { return false; }

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || invalidCPF.includes(cpf)) { return false; }

  const numberValue = cpf.slice(0, -2);
  const dv1 = cpf[9];
  const dv2 = cpf[10];

  if (checkDV(numberValue, dv1, 'cpf') && checkDV(numberValue + dv1, dv2, 'cpf')) { return true; }

  return false;
};

export const isCNPJ = (cnpj: string) => {
  if (!cnpj) { return false; }

  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14 || invalidCNPJ.includes(cnpj)) { return false; }

  const numberValue = cnpj.slice(0, -2);
  const dv1 = cnpj[12];
  const dv2 = cnpj[13];

  if (checkDV(numberValue, dv1, 'cnpj') && checkDV(numberValue + dv1, dv2, 'cnpj')) { return true; }

  return false;
};

const checkDV = (numberParam: string, dv: string, checkType: string) => {
  let check = null;
  let result = null;

  if (checkType === 'cpf') {
    check = numberParam
      .split('')
      .map((item: any, i) => {
        const res = item * (numberParam.length + 1 - i);

        return res;
      })
      .reduce((x, y) => {
        return x + y;
      });

    result = 11 - (check % 11);

    if (result === 10 || result === 11) {
      result = 0;
    }

  } else {
    check = numberParam
      .split('')
      .map((item: any, i) => {
        return ((i % 8) + 2) * parseInt(item, 10);
      })
      .reduce((x, y) => {
        return x + y;
      });

    result = check % 11;

    if (result < 2) {
      result = 0;
    } else {
      result = 11 - result;
    }
  }

  return result.toString() === dv;
};

export const maskPhone = (value: string) => {
  return value ? Masker.toPattern(value, "(99) 99999-9999") : '';
};

export const maskCpf = (value: string) => {
  return value ? Masker.toPattern(value, '999.999.999-99') : '';
};

export const maskDateTime = (value: string) => {
  return value ? Masker.toPattern(value, '99/99/9999 99:99') : '';
};

export const maskDate = (value: string) => {
  return value ? Masker.toPattern(value, '99/99/9999') : '';
};

export const maskHour = (value: string) => {
  return value ? Masker.toPattern(value, '99:99') : '';
};

export const maskCurrency = (value: number) => {
  return value ? `${translate('SHARED.CURRENCY_SYMBOL')} ${value.toFixed(2)}` : '';
};

export const unmaskField = (value: any) => {
  return value ? value.replace(/\D/g, "") : '';
};

export const maskCnpj = (value: string) => {
  return value ? Masker.toPattern(value, '99.999.999/9999-99') : '';
};

export const maskCpfOrCnpj = (value: string) => isCpf(value) ? maskCpf(value) : maskCnpj(value);
