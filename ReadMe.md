# Aspire App
## Take Home Assignment for recruitment of Senior Mobile Engineer

This project has been designed as per specifications shared in [SR_Doc.pdf](https://github.com/MohMaya/aspire-app-assignment/blob/master/SR_Doc.pdf)
Some of the features of the app as of writing of the Readme are as follows:
- Dumb APIs from APIMocha integrated [500 requests/24 hr period]
- Multiple Users with different cases like Currency or Card Details that can be retrieved by tapping on the `Load Another Card`
- Custom Splash Screen
- UI Tested on Devices of highly varying screen sizes [Screenshots shared in a later section]

## Running the App

This is an expo managed project instead of react-native cli project. Primary reason for making this decision is the ease and quickness with which the project could be made up and running and no native code change was involved.
1. Install Node[>12.0] from official website for your development device.
2. Install other pakcages to run expo-cli as per instructions shared [here](https://docs.expo.dev/get-started/installation/])
3. On your terminal go to a folder where you would like to test this project. Execute the following command to initialize a blank repo.
```sh
git init
```
4. Then clone this repository in your initialized repo.
```sh
git clone https://github.com/MohMaya/aspire-app-assignment.git
```
5. Now run the following commands to set up Node Modules required for the project.
```
npm install
```
6. Start the expo server by typing
```
expo start
```
- This wll start the metro bundler service. 
- Now, to test on `emulator` make sure your environment variables are set up as per recommendations here for 
-- `iOS`(https://docs.expo.dev/workflow/ios-simulator/) 
-- `Android`(https://docs.expo.dev/workflow/android-studio-emulator/)
- To test on `physical devices`, follow the guide as shared [here](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and)


> You can generate Android Project folder and iOS xcodeproject by following the 
> instructions [here for iOS](https://docs.expo.dev/bare/hello-world/#ios-configuration) and [here for Android](https://docs.expo.dev/bare/hello-world/#android-configuration)