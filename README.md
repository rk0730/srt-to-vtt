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

### Optional Patch

By applying the included patch, the initial "WEBVTT FILE" header will be changed to just "WEBVTT" in the converted VTT files.

To apply the patch:
```
npx patch-package
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