function conjecture(n) { //all dat math shii
  let result = n + '\n'; // Start with the initial number
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = n * 3 + 1;
    }
    result += n + '\n'; // Append each number
  }
  result += 'conjecture finished!';
  return result; //return results
}

function start() { //function ran by start button
  const userinput = parseInt(document.getElementById('userin').value); //parse user input
  const output = document.getElementById('textelem');
  output.textContent = conjecture(userinput); //set text on webpage to the string previously appended to
}

