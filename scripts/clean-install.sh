#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🧹 Deep Clean & Fresh Install 🚀     ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}\n"

# Step 1: Kill Metro Bundler
echo -e "${YELLOW}[1/8]${NC} ${GREEN}Killing Metro Bundler...${NC}"
pkill -f "react-native.*start" || true
pkill -f "metro" || true
lsof -ti:8081 | xargs kill -9 2>/dev/null || true

# Step 2: Clean root directory
echo -e "${YELLOW}[2/8]${NC} ${GREEN}Cleaning root directory...${NC}"
rm -rf .jso node_modules Gemfile.lock
rm -rf $TMPDIR/react-* $TMPDIR/metro-* $TMPDIR/haste-map-* 2>/dev/null

# Step 3: Clean iOS
echo -e "${YELLOW}[3/8]${NC} ${GREEN}Cleaning iOS...${NC}"
cd ios
rm -rf build Pods .xcode.env.local Podfile.lock tmp.xcconfig
cd ..

# Step 4: Clean Android
echo -e "${YELLOW}[4/8]${NC} ${GREEN}Cleaning Android...${NC}"
cd android
rm -rf build .gradle
cd app
rm -rf development staging production build .cxx
cd ../..

# Step 5: Clean Xcode Derived Data (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}[5/8]${NC} ${GREEN}Cleaning Xcode Derived Data...${NC}"
    rm -rf ~/Library/Developer/Xcode/DerivedData
else
    echo -e "${YELLOW}[5/8]${NC} ${YELLOW}Not macOS, skipping Xcode Derived Data clean...${NC}"
fi

# Step 6: Clean Watchman
if command -v watchman &> /dev/null; then
    echo -e "${YELLOW}[6/8]${NC} ${GREEN}Clearing Watchman...${NC}"
    watchman watch-del-all 2>/dev/null || true
else
    echo -e "${YELLOW}[6/8]${NC} ${YELLOW}Watchman not found, skipping...${NC}"
fi

# Step 7: Install all dependencies (Node, Ruby, iOS Pods)
echo -e "\n${YELLOW}[7/8]${NC} ${GREEN}Installing dependencies...${NC}"
yarn install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Yarn install failed!${NC}"
    exit 1
fi

bundle install || true

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${GREEN}Installing iOS CocoaPods...${NC}"
    cd ios
    bundle exec pod install || pod install
    cd ..
fi

# Step 8: Clear Metro Bundler Cache
echo -e "\n${YELLOW}[8/8]${NC} ${GREEN}Clearing Metro Bundler cache...${NC}"
rm -rf $TMPDIR/metro-* $TMPDIR/react-* $TMPDIR/haste-map-* 2>/dev/null || true

echo -e "\n${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ Clean & Install Complete! 🎉      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}\n"
echo -e "${GREEN}Your project is ready to build!${NC}"
echo -e "${YELLOW}Run: ${NC}yarn ios ${YELLOW}or${NC} yarn android\n"
