Development notes
=================

### Link
To develop locally, you probably want to make the expo packages available 
globally, so:

    $ make link

### Publishing
To publish all packages together:

    $ make publish

### Updating versions
Bumping build, minor, major versions respectively:

    $ make bump
    $ make bumpm
    $ make bumpM

### Working on gh-pages

Create `site/` from gh-pages:

    $ make site

Open it:

    $ python -m SimpleHTTPServer
    $ open http://localhost:8000

Features
--------

To do:

- Error
- --quick mode
- Timestamps in production log
