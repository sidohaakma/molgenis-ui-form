#!/bin/bash

yarn install
yarn build
yarn unit
yarn e2e -- --env ci
