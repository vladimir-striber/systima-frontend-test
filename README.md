# systima-vue-app

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Technologies

TypeScript
The app uses TypeScript for type safety.

Vue Router
The app uses Vue Router to handle navigation between different views.

Pinia Store
The app uses Pinia for centralized state management.

Vuetify
The app uses Vuetify for UI components and responsive Design.

### Implementation

I created two View components (UserListView.vue and UserDetailsView.vue) which are 
representing containers (container pattern), and I did all the logic related
to communication with the server within those two components.
Communication with the server is done with axios library within Pinia store actions.

Other components (UserListTable.vue and UserDetailsCard.vue) should be used only as
a presentational components with just some simple logic related to the
data they present.

I created some reusable components (AppButton.vue and AppIconButton.vue) which are
just a dumb components - they just receive data as props and emit events, noting more.

### Challenges faced

Vuetify components and themes
Issues with the implementation of the skeleton loading for both major components.
I spent most of the time creating this UI feature.
Issues with some types.