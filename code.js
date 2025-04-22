// Convert words like "seventy four" or "one hundred twenty" to numbers
function wordsToNumber(text) {
  if (!text || typeof text !== 'string') return NaN;

  const ones = {
    zero: 0, one: 1, two: 2, three: 3, four: 4,
    five: 5, six: 6, seven: 7, eight: 8, nine: 9
  };

  const teens = {
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
    fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19
  };

  const tens = {
    twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90
  };

  const scales = {
    hundred: 100,
    thousand: 1000
  };

  text = text.toLowerCase().replace(/-/g, ' ').trim(); // Normalize input
  const words = text.split(/\s+/); // Split into individual words

  let current = 0;
  let total = 0;

  for (let word of words) {
    if (word === "and") {
      continue; // Ignore "and"
    } else if (ones[word] !== undefined) {
      current += ones[word];
    } else if (teens[word] !== undefined) {
      current += teens[word];
    } else if (tens[word] !== undefined) {
      current += tens[word];
    } else if (word === "hundred") {
      current *= 100;
    } else if (word === "thousand") {
      current *= 1000;
      total += current;
      current = 0;
    } else {
      return NaN; // Unknown word
    }
  }

  return total + current;
}


//all dat math shii
function conjecture(n) { 
  let result = n + '\n'; // Start with the initial number
  let counter = 0; // Initialize a counter
  while (n !== 1) { // Loop until n becomes 1
    if (n % 2 === 0) { // Check if n is even or odd
      n /= 2;
    } else {
      n = n * 3 + 1;
    }
    result += n + '\n'; // Append each number
    counter += 1; // Increment the counter
  }
  result += 'conjecture finished!';
  result += '\nTotal steps: ' + counter; // Append the total steps
  return result; //return results
}


//function ran by start button
function start() { 
  const rawInput = document.getElementById('userin').value; // Get raw user input
  let userinput = parseInt(rawInput); // Try to parse as number first

  if (isNaN(userinput)) {
    userinput = wordsToNumber(rawInput); // Try to parse spelled-out numbers
  }

  const output = document.getElementById('textelem'); // Get the output element
  if (isNaN(userinput) || userinput < 1) { // Check if the input is a valid positive number
    output.textContent = 'Please enter a valid positive number!'; // Display an error message
    return;
  }

  output.textContent = conjecture(userinput); // Call the conjecture function and display the result
}