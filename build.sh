#!/bin/bash

build() {
    echo 'Building TESTNET React App to Ext'

    rm -rf build/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    export REACT_APP_USE_TEST="TRUE"


    react-scripts build

    echo 'Done!'

    notify-send -u critical Metacon "TESTNET Build has ended"
}

build