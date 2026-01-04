function combinations(numbers, targetSum) {
    /**
     * Find all valid combinations of 3 unique numbers that sum to targetSum,
     * where the first number must be even.
     * 
     * @param {number[]} numbers - Array of available numbers (1-7)
     * @param {number} targetSum - Target sum (12)
     * @returns {number[][]} Array of valid combinations
     */
    const result = [];
    
    // Iterate through all possible combinations of 3 unique numbers
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (j === i) continue; // Skip if same index
            
            for (let k = 0; k < numbers.length; k++) {
                if (k === i || k === j) continue; // Skip if same index
                
                const firstNum = numbers[i];
                const secondNum = numbers[j];
                const thirdNum = numbers[k];
                
                // Check if first number is even and sum equals target
                if (firstNum % 2 === 0 && firstNum + secondNum + thirdNum === targetSum) {
                    result.push([firstNum, secondNum, thirdNum]);
                }
            }
        }
    }
    
    return result;
}

// Test the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = combinations;
}

// Test code
const testNumbers = [1, 2, 3, 4, 5, 6, 7];
const result = combinations(testNumbers, 12);
console.log(`Found ${result.length} combinations:`);
result.forEach(combo => console.log(combo));
