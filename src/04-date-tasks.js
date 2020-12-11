/* *******************************************************************************************
 *                                                                                           *
 * Plese read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 *    Если год не делится на 4, значит он обычный.
 * Иначе надо проверить не делится ли год на 100.
 * Если не делится, значит это не столетие и можно сделать вывод, что год високосный.
 * Если делится на 100, значит это столетие и его следует проверить его делимость на 400.
 *  Если год делится на 400, то он високосный.
 *  Иначе год обычный.
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  const isLeapY = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return isLeapY;
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const hourDiff = (endDate.getHours() - startDate.getHours()).toString();
  const minDiff = (endDate.getMinutes() - startDate.getMinutes()).toString();
  const secDiff = (endDate.getSeconds() - startDate.getSeconds()).toString();
  const milliDiff = (endDate.getMilliseconds() - startDate.getMilliseconds()).toString();

  return `${hourDiff.toString().padStart(2, '0')}:${minDiff.toString().padStart(2, '0')}:${secDiff.toString().padStart(2, '0')}.${milliDiff.toString().padStart(3, '0')}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 *    Clock angle problems relate two different measurements: angles and time.
 *    The angle is typically measured in degrees from the mark of number 12 clockwise.
 *    The time is usually based on a 12-hour clock.

 * A method to solve such problems is to consider the rate of change of the angle
 * in degrees per minute. The hour hand of a normal 12-hour analogue clock turns 360° in 12 hours
 * (720 minutes) or 0.5° per minute. The minute hand rotates through 360° in 60 minutes
 * or 6° per minute.[1]

 Equation for the angle of the hour hand
 {\displaystyle \theta _{\text{hr}}=0.5^{\circ }\times M_{\Sigma }=0.5^{\circ }\
 times (60\times H+M)}\theta _{\text{hr}}=0.5^{\circ }\times M_{\Sigma }=
 0.5^{\circ }\times (60\times H+M)
 where:

 θ is the angle in degrees of the hand measured clockwise from the 12
 H is the hour.
 M is the minutes past the hour.
 MΣ is the number of minutes since 12 o'clock.
 {\displaystyle M_{\Sigma }=(60\times H+M)}{\displaystyle M_{\Sigma }=(60\times H+M)}
 Equation for the angle of the minute hand
 {\displaystyle \theta _{\text{min.}}=6^{\circ }\times M}\theta _{\text{min.}}=6^{\circ }\times M
 where:

 θ is the angle in degrees of the hand measured clockwise from the 12 o'clock position.
 M is the minute.
 Example
 The time is 5:24. The angle in degrees of the hour hand is:

 {\displaystyle \theta _{\text{hr}}=0.5^{\circ }\times (60\times 5+24)=162^{\circ }}
 \theta _{\text{hr}}=0.5^{\circ }\times (60\times 5+24)=162^{\circ }
 The angle in degrees of the minute hand is:

 {\displaystyle \theta _{\text{min.}}=6^{\circ }\times 24=144^{\circ }}
 \theta _{\text{min.}}=6^{\circ }\times 24=144^{\circ }
 */
function angleBetweenClockHands(date) {
  const hour = date.getUTCHours() % 12;
  const minute = date.getUTCMinutes();
  const diff = 0.5 * ((60 * hour) - (11 * minute));
  const getCircleAbs = (d) => Math.abs(d * (Math.PI / 180));
  return diff > 180 ? getCircleAbs(360 - diff) : getCircleAbs(diff);
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
