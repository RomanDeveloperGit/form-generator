# Form Generator

## Project Overview

Welcome to Form Generator, my experimental application designed for advanced training in architecture and technology. Despite some disadvantages of the chosen approach, this project is only a testing ground for a more thorough identification of the pros, cons, unresolved problems of such a design option and attempts to solve them. Upon completion of the project, I can say that I most likely will not use this approach in my new projects

**Key Highlights:**

- ** Focus on the Redux Toolkit:** In this project, considerable attention is paid to the Redux Toolkit. I liked that I was able to implement the DI pattern by embedding the API singletons in the Thunk API and Listener API. Listeners, thunks and slices are neatly separated, which makes it easier to scale the codebase and expand it further.

- **Unidirectional Flow:** The project follows a unidirectional flow of module dependencies. The application core can use modules, modules are not allowed to use the core. There are common layers - libs, constants. You can use them from any part of the application.

- **Modular Architecture:** Somewhat similar to a very shortened version of FSD, some principles are taken from there.

- **Technical Focus:** This project prioritizes technical aspects over design aesthetics. Design considerations take a backseat, with a primary focus on architectural and technical choices.

**Note:** Cross-imports are discouraged in the project, with exceptions for "dumb" components that handle specific parts of the user interface without integration with the store.

## Technology Stack

The project utilizes the following technologies and libraries:

- React
- Redux Toolkit (including thunk, listener middlewares, and persistent storage)
- React Hook Form
- Zod
- Ant Design (Antd)
- Sentry

<br>

# Vite's descriptions

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
