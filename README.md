# AICPA - Log Parser Challenge

## General Description

This project parses a log file (`web.log`) containing entries with IP addresses and page URLs. It outputs:

1. A list of webpages with the most page views, ordered from most to least.
2. A list of webpages with the most unique page views, ordered from most to least.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository**:
   ```shell
   git clone https://github.com/aa-tt/aicpa_log_parser.git
   
   cd aicpa_log_parser
   ```

2. **Install Dependencies**:
   ```shell
   npm install
   ```

3. **Compile TypeScript**:
    ```shell
    npx tsc
    ```

## Execution Instructions

1. **Run the Script**:
    ```shell
    node logParser.js
    ```
    Example Output:
    Webpages with Most Page Views:
    /contact 120 visits
    /home 110 visits
    /products/1 95 visits
    ...    
    Webpages with Most Unique Page Views:
    /products/2 50 unique views
    /index 45 unique views
    ...

2. **Run Tests**: Install jest and its TypeScript types:
    ```shell
    npm install --save-dev jest @types/jest ts-jest
    
    npx ts-jest config:init
    ```

    Run the tests:
    ```shell
    npx jest
    ```

    Example Test Output:
    _PASS  ./logParser.test.ts
    should correctly calculate total and unique page views (10 ms)_