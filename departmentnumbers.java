import java.util.ArrayList;
import java.util.List;

public class DepartmentNumbers {
    
    public static List<List<Integer>> combinations(List<Integer> numbers, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        
        // Iterate through all possible combinations of 3 unique numbers
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = 0; j < numbers.size(); j++) {
                if (j == i) continue; // Skip if same index
                
                for (int k = 0; k < numbers.size(); k++) {
                    if (k == i || k == j) continue; // Skip if same index
                    
                    int firstNum = numbers.get(i);
                    int secondNum = numbers.get(j);
                    int thirdNum = numbers.get(k);
                    
                    // Check if first number is even and sum equals target
                    if (firstNum % 2 == 0 && firstNum + secondNum + thirdNum == targetSum) {
                        List<Integer> combination = new ArrayList<>();
                        combination.add(firstNum);
                        combination.add(secondNum);
                        combination.add(thirdNum);
                        result.add(combination);
                    }
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7);
        List<List<Integer>> result = combinations(numbers, 12);
        
        System.out.println("Found " + result.size() + " combinations:");
        for (List<Integer> combo : result) {
            System.out.println(combo);
        }
    }
}
