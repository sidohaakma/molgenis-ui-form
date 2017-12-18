#!/bin/bash

yarn install
yarn build
yarn test --env ci
