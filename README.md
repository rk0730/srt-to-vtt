# SRT to VTT Converter

A Node.js utility to convert SRT subtitle files to VTT format while preserving folder structure.

## Features

- Converts .srt and .txt subtitle files to WebVTT (.vtt) format
- Maintains original directory structure in output
- Processes files recursively in nested folders

### Credits / Acknowledgements
This project is **inspired by** 
[`mafintosh/srt-to-vtt`](https://github.com/mafintosh/srt-to-vtt)
by Mathias Buus, licensed under the MIT License.

## Installation

1. Install nodejs and npm
2. Clone this repository
3. Install dependencies:
```
npm install
```

## Usage
* convert folder
```
node main.js <folder path>
```

* output the result of a single file conversion
```
npx srt-to-vtt <filepath>
```