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
    thousand: 1000,
    million: 1000000
  };

  text = text.toLowerCase().replace(/-/g, ' ').trim();
  const words = text.split(/\s+/);

  let current = 0;
  let total = 0;

  for (let word of words) {
    if (word === "and") continue;
    else if (ones[word] !== undefined) current += ones[word];
    else if (teens[word] !== undefined) current += teens[word];
    else if (tens[word] !== undefined) current += tens[word];
    else if (word === "hundred") {
      current *= 100;
    } else if (word === "thousand" || word === "million") {
      current *= scales[word];
      total += current;
      current = 0;
    } else {
      return NaN; // Unknown word
    }
  }

  return total + current;
}


// Leaderboard setup
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function saveLeaderboardToStorage() {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboardDisplay() {
  const tableBody = document.getElementById('leaderboard-body');
  tableBody.innerHTML = '';

  leaderboard.slice(0, 5).forEach((entry, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.start}</td>
      <td>${entry.max}</td>
      <td>${entry.steps}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Conjecture logic
function conjecture(n) {
  let result = n + '\n';
  let counter = 0;
  let maxInSequence = n;
  let original = n;

  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = n * 3 + 1;
    }
    result += n + '\n';
    counter += 1;
    if (n > maxInSequence) maxInSequence = n;
  }

  leaderboard.push({ start: original, max: maxInSequence, steps: counter });

  // Sort by steps first, then by highest number
  leaderboard.sort((a, b) => {
    if (b.steps === a.steps) {
      return b.max - a.max;
    }
    return b.steps - a.steps;
  });

  // Remove duplicates based on starting number
  leaderboard = leaderboard.filter((entry, index, self) =>
    index === self.findIndex(e => e.start === entry.start)
  ).slice(0, 5);

  saveLeaderboardToStorage();
  updateLeaderboardDisplay();

  result += 'conjecture finished!';
  result += '\nTotal steps: ' + counter;
  return result;
}

//start function
function start() {
  const rawInput = document.getElementById('userin').value.trim().toLowerCase();
  let userinput = parseInt(rawInput);

  const output = document.getElementById('textelem');

  // If input is numeric and contains words like "thousand" or "million"
  if (!isNaN(userinput)) {
    if (rawInput.includes("thousand")) {
      userinput *= 1000;
    } else if (rawInput.includes("million")) {
      userinput *= 1000000;
    }
  } else {
    // Try to convert full word string
    userinput = wordsToNumber(rawInput);
  }

  if (isNaN(userinput) || userinput < 1) {
    output.textContent = 'Please enter a valid positive number!';
    return;
  }

  output.textContent = conjecture(userinput);
}


// Initialize leaderboard on load
updateLeaderboardDisplay();
