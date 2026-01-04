// Advanced combination solver with optimizations
function combinations(numbers, targetSum) {
  const result = [];
  const n = numbers.length;

  // Early termination checks
  if (n < 3) return result;

  // Sort numbers for better performance
  const sorted = [...numbers].sort((a, b) => a - b);

  // Use Set for O(1) lookups
  const numberSet = new Set(sorted);

  // Optimized triple loop with early termination
  for (let i = 0; i < n; i++) {
    const first = sorted[i];

    // Skip if first number is odd (Police constraint)
    if (first % 2 !== 0) continue;

    for (let j = 0; j < n; j++) {
      if (j === i) continue;

      const second = sorted[j];
      const remaining = targetSum - first - second;

      // Early termination if remaining is out of bounds
      if (remaining < 1 || remaining > 7) continue;

      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;

        const third = sorted[k];

        // Check if this combination sums to target
        if (third === remaining) {
          result.push([first, second, third]);
        }
      }
    }
  }

  return result;
}

// Optimized version using hash map for better performance
function combinationsOptimized(numbers, targetSum) {
  const result = [];
  const n = numbers.length;

  if (n < 3) return result;

  // Create a map for O(1) lookups
  const indexMap = new Map();
  numbers.forEach((num, idx) => {
    if (!indexMap.has(num)) {
      indexMap.set(num, []);
    }
    indexMap.get(num).push(idx);
  });

  // Generate all valid combinations
  for (let i = 0; i < n; i++) {
    const first = numbers[i];
    if (first % 2 !== 0) continue; // Police must be even

    for (let j = 0; j < n; j++) {
      if (j === i) continue;

      const second = numbers[j];
      const needed = targetSum - first - second;

      // Check if needed number exists and is available
      if (indexMap.has(needed)) {
        const indices = indexMap.get(needed);
        const availableIndex = indices.find((idx) => idx !== i && idx !== j);

        if (availableIndex !== undefined) {
          result.push([first, second, needed]);
        }
      }
    }
  }

  return result;
}

// UI Functions
function solvePuzzle() {
  const numbersInput = document.getElementById("numbersInput").value;
  const targetInput = parseInt(document.getElementById("targetInput").value);

  // Parse numbers
  const numbers = numbersInput
    .split(",")
    .map((n) => parseInt(n.trim()))
    .filter((n) => !isNaN(n) && n >= 1 && n <= 7);

  if (numbers.length === 0) {
    showToast("Please enter valid numbers between 1-7");
    return;
  }

  // Show loading
  showLoading(true);

  // Simulate processing time for better UX
  setTimeout(() => {
    const startTime = performance.now();
    const results = combinations(numbers, targetInput);
    const endTime = performance.now();

    displayResults(results, endTime - startTime);
    showLoading(false);
  }, 500);
}

function displayResults(results, executionTime) {
  const resultsContainer = document.getElementById("results");
  const combinationsGrid = document.getElementById("combinationsGrid");
  const resultsCount = document.getElementById("resultsCount");

  resultsContainer.style.display = "block";
  combinationsGrid.innerHTML = "";

  // Display combinations
  results.forEach((combo, index) => {
    const card = document.createElement("div");
    card.className = "combination-card";
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
                    <span class="dept-number police">${combo[0]}</span>
                    <span class="dept-label">Police</span>
                    <div style="margin: 0.5rem 0; font-size: 1.2rem;">→</div>
                    <span class="dept-number sanitation">${combo[1]}</span>
                    <span class="dept-label">Sanitation</span>
                    <div style="margin: 0.5rem 0; font-size: 1.2rem;">→</div>
                    <span class="dept-number fire">${combo[2]}</span>
                    <span class="dept-label">Fire</span>
                `;

    combinationsGrid.appendChild(card);
  });

  // Update stats
  document.getElementById("totalCombinations").textContent = results.length;
  document.getElementById("executionTime").textContent = executionTime.toFixed(
    2
  );

  // Calculate efficiency (theoretical max vs actual)
  const theoreticalMax = Math.pow(7, 3);
  const efficiency = ((results.length / theoreticalMax) * 100).toFixed(1);
  document.getElementById("efficiency").textContent = efficiency + "%";

  resultsCount.textContent = `${results.length} valid combinations found`;

  // Display code
  displayCode();
}

function displayCode() {
  const code = `function combinations(numbers, targetSum) {
    const result = [];
    
    for (let i = 0; i < numbers.length; i++) {
        const first = numbers[i];
        
        // Police department must be even
        if (first % 2 !== 0) continue;
        
        for (let j = 0; j < numbers.length; j++) {
            if (j === i) continue;
            
            const second = numbers[j];
            
            for (let k = 0; k < numbers.length; k++) {
                if (k === i || k === j) continue;
                
                const third = numbers[k];
                
                if (first + second + third === targetSum) {
                    result.push([first, second, third]);
                }
            }
        }
    }
    
    return result;
}`;

  document.getElementById("codeDisplay").textContent = code;
}

function generateRandom() {
  const numbers = [];
  while (numbers.length < 7) {
    const num = Math.floor(Math.random() * 7) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  const target = Math.floor(Math.random() * 10) + 10;

  document.getElementById("numbersInput").value = numbers.join(",");
  document.getElementById("targetInput").value = target;

  solvePuzzle();
}

function copyCode() {
  const code = document.getElementById("codeDisplay").textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = event.target;
    btn.textContent = "Copied!";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = "Copy Code";
      btn.classList.remove("copied");
    }, 2000);
  });
}

function showLoading(show) {
  document.getElementById("loading").classList.toggle("active", show);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Initialize with default values
window.addEventListener("load", () => {
  solvePuzzle();
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    solvePuzzle();
  } else if (e.ctrlKey && e.key === "r") {
    e.preventDefault();
    generateRandom();
  }
});

// Add input validation
document.getElementById("numbersInput").addEventListener("input", (e) => {
  const value = e.target.value;
  const sanitized = value.replace(/[^0-9,]/g, "");
  if (value !== sanitized) {
    e.target.value = sanitized;
  }
});

document.getElementById("targetInput").addEventListener("input", (e) => {
  const value = e.target.value;
  const sanitized = value.replace(/[^0-9]/g, "");
  if (value !== sanitized) {
    e.target.value = sanitized;
  }
});
