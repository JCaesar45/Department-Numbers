def combinations(numbers, target_sum):
    """
    Find all valid combinations of 3 unique numbers that sum to target_sum,
    where the first number must be even.
    
    Args:
        numbers: List of available numbers (1-7)
        target_sum: Target sum (12)
    
    Returns:
        List of valid combinations
    """
    result = []
    
    # Iterate through all possible combinations of 3 unique numbers
    for i in range(len(numbers)):
        for j in range(len(numbers)):
            if j == i:  # Skip if same index
                continue
            for k in range(len(numbers)):
                if k == i or k == j:  # Skip if same index
                    continue
                
                # Check if first number is even and sum equals target
                if numbers[i] % 2 == 0 and numbers[i] + numbers[j] + numbers[k] == target_sum:
                    result.append([numbers[i], numbers[j], numbers[k]])
    
    return result

# Test the function
if __name__ == "__main__":
    test_numbers = [1, 2, 3, 4, 5, 6, 7]
    result = combinations(test_numbers, 12)
    print(f"Found {len(result)} combinations:")
    for combo in result:
        print(combo)
