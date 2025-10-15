# WorkHeat - Frontend

## Why I Built This Project

- I often found myself taking notes on my computer, but the process was neither aesthetically pleasing nor effective for keeping track of completed tasks. I needed a more comprehensive tool for monitoring my work.

- Taking inspiration from the GitHub contribution graph, I envisioned a tool that could easily generalize and visualize my daily learning/working process. 

- It would allow me to quickly see what I accomplished during specific timeframes.

## Overview

- WorkHeat is a modern web application designed to visualize your daily work progress using a GitHub-style heatmap. It allows you to log, view, and analyze the time you spend working or studying each day.

- This repository hosts the frontend part of the project, built with React, TypeScript, and Material UI (MUI). It connects to a robust RESTful API developed using Spring Boot and PostgreSQL.

- The core idea of WorkHeat:

    - A "commit" corresponds to a specific period of time dedicated to a task (including the total time spent and a description).

    - Progress and time are visually tracked through a GitHub-alike contribution map.

    - Each cell on the map represents a day, showing the total time spent learning/working and the individual "commits" made that day.

- Essentially, it's a contribution graph, but instead of tracking code pushes, it tracks dedicated study/work time.

## Features

- **Log Tasks/Commits**: Easily add new tasks or "commits" with a custom date and the time spent on them.

- **Visualize Intensity**: A GitHub-like heatmap clearly shows your daily working intensity.

- **Detailed View**: View the specific commits (tasks) you completed on any given day.

- **Commit Management**: Functionality to remove a previously logged commit.

- **Responsive Design**: Optimized for seamless use on both desktop and mobile devices. 


## Tech Stack

- **Frontend**: React (with Vite)

- **Language**: TypeScript

- **UI Library**: Material UI (MUI)

## Running the Application

- **Note**: Public backend API deployed on Railway is used for demonstration and might expire. If the public API doesn't work, you can clone the WorkHeat backend project from the following link and modify the API endpoint in ``src/services/commitService.ts`` to local address (localhost) to use it.

```
https://github.com/dgbao03/workheat-backend
```

1. **Clone this repository**

2. **Install dependencies**

```
npm install
```

3. **Start the development server**

```
npm run dev
```

## Demonstration

![Pic 1](https://res.cloudinary.com/dw3x8orox/image/upload/v1760516470/Xnapper-2025-10-15-15.19.21_uhypcv.png)

![Pic 2](https://res.cloudinary.com/dw3x8orox/image/upload/v1760516469/Xnapper-2025-10-15-15.20.35_wkszxv.png)


## License

MIT License

Copyright (c) 2025 BaoDo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




