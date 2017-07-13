# whats-your-archetype

Front-end for http://archetype.individualogist.com

## Setup

### Prerequisites

1. Install [NodeJS](https://nodejs.org/en/)

### Setup

1. Clone this repo

    $ git clone <...>
    $ cd <repo-dir>

2. Install dependencies

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

## Quick recipes

* Run locally to test things out

    Just see "Run locally" above.

* Make some changes and upload to server

    1. Make changes
    2. Make a git commit `git commit -a -m 'change description'`
    3. Run `npm build`
    4. Make a git commit again along with the build\*: `git commit -a -m built on <the date>`
    5. Push to upstream: `git push`

    <sup>\*Adding `build` to version control was necessary at the time. Feel free to build on server if possible, and use "bfg repo cleaner" to clean build from the history</sup>

    Currently the server is set up in a way that it periodically (1 min interval cron job) does a `git pull` and is therefore automatically showing the latest pushed changes.

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

    * ... see below for rest of the components.

* Data: [`./src/data`](src/data)

    * [`archetypes`](src/data/archetypes.js)

        Used, not only for the quiz, but also info like aweber and clickbank links corresponding to different archetypes.

    * [`questions`](src/data/questions.js)

        Used in the [`./src/components/quiz`](quiz) component


* Assets: [`./src/assets`](src/assets)

    All asset files including images, audios, and transcripts.

    Assets are referenced by relative paths in the app code. Like in [`header`](src/components/header):

    ```js
    import logo from '../../assets/images/logos/large-text.png';
    // ...
    h.img({ src: logo }),
    ```

* Tracking codes

    Some tracking codes lie outside the app, in the main [`shell.html`](src/shell.html) while others are are in the app itself in [`components/tracking.js`](src/components/tracking.js)

    * Facebook Pixel

        This is in the [`shell.html`](src/shell.html). Pretty straightforward to edit it.

    * Clickmagic

        This is *rendered* inside [`components/tracking.js`](src/components/tracking.js) (as an `img` element), but the actual `src` for the image comes from [`data/archetypes.js`](src/data/archetypes.js) where every archetype has a `clickmagick.imgSrc` property.

    In the same [`data/archetypes.js`](src/data/archetypes.js) you'll also find properties  Aweber, and Clickbank which control their respective components elsewhere in the app (if not mentioned in the doc, just search the codebase for properties, like `aweber.meta_web_form_id` and you'll find the relevant components that use these properties).

* Components (cont.)

    The components are rendered from the main [`app`](src/app.js) and usually report back (like after finishing the quiz, filling out a form) to the app with their data which is consolidated into the **app's `state`** which is then passed back down to the components which they can access as **`this.props`** (this also helps them keep their own `state` separate from the app's state)

    * [`./src/components/quiz`](src/components/quiz)

        The quiz. Takes the main question/answer data from [`questions`](src/data/questions.js). Consolidates all data and reports back to the app as `quizData` which can later be used in other components as `this.props.quizData`, or absence of which can be used as an indicator that quiz hadn't been completed yet (used in other components to redirect back to /quiz or restrict access to certain parts)

    * [`./src/components/form`](src/components/form)

        The Aweber form. Gets its data from [`data/archetypes.js`](src/data/archetypes.js) under `aweber` key. Collects `name` and `email`. The data is reported back to the app as `formData`.

    * [`./src/components/report-intro`](src/components/report-intro)

        The `/intro` page that displays basic info about the archetypes. And this also displays the above mentioned [`form`](src/components/form) from within it.

    * [`./src/components/report-free`](src/components/report-free)

        The `/reading` page that is the main text slider. It basically takes the appropriate [audio assets](src/assets/audios) (based on `quizData.archetype`) and plays the audio with its corresponding transcript.

        The audio is played in the standard `<audio>` element.

        The transcript is parsed, and the `time` and `text` is extracted which is used to sync it with the audio element's `currentTime` `ontimeupdate`.

        The text is parsed with [Mustache.js](https://github.com/janl/mustache.js/) taking the variables from `quizData` and `formData` and some specialized functions such as `displayImage`. A normal text syntax `Hello {{name}},` gets rendered with the appropriate data (`formData.name` in this case). A function:

        ```
        {{#displayImage}} {path:'images/archetype-icons/caregiver.png', fadeIn: true} {{/displayImage}}
        ```

        This calls:

        ```
        displayImage({path:'images/archetype-icons/caregiver.png', fadeIn: true})
        ```

        Without getting into teh details of what `displayImage` does, it basically displays that image, and keeps it displayed unless either it's called with another image, or with `fadeOut: true`, or the audio is ended.

        You may also use nested template syntax:

        ```
        {{#displayImage}} {path:'images/archetype-icons/{{archetype}}.png', fadeIn: true} {{/displayImage}}
        ```

        So changing the slider images is actually controlled from within the transcripts themselves. The `displayImage` function, and the component itself takes care of actually displaying the image.


[preact]: http://preactjs.com
[webpack]: https://webpack.js.org
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server

