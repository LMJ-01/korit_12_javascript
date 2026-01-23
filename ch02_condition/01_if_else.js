let age = 12;
let bysFare = 0;

if(age < 7) {
  busFare = 0;
} else if(age >= 7 && age < 13) {
  busFare = 400;
} else if(age >= 13 && age < 19) {
  busFare = 720;
} else if(age >= 19 && age <= 70) {
  busFare = 1200;
} else if (age > 70) {
  busFare = 0;
}

console.log(busFare + "원");

// bmi 지수 계산 관련한 부분을 JavaScript로 작성하시오.

// let height = 172;
// let weight = 68;
// let bmi = Math.round(weight / height ** 2  * 10000 * 10) / 10;
// let grade = '';

let height = 172;
let weight = 68;
height = 172 * 0.01;

let bmi = weight / height ** 2;
let grade = '';

// 로직을 작성하시오.

if (bmi < 18.5) grade = '저체중';
else if (bmi < 22.9) grade = '정상';
else if (bmi < 24.9) grade = '비만전단계';
else if (bmi < 29.9) grade = '1단계 비만';
else if (bmi < 34.9) grade = '2단계 비만';
else grade = '3단계 비만';

// if (bmi < 18.5) {
//   grade = '저체중';
// } else if (bmi >= 18.5 && bmi <= 22.9) {
//   grade = '정상';
// } else if (bmi >= 23 && bmi <= 24.9) {
//   grade = '비만전단계';
// } else if (bmi >= 25 && bmi <= 29.9) {
//   grade = '1단계 비만';
// } else if (bmi >= 30 && bmi <= 34.9) {
//   grade = '2단계 비만';
// } else if (bmi >= 35) {
//   grade = '3단계 비만';
// }

if (bmi < 18.5) grade = '저체중';
else if (bmi < 22.9) grade = '정상';
else if (bmi < 24.9) grade = '비만전단계';
else if (bmi < 29.9) grade = '1단계 비만';
else if (bmi < 34.9) grade = '2단계 비만';
else grade = '3단계 비만';

console.log('당신의 bmi 지수는 ' + bmi.toFixed(1) + '이고 ' + grade + '입니다.');
// 소수점 첫쨰짜리까지만 표기하기 위해 number 자료형의 .toFixed(1) 메서드 호출 -> argument로 정수로 입력하면
/*
  2 라고 입력한다면 소수점 셋째 자리에서 반올림하여 2째 자리까지 표기해줍니다.*/