# About the project

A test application for advanced training in the field of architecture and technology. I don't like this approach to architecture, but I decided to try it to identify the pros, cons and unresolved problems. By the way, halfway through the completion of the project, I already regretted that it was not FSD, because during the development process I have to invent and rebuild a lot, not counting other problems. **To be more precise, the greater emphasis in architectural terms is on the Redux Toolkit, because there I made a good implementation of dependency injection (API singletons) in the "extra" property, and also well separated listeners, thunks and reducers, so that in the future you can easily scale the code base and expand existing functionality.** As for React, this is primarily a story about **a unidirectional flow of module dependencies**, then it's working with validations (there was a keen desire to do something with them), and as an experiment I chose a modular architecture, if you can call it that. **I consider this version of the architecture as a stripped-down version of FSD**. By the way, this may be suitable for small projects, although for them, imho, it is easier to take a regular dump of components. **I didn't bother much about the design here, the project is focused on the technical aspect.**

**Stack: React, Redux Toolkit( with thunk, listener middlewares; with persistent storage ), React Hook Form, Zod, Antd**

P.S: In general, cross-import is prohibited in the project, but it is permissible only if you need to see dumb components that perform only part of the user interface without integration with the store.

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
