Foxy Installer
-----------
This is an installer which makes PKG-file.


### Install Software
First, clone this repo:
```
$ git clone https://github.com/tamarahills/foxyinstaller.git
```

and update git submodules
```
$ git submodule update
```

### Install Dependencies
```
$ npm i
```

Now you can use `./commander.js` script which helps to make package automatically

### Install Vendors
This command makes preparations for building pkg and installs the following modules:
- node modules in submodules
- homebrew binary to .homebrew direcrory
- portaudio sox opus-tools libraries via homebrew with
- node 7.10.1 binaries

```
$ ./commander.js vendors install
```

### Make Config
Don't forget to make config for extension sign.
```
$ cp .env.example .env
```

There are two params:
- **AMO_JWT_ISSUER** - the API key (JWT issuer) from addons.mozilla.org needed to sign the extension. This should always be a string.
- **AMO_JWT_SECRET** - the API secret (JWT secret) from addons.mozilla.org needed to sign the extension. This should always be a string.

You can learn about it in detail [here](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Signing_your_extension_for_distribution)


### Tests
Before building extension you MUST run tests:
```
$ ./commander.js extension test or npm test
```

### Signing Extension
It's very simple:
```
$ ./commander.js extension sign
```

When sign in passed you could find xpi-extension in `Library/Application Support/Mozilla/Extension/{ec8030f7-c20a-464f-9b0e-13a3a9e97384}` folder


### Build pkg-file
I's also very simple:

```
$ ./commander.js extension build
```

The latest command makes pkg-file in `build/` folder.
