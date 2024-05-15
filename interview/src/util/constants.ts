import {ProgrammingLanguageDTO} from "../app/dto/ProgrammingLanguageDTO";

export const CURRENT_USER = 'currentUser';
// Connection for Hackerearth API
export const HACKER_EARTH_EVALUATE_URL: string = "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/"
export const HACKER_EARTH_SECRET_KEY: string = "21e2f720fdaa55621e02ef0ae1925e9cf72b1a5f"
export const HACKER_EARTH_CALLBACK_URL: string = "https://client.com/callback/"
export const HACKER_EARTH_ID: string = "6320145ec35f0333db46ee584cfe3a4fdffe0ac714c2.api.hackerearth.com"
export const CODE_COMPILE_TIME_SECOND = 10

export const JAVA_PRE_CODE_DEFAULT: string = /*'import java.util.Arrays;\n' +
  'import java.util.Deque;\n' +
  'import java.util.Random;\n' +
  'import java.util.concurrent.ExecutorService;\n' +
  'import java.util.concurrent.Executors;\n' +
  'import java.util.concurrent.Semaphore;\n' +
  'import java.util.ArrayDeque;\n' +
  '\n' +
  'public class Main\n' +
  '{\n' +
  '    public static void main(String[] args)\n' +
  '    {\n' +
  '       ProducerConsumer pc = new ProducerConsumer(new ArrayDeque<>());\n' +
  '       pc.run();\n' +
  '    }\n' +
  '}\n' +
  '\n' +
  'class ProducerConsumer {\n' +
  '    private static final int QUEUE_SIZE = 10;\n' +
  '    private final ExecutorService m_executorService = Executors.newFixedThreadPool(2);\n' +
  '    private final Semaphore m_semaphoreProducer = new Semaphore(QUEUE_SIZE);\n' +
  '    private final Semaphore m_semaphoreConsumer = new Semaphore(0);\n' +
  '    private final Deque<Integer> m_queue;\n' +
  '    private Void producerCallback() throws InterruptedException\n' +
  '    {\n' +
  '        var random = new Random();\n' +
  '        var value = 0;\n' +
  '\n' +
  '        while (true) {\n' +
  '            m_semaphoreProducer.acquire(QUEUE_SIZE);\n' +
  '            m_queue.push(value++);\n' +
  '            m_semaphoreConsumer.release(QUEUE_SIZE);\n' +
  '\n' +
  '            if (value == 100)\n' +
  '                break;\n' +
  '\n' +
  '        }\n' +
  '\n' +
  '        return null;\n' +
  '    }\n' +
  '\n' +
  '    private Void consumerCallback() throws InterruptedException\n' +
  '    {\n' +
  '        var random = new Random();\n' +
  '        int value;\n' +
  '\n' +
  '        while (true) {\n' +
  '            m_semaphoreConsumer.acquire(QUEUE_SIZE);\n' +
  '            value = m_queue.removeFirst();\n' +
  '            m_semaphoreProducer.release(QUEUE_SIZE);\n' +
  '\n' +
  '            System.out.printf("%d ", value);\n' +
  '            if (value >= 99)\n' +
  '                break;\n' +
  '\n' +
  '        }\n' +
  '\n' +
  '        return null;\n' +
  '    }\n' +
  '\n' +
  '    public ProducerConsumer(Deque<Integer> queue)\n' +
  '    {\n' +
  '        m_queue = queue;\n' +
  '    }\n' +
  '\n' +
  '    public void run()\n' +
  '    {\n' +
  '        m_executorService.submit(this::producerCallback);\n' +
  '        m_executorService.submit(this::consumerCallback);\n' +
  '        m_executorService.shutdown();\n' +
  '    }\n' +
  '}'*/
  `import java.lang.*;
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


export const LANG_C = new ProgrammingLanguageDTO("C", "C", "c", C_PRE_CODE_DEFAULT, ".c")
export const LANG_CPP_14 = new ProgrammingLanguageDTO("C++ 14", "CPP14", "cpp", CPP_PRE_CODE_DEFAULT, ".cpp")
export const LANG_CPP_17 = new ProgrammingLanguageDTO("C++ 17", "CPP17", "cpp", CPP_PRE_CODE_DEFAULT, ".cpp")
export const LANG_CSHARP = new ProgrammingLanguageDTO("C#", "CSHARP", "csharp", CSHARP_PRE_CODE_DEFAULT, ".cs")
export const LANG_JAVA_8 = new ProgrammingLanguageDTO("Java 8", "JAVA8", "java", JAVA_PRE_CODE_DEFAULT, ".java")
export const LANG_JAVA_14 = new ProgrammingLanguageDTO("Java 14", "JAVA14", "java", JAVA_PRE_CODE_DEFAULT, ".java")
export const LANG_JAVASCRIPT_NODE = new ProgrammingLanguageDTO("Javascript", "JAVASCRIPT_NODE", "javascript", JAVASCRIPT_NODE_PRE_CODE_DEFAULT, ".js")
export const LANG_GO = new ProgrammingLanguageDTO("GO", "GO", "go", GO_PRE_CODE_DEFAULT, ".go")
export const LANG_KOTLIN = new ProgrammingLanguageDTO("Kotlin", "KOTLIN", "kotlin", KOTLIN_PRE_CODE_DEFAULT, ".kt")
//export const LANG_PYTHON_2 = new ProgrammingLanguageDTO("Python 2", "PYTHON", "python", PYTHON_PRE_CODE_DEFAULT, ".py")
export const LANG_PYTHON_3 = new ProgrammingLanguageDTO("Python 3", "PYTHON3", "python", PYTHON_PRE_CODE_DEFAULT, ".py")
//export const LANG_PYTHON_3_8 = new ProgrammingLanguageDTO("Python 3.8", "PYTHON3.8", "python", PYTHON_PRE_CODE_DEFAULT, ".py")
export const LANG_PHP = new ProgrammingLanguageDTO("PHP", "PHP", "php", PHP_PRE_CODE_DEFAULT, ".php")
export const LANG_R = new ProgrammingLanguageDTO("R", "R", "r", R_PRE_CODE_DEFAULT, ".r")
export const LANG_RUBY = new ProgrammingLanguageDTO("Ruby", "RUBY", "ruby", RUBY_PRE_CODE_DEFAULT, ".rb")
export const LANG_RUST = new ProgrammingLanguageDTO("Rust", "RUST", "rust", RUST_PRE_CODE_DEFAULT, ".rs")
export const LANG_SCALA = new ProgrammingLanguageDTO("Scala", "SCALA", "scala", SCALA_PRE_CODE_DEFAULT, ".scala")
export const LANG_SWIFT = new ProgrammingLanguageDTO("Swift", "SWIFT", "swift", SWIFT_PRE_CODE_DEFAULT, ".swift")
export const LANG_TYPESCRIPT = new ProgrammingLanguageDTO("Typescript", "TYPESCRIPT", "typescript", TYPESCRIPT_PRE_CODE_DEFAULT, ".ts")


// LANG_PYTHON_3_8, LANG_PYTHON_2
export const supportedLanguages: ProgrammingLanguageDTO[] = [
  LANG_C, LANG_CPP_14, LANG_CPP_17, LANG_CSHARP, LANG_JAVA_8,
  LANG_JAVA_14, LANG_JAVASCRIPT_NODE, LANG_GO, LANG_KOTLIN,
  LANG_PYTHON_3, LANG_PHP, LANG_R,
  LANG_RUBY, LANG_RUST, LANG_SCALA, LANG_SWIFT, LANG_TYPESCRIPT];
