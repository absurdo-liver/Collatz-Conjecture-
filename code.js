function conjecture(n) { //all dat math shii
  let result = n + '\n'; // Start with the initial number
  let counter = 0; // Initialize a counter
  while (n !== 1) {
    if (n % 2 === 0) {
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


function start() {
  const userinput = parseInt(document.getElementById('userin').value);
  const output = document.getElementById('textelem');

  if (isNaN(userinput) || userinput < 1) {
    output.textContent = 'Please enter a valid positive number!';
    return;
  }

  output.textContent = conjecture(userinput);
}
