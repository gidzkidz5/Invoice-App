This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Video Demo: <URL>
#### Description:

# Full Stack Invoicing App 

## Overview

Welcome to the Full Stack Invoicing App! This application is designed to streamline invoice management for users. Whether you're a freelancer, small business owner, or just someone who needs to keep track of payments, this app has you covered. With features like creating, viewing, updating, and deleting invoices, as well as a dark and light theme for comfortable usage, and robust authentication using Next-Auth, managing your invoicing process has never been easier. This README will provide an in-depth understanding of the app's features, file structure, and design decisions.

## Features

1. **Invoice Management**: The core functionality of the app revolves around creating, viewing, updating, and deleting invoices. Users can easily add new invoices, make edits, mark them as paid, or delete them as needed.

2. **Authentication and Security**: The app employs Next-Auth for user authentication, ensuring a secure experience. Users can create accounts, log in, and log out. Additionally, users can change their passwords for improved security.

3. **Theme Customization**: Users can choose between a dark and light theme according to their preference. This feature not only enhances the visual experience but also caters to users' comfort and usability.

4. **Responsive Design**: The app is designed to be responsive, providing a seamless experience across different devices. It's optimized for both desktop and tablet usage.

## File Structure

1. **`client` Directory**: This directory contains the front-end code of the app.
   - `public`: Holds static assets and the HTML template.
   - `components`: Reusable UI components.
   - `pages`: Main page components for routing.
   - `styles`: Styling files (CSS or stylesheets).
   - `utils`: Utility functions or constants for frontend.

2. **`server` Directory**: This directory contains the back-end code of the app.
   - `pages/api/..`:	API routes for various functionalities.
   - `utils`: Utility functions or configuration for backend.

## Design Choices

1. **Next-Auth for Authentication**: The decision to use Next-Auth was driven by its simplicity and robustness. It provides secure authentication out of the box, reducing the complexity of implementing authentication from scratch.

2. **Dark and Light Theme**: The inclusion of a dark and light theme was motivated by user preferences and the growing need for accessibility. Users can choose a theme that suits their comfort and environment.

3. **Responsive Design**: The choice to make the app responsive reflects the importance of providing a consistent experience across devices. This design choice acknowledges the diverse ways users access the app.

4. **Separation of Frontend and Backend**: The clear separation between the client and server code improves maintainability and scalability. This design choice adheres to best practices for building full-stack applications.

## Conclusion

The Full Stack Invoicing App empowers users to manage their invoices effectively while prioritizing security, customization, and usability. The combination of Next-Auth, theme options, and responsive design makes this app a versatile tool for users across different contexts. The detailed file structure and design choices ensure that the app is well-organized, maintainable, and adaptable for future enhancements.

Feel free to explore the codebase, experiment with the app, and discover how it can simplify your invoicing process. Your feedback and suggestions are greatly appreciated as we continue to refine and improve the Full Stack Invoicing App.





