# Spidr Air Fryer Interest Form

A lightweight React application that embeds a branded interest form—perfectly sized for injecting into the bottom of Spidr Design’s landing page. Captures:

- **First & Last Name**  
- **Phone Number** (3-3-4 segmented input with auto-advance & backspace navigation)  
- **Email Address** (HTML5 validation + regex)  
- **Guess the Air Fryer’s Cost** (numeric only, on-blur currency formatting)  
- **Secret 16-digit Spidr PIN** (4×4 masked segments with “Show PIN” toggle)  

On submit, the form prints all collected data to the browser console.

---

## Table of Contents

1. [Live Demo](#live-demo)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
4. [Features & Usage](#features--usage)     
6. [Questions](#questions)  

---

## Live Demo

> **Test the live demo at the link provided below!**  
> `https://bencb03.github.io/Spidr-Coding-Challenge`

---

## Tech Stack

- **React** (Create React App)  
- **React Hooks** (`useState`, `useRef`)  
- **CSS** (Flexbox layout, custom theming)  
- **HTML5 Form Validation** (`type="email"`, `pattern`, `required`)  
- **Vanilla JS** for input masking & formatting  

---

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Bencb03/Spidr-Coding-Challenge.git
   cd Spidr-Coding-Challenge

2. **Install dependencies**

   ```bash
   npm install

3. **Run the developement server**

   ```bash
   npm start

4. **Open http://localhost:3000 to view in your browser**

## Features & Usage

### Name Fields
- **First & Last Name**: Two side-by-side inputs, each taking 50% of the row for a clean, responsive layout.

### Phone Number
- **Segmented 3-3-4**: Three inputs (3 digits, 3 digits, 4 digits) styled uniformly.
- **Auto-advance** to the next segment when you hit the max length.
- **Backspace navigation**: Press backspace on an empty segment to jump back to the previous one.

### Email Address
- Built-in **HTML5 validation** via `type="email"` and a regex `pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"`.
- Native browser tooltip for invalid formats.

### Guess the Air Fryer’s Cost
- Sanitizes every keystroke to strip non-digits and at most one decimal point.
- Formats into U.S. currency (e.g. `$1,234.56`).
- Strips formatting, leaving raw digits for easy editing.

### Secret 16-digit Spidr PIN
- Four 4-digit inputs, masked by default (`type="password"`).
- **Show PIN** toggle reveals the digits.
- Auto-advance and backspace navigation just like the phone segments.


---

## Questions

If you encounter any issues or have suggestions, please [open an issue](https://github.com/Bencb03/Spidr-Coding-Challenge/issues) or contact **Benjamin Bryant** at Bencb03@gmail.com.




