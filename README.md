# whats-your-archetype

Front-end for http://archetype.individualogist.com

## Setup

### Prerequisites

1. Install [NodeJS](https://nodejs.org/en/)

### Setup

1. Clone this repo

    $ git clone <...>
    $ cd <repo-dir>

2. Run

    ```sh
    npm install
    ```

    * Build for production

        This will compile and build the static site:

        ```sh
        npm build
        ```

        The output will be in [`/build`](build) dir containing the `index.html` which can be served statically.

        If serving with Apache, root dir may be served directly using the provided [`.htaccess`](.htaccess) file which takes care of serving contents from the [`/build`](build) dir.

    * Run locally

        This should be used during development

        This will run [webpack-dev-server] which will compile, serve, and reload changes automatically on file modifications.

        ```sh
        npm dev
        ```

        The server runs at `http://localhost:8080`


## The code

The code mainly resides in [`./src`](src) dir.

It's a Single-Page-App built with [Preact] as the main front-end framework, and [Webpack] as the asset bundler.

All HTML is generated through javascript on client.

There's following main components:

* The main HTML: [`./src/shell.html`](src/shell.html)

    This is the main HTML which loads the entire app.

    Actually it's a template used by Webpack to generate [`./build/index.html`](build/index.html).

    It has a `<div id='app'></div>` in which the app loads

    There's a `<div id='loading'...>` which shows the spinner while the javascript loads and executes and the app loads.

    And it has some dynamic template code `<% htmlWebpackPlugin ... ` which injects the proper assets created by Webpack.

    **Add any\* tracking** code here just above the end of `</body>` tag. (\*only that which shall be added on all **pages**)

    **Do not add** plugins like facebook comments, they might not play well with the layout. They should be added into the app code (describe somewhere else).

* The main app entry: [`./src/app.js`](src/app.js)

    The is the main javascript entry file that loads the appropriate view and other components.

* Components: [`./src/components`](src/components)

    These are various components, like:

    * [`./src/components/header`](src/components/header)

        Easiest component to read/edit.

    Components like [`header`](src/components/header), [`footer`](src/components/footer) correspond directly to the parts that are visible on the page.

    * [`./src/components/tracking.js`](src/components/tracking.js)

        Here you might include  archetype-specific tracking codes.

        Although it only renders the basic markup, like

        ```js
        h.img('.clickmagick', {
          src: archetypes[props.quizData.archetype].clickmagick.imgSrc,
        }),
        ```

        It takes the actual data from [`archetypes`](src/data/archetypes.js) (described below)


* Data: [`./src/data`](src/data)

    * [`archetypes`](src/data/archetypes.js)

        Used, not only for the quiz, but also info like aweber and clickbank links corresponding to different archetypes.

    * [`questions`](src/data/questions.js)


* Assets: [`./src/assets`](src/assets)

    All asset files including images, audios, and transcripts.

    Assets are referenced by relative paths in the app code. Like in [`header`](src/components/header):

    ```js
    import logo from '../../assets/images/logos/large-text.png';
    // ...
    h.img({ src: logo }),
    ```

[preact]: http://preactjs.com
[webpack]: https://webpack.js.org
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server

