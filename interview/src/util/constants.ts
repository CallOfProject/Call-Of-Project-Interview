import {ProgrammingLanguageDTO} from "../app/dto/ProgrammingLanguageDTO";

export const HACKER_EARTH_EVALUATE_URL: string = "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/"
export const HACKER_EARTH_SECRET_KEY: string = "21e2f720fdaa55621e02ef0ae1925e9cf72b1a5f"
export const HACKER_EARTH_CALLBACK_URL: string = "https://client.com/callback/"
export const HACKER_EARTH_ID: string = "6320145ec35f0333db46ee584cfe3a4fdffe0ac714c2.api.hackerearth.com"
export const CODE_COMPILE_TIME_SECOND = 15

export const JAVA_PRE_CODE_DEFAULT: string = `import java.lang.*;
public class Main {
    public static void main(String[] args) {
      // Your code here
    }
}`

export const PYTHON_PRE_CODE_DEFAULT: string = `# Your code here`
export const C_PRE_CODE_DEFAULT: string = `#include <stdio.h>
int main() {
    // Your code here
    return 0;
}`

export const CPP_PRE_CODE_DEFAULT: string = `#include <iostream>
using namespace std;
int main() {
    // Your code here
    return 0;
}`
export const CSHARP_PRE_CODE_DEFAULT: string = `using System;
class Program {
    static void Main() {
        // Your code here
    }
}`
export const JAVASCRIPT_NODE_PRE_CODE_DEFAULT: string = `// Your code here`
export const GO_PRE_CODE_DEFAULT: string = `package main
import "fmt"
func main() {
    // Your code here
}`
export const KOTLIN_PRE_CODE_DEFAULT: string = `fun main() {
    // Your code here
}`
export const PHP_PRE_CODE_DEFAULT: string = `<?php
// Your code here
?>`
export const R_PRE_CODE_DEFAULT: string = `# Your code here`
export const RUBY_PRE_CODE_DEFAULT: string = `# Your code here`
export const RUST_PRE_CODE_DEFAULT: string = `fn main() {
    // Your code here
}`
export const SCALA_PRE_CODE_DEFAULT: string = `object Main {
    def main(args: Array[String]) {
        // Your code here
    }
}`
export const SWIFT_PRE_CODE_DEFAULT: string = `import Swift
// Your code here`
export const TYPESCRIPT_PRE_CODE_DEFAULT: string = `// Your code here`

export const supportedLanguages: ProgrammingLanguageDTO[] = [
  new ProgrammingLanguageDTO("C", "C", "c", C_PRE_CODE_DEFAULT, ".c"),
  new ProgrammingLanguageDTO("C++ 14", "C++14", "cpp", CPP_PRE_CODE_DEFAULT, ".cpp"),
  new ProgrammingLanguageDTO("C++ 17", "C++17", "cpp", CPP_PRE_CODE_DEFAULT, ".cpp"),
  new ProgrammingLanguageDTO("C#", "CSHARP", "csharp", CSHARP_PRE_CODE_DEFAULT, ".cs"),
  new ProgrammingLanguageDTO("Java 8", "JAVA8", "java", JAVA_PRE_CODE_DEFAULT, ".java"),
  new ProgrammingLanguageDTO("Java 14", "JAVA14", "java", JAVA_PRE_CODE_DEFAULT, ".java"),
  new ProgrammingLanguageDTO("Javascript", "JAVASCRIPT_NODE", "javascript", JAVASCRIPT_NODE_PRE_CODE_DEFAULT, ".js"),
  new ProgrammingLanguageDTO("GO", "GO", "go", GO_PRE_CODE_DEFAULT, ".go"),
  new ProgrammingLanguageDTO("Kotlin", "KOTLIN", "kotlin", KOTLIN_PRE_CODE_DEFAULT, ".kt"),
  new ProgrammingLanguageDTO("Python 2", "PYTHON", "python", PYTHON_PRE_CODE_DEFAULT, ".py"),
  new ProgrammingLanguageDTO("Python 3", "PYTHON3", "python", PYTHON_PRE_CODE_DEFAULT, ".py"),
  new ProgrammingLanguageDTO("Python 3.8", "PYTHON3.8", "python", PYTHON_PRE_CODE_DEFAULT, ".py"),
  new ProgrammingLanguageDTO("PHP", "PHP", "php", PHP_PRE_CODE_DEFAULT, ".php"),
  new ProgrammingLanguageDTO("R", "R", "r", R_PRE_CODE_DEFAULT, ".r"),
  new ProgrammingLanguageDTO("Ruby", "RUBY", "ruby", RUBY_PRE_CODE_DEFAULT, ".rb"),
  new ProgrammingLanguageDTO("Rust", "RUST", "rust", RUST_PRE_CODE_DEFAULT, ".rs"),
  new ProgrammingLanguageDTO("Scala", "SCALA", "scala", SCALA_PRE_CODE_DEFAULT, ".scala"),
  new ProgrammingLanguageDTO("Swift", "SWIFT", "swift", SWIFT_PRE_CODE_DEFAULT, ".swift"),
  new ProgrammingLanguageDTO("Typescript", "TYPESCRIPT", "typescript", TYPESCRIPT_PRE_CODE_DEFAULT, ".ts")];
