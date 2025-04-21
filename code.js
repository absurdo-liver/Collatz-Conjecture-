function conjecture(n) { //all dat math shii
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


function start() { // Get the user input and output elements
  const userinput = parseInt(document.getElementById('userin').value); // Parse the input as an integer
  const output = document.getElementById('textelem'); // Get the output element
  if (isNaN(userinput) || userinput < 1) { // Check if the input is a valid positive number
    output.textContent = 'Please enter a valid positive number!'; // Display an error message
    return;
  }
  output.textContent = conjecture(userinput); // Call the conjecture function and display the result
}
