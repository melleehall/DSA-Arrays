// 5. URLify a string 

function spaceReplacer(string) {
  const newStr = []
  for (let i = 0; i < string.length; i++) {
    if (string[i] == ' ') {
      newStr.push('%20')
    } else {
      newStr.push(string[i])
    }
  }
  return newStr.join('')
}

spaceReplacer('Input: www.thinkful.com /tauh ida parv een')
spaceReplacer('tauhida parveen')

// O(n), since the size of the input string is variable and the function loops over each character, the time complexity will directly correlate to the input size


// 7. Max sum in the array

function maxSum(arr) {
    let max=0;
    let sum;
    for (let i = 0; i < arr.length; i++) {
      sum = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
          sum += arr[j];
          console.log(`Sum is ${sum}`);
          if (sum > max) {
            max = sum;
            console.log(`The max is now ${max}`)
          }
        }
      }
    return `The max is ${max}`
}

console.log(maxSum([4, 6, -3, 5, -2, 1]))
  
// Polynomial O(n^2)
// This is a nested loop where all combinations of sequences must be summed and compared to the current max.


// 8. Merge Arrays

function mergeSortedArrays(arr1, arr2) {
    mergedArr = arr1.concat(arr2);
    // save the full lenth of merged array for the for loop
    length = arr1.concat(arr2).length;
    sortedArr = []
    for (let i = 0; i < length; i++) {
      const currentMin = (Math.min(...mergedArr));
      sortedArr.push(currentMin);
      mergedArr.splice(mergedArr.indexOf(currentMin), 1)
    }
    return sortedArr
  }

mergeSortedArrays([100, 49, 7, 4, 3, 8, 1], [3, 2, 5, 33, 6])

// O(n) the assignments on the 1st 3 lines of code in the function are constant and negligible.  The for loop completes once for each item in the array regardless of input size so the size of the input has a linear relationship with the time required to completethe function.


// 9. Remove characters

function removeChars(string, chars) {
    strArray = string.toLowerCase().split('');
    charsArray = chars.toLowerCase().split('');
    newArray = [];
    
    for (let i = 0; i < string.length; i++) {
      if (charsArray.includes(strArray[i]) === false) {
        newArray.push(strArray[i])
      }
    }
    // return strArray.join(' ')
    return newArray.join(' ')
  }
  
  // Expected output: 'Bttl f th Vwls: Hw vs. Grzny'
  removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou')
  removeChars('not my name', 'Melanie')
  
   // O(n) the assignments on the 1st 3 lines of code in the function are constant and negligible.  The for loop completes once for each item in the array regardless of input size so the size of the input has a linear relationship with the time required to completethe function.


// 10. Products

function products(arr1) {
    let product = 1;
    
    const productArr = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        if (i !== j) {
          product = product * arr1[j];
        }
      }
      productArr.push(product)
      product = 1;
    }
    return productArr
  }
  
  // Expected Output [108, 36, 12, 27]
  products([1, 3, 9, 4])
  // Expected Output [8, 64, 16, 32]
  products([8, 1, 4, 2])
  
  // The time complexity of two nested for loops is O(n^2).


// 11. 2D Array

function twoDArray(masterArr) {
    const newArr = masterArr;
    const rows = [];
    const columns = [];
    for (let i = 0; i < masterArr.length; i++) {
      for (let j = 0; j < masterArr[i].length; j++) {
        if (masterArr[i][j] === 0) {
          console.log(`row: ${i}`)
          rows.push(i)
          console.log(`column: ${j}`)
          columns.push(j)
        }
       }
    }
    for (let i = 0; i < masterArr.length; i++) {
      for (let j = 0; j < masterArr[i].length; j++) {
        if (rows.includes(i) || columns.includes(j)) {
          newArr[i][j] = 0
        }
      }
    }
    console.log(newArr)
  }
  
  // Expected Output: [[0,0,0,0,0],
  // [0,0,0,0,0],
  // [0,0,1,1,0],
  // [0,0,0,0,0],
  // [0,0,1,1,0]];

  twoDArray([[1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]])
  
// There are 2 nested for loops so this function has time complexity of O(2n^2) but since we ignore constants it is n^2 or polynomic




  // 12. String rotation

function strRotation(str1, str2) {
    if(str1.length !== str2.length) {
      return false;
    }
    const testString = str1 + str1;
    if (testString.includes(str2)) {
      return true
    } else {
      return false
    }
  }
  
  // Expected output: false
  strRotation('amazon', 'azonma')
  // Expected output: true
  strRotation('amazon', 'azonam')
  
  // O(n) the time complexity is constant as the function always accepts 2 strings and always looked for the second string in a doubled version of the first



