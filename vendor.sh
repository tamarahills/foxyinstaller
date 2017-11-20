#!/usr/bin/env sh

# PATH=${HOME}/homebrew/bin:$PATH
DIRNAME="$( cd $(dirname "$0"); pwd -P )"


# Cellar
if [ ! -d "root/Applications/Foxy.app/Resources/cellar" ]; then

  # Brew
  if [ ! -d ".homebrew/bin" ]; then
    git clone https://github.com/mxcl/homebrew.git .homebrew
    .homebrew/bin/brew update
    .homebrew/bin/brew install --build-bottle portaudio sox opus-tools
  fi

  mkdir -p root/Applications/Foxy.app/Resources/cellar
  cp -rf .homebrew/{bin,Cellar,lib,opt,var} root/Applications/Foxy.app/Resources/cellar
fi

# Node
if [ ! -d "root/Applications/Foxy.app/Resources/node" ]; then
  mkdir root/Applications/Foxy.app/Resources/node
  wget -qO- https://nodejs.org/dist/v7.10.1/node-v7.10.1-darwin-x64.tar.gz | tar xvz -C root/Applications/Foxy.app/Resources/node --strip-components=1
fi

if [ ! -f "root/Applications/Foxy.app/Resources/foxycli/resources/Hey_Foxy.pmdl.original" ]; then
  cp -rf .defaults/resources/* root/Applications/Foxy.app/Resources/foxycli/resources
fi

# Client Dependencies
if [ ! -d "root/Applications/Foxy.app/Resources/foxycli/node_modules" ]; then
  cd root/Applications/Foxy.app/Resources/foxycli
  npm i
  cd $DIRNAME
fi

# Extension Dependencies
if [ ! -d "foxyext/node_modules" ]; then
  cd foxyext
  npm i
  cd $DIRNAME
fi

exit 0
