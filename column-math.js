/**
 * Adds two numbers using column method (as humans do)
 * Note: doesn't work with negative numbers
 * @param {number} number1 - 1st number to sum 
 * @param {number} number2 - 2nd number to sum 
 */
function columnAddPositive(number1, number2) {
	const s1 = Math.abs(number1).toString();
	const s2 = Math.abs(number2).toString();
	const lenMax = Math.max(s1.length, s2.length);

	let acc = 0;
	let result = '';
	for (let i = 0; i < lenMax; i++) {
		if (s1.length > i) a = Number(s1[s1.length - 1 - i]); else a = 0;
		if (s2.length > i) b = Number(s2[s2.length - 1 - i]); else b = 0;
		let sum = acc + a + b;
		acc = Math.trunc(sum / 10);
		sum = sum % 10;
		//console.log('Adding %s + %s, write: %s, save %s', a, b, sum, acc);
		result = sum.toString() + result;
	}
	if (acc !== 0) result = acc.toString() + result; 

	//console.log('Adding %s + %s = %s, should be: %s', number1, number2, result, number1 + number2);
	return result;
}

/**
 * Suntracts one number form another using column method (as humans do)
 * Note: doesn't work with negative numbers
 * @param {number} number - subtrahend number
 * @param {number} subtractor - number to subtract
 */
function columnSubPositive(number, subtractor) {
	const s1 = Math.abs(number).toString();
	const s2 = Math.abs(subtractor).toString();
	const lenMax = Math.max(s1.length, s2.length);

	let acc = 0;
	let result = '';
	for (let i = 0; i < lenMax; i++) {
		if (s1.length > i - 1) prev = Number(s1[s1.length - 2 - i]); else prev = 0;
		if (s1.length > i) a = Number(s1[s1.length - 1 - i]); else a = 0;
		if (s2.length > i) b = Number(s2[s2.length - 1 - i]); else b = 0;
		let sub = (a - acc) - b;
		if (sub < 0 && prev > 0) {
			sub = 10 + sub;
			acc = 1;
		} else {
			acc = 0;	
		}
		//console.log('Subtracting %s - %s, write: %s, save %s', a, b, sub, acc);
		result = sub.toString() + result;
	}
	//console.log('Subtracting %s + %s = %s, should be: %s', number1, number2, result, number1 + number2);
	return result;
}

/**
 * Adds two numbers using column method (as humans do)
 * Work with negative numbers
 * @param {number} number1 - 1st number to sum 
 * @param {number} number2 - 2nd number to sum 
 */
function columnAdd(number1, number2) {
	let sign1, sign2;
	if (number1 < 0) sign1 = -1; else sign1 = 1;
	if (number2 < 0) sign2 = -1; else sign2 = 1;

	if (sign1 < 0 && sign2 < 0) return -1 * columnAdd(sign1 * number1, sign2 * number2); // -a+(-b) = -1*(a+b)
	if (sign1 < 0 && sign2 > 0) return columnSub(number2, sign1 * number1); // -a + b = b - a	
	if (sign1 > 0 && sign2 < 0) return columnSub(number1, sign2 * number2); // a+(-b) = a - b

	// Both numbers are positve
	return columnAddPositive(number1, number2);
}

/**
 * Suntracts one number form another using column method (as humans do)
 * Works with negative numbers
 * @param {number} number1 - subtrahend number
 * @param {number} number2 - number to subtract
 */
function columnSub(number1, number2) {
	let sign1, sign2;
	if (number1 < 0) sign1 = -1; else sign1 = 1;
	if (number2 < 0) sign2 = -1; else sign2 = 1;

	if (sign1 < 0 && sign2 < 0) return columnSub(sign2 * number2, sign1 * number1); // -a-(-b) = b - a
	if (sign1 < 0 && sign2 > 0) return -1 * columnAdd(sign1 * number1, number2); // -a - b = -1*(a+b)	
	if (sign1 > 0 && sign2 < 0) return columnAdd(number1, sign2 * number2); // a -(-b) = a + b

	// Both numbers are positve
	if (number1 >= number2)
		return columnSubPositive(number1, number2); // positive result
	else
		return -1 * columnSubPositive(number2, number1); // negative result
}


/**
 * Test for "human math" functions
 */
function test() {
	let a, b;

	// Adding
	a = 12345;
	b = 67890;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAddPositive(a, b), a + b);

	a = 12345;
	b = 13;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAddPositive(a, b), a + b);

	a = 0;
	b = 13;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAddPositive(a, b), a + b);

	a = 999999;
	b = 999999;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAddPositive(a, b), a + b);

	a = -111;
	b = -222;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAdd(a, b), a + b);

	a = -222;
	b = 111;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAdd(a, b), a + b);

	a = 222;
	b = -111;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAdd(a, b), a + b);

	a = 222;
	b = 111;
	console.log('Adding %s + %s = %s, should be: %s', a, b, columnAdd(a, b), a + b);


	// Subtraction
	a = 222;
	b = 111;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSubPositive(a, b), a - b);

	a = 11;
	b = 0;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSubPositive(a, b), a - b);

	a = 222;
	b = 99;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSubPositive(a, b), a - b);
	
	a = -222;
	b = -111;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSub(a, b), a - b);

	a = -222;
	b = 111;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSub(a, b), a - b);

	a = 222;
	b = -111;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSub(a, b), a - b);

	a = 222;
	b = 111;
	console.log('Subtracting %s - %s = %s, should be: %s', a, b, columnSub(a, b), a - b);


}
test();
