# Getting Started with Mall Assassins

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The backend is built on top of Firebase. This document is intended to provide you the necessary details to get the mall assassins app code on your local machine and in a state ready for you to run it, contribute your own changes to the code, and integrate those changes into the main version of the app. 

## Setting Up Github for Collaboration

The first step to getting started here is to set up your Github account and set up git on your local machine. DO NOT move on to the next section until you have created a pull request.

<details>
  <summary>For Git Aficionados</summary>
  
If you are already familiar with Github and git workflows and are ready to get going, go ahead and fork this repository and then git clone the fork onto your local machine. Make some basic change to this README.md file and submit a pull request (PR) against the main branch of this current repository to prove that you know how these things work. Your PR will get rejected, and once it does, go ahead and move on to the section on setting up npm.
</details>
   
<details>
  <summary>For Less Experienced Git Users</summary>
First, try to get a general overview of what git and Github are - ask the person next to you what they are and why they're useful. Make sure you understand the following terms in particular:
- git clone
- git pull
- git branch
- git add
- git commit
- fork
- pull request
- merge conflict

Once you feel like you have a decent grasp of these ideas, go ahead and move on to the [github-setup.md](/github-setup.md) file to actually do the setup.
</details>

After finishing the steps in the section above, make sure you also set up this repository as a remote branch so that you can pull the latest changes to the app at all times. To set this repository as a remote branch, run

```git remote add upstream git@github.com:Octophi/mall-assassins.git```

Then in the future, any time you want to get the latest changes from this repository, run 

```git pull upstream main```

## Setting up npm 

Our project is built in JavaScript using a lot of framework code and special packages and so on. Thankfully, you don't have to go through and download all the individual packages and things that you need in order to get this package to run - that's the beauty of npm. npm (Node Package Manager) is a package manager for JavaScript, widely used for managing and sharing open-source JavaScript libraries and tools. It is often used in web development to install, manage, and distribute packages, which are code modules or libraries that can be used in JavaScript applications (such as ours). To get started on this project, the only thing you need to do is install npm and run the appropriate commands to get your project setup.

We recommend using a Node version manager in order to install Node and npm. This should make your life easier in the long run. Follow our tl;dr instructions below:

<details>
  <summary>Mac Users</summary>

  
1. **Open Terminal**

- Open the Terminal app on your macOS. You can find it in the "Utilities" folder within the "Applications" folder or by searching for "Terminal" using Spotlight.

2. **Install NVM with Curl**

- In the Terminal, run the following `curl` command to download and install NVM:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

   This command will download the NVM installation script from the official NVM repository and execute it.

- Follow the on-screen instructions in the Terminal to complete the NVM installation.

3. **Verify NVM Installation**

- After the installation is complete, you can verify that NVM was installed successfully by checking the NVM version. Run:

   ```bash
   nvm --version
   ```

   This should display the version of NVM that you installed.

4. **Install Node.js and npm**

- Now that NVM is installed, you can use it to install Node.js and npm. For example, to install the latest LTS (Long-Term Support) version of Node.js, run:

   ```bash
   nvm install --lts
   ```

   This command will download and install the latest LTS version of Node.js. NVM allows you to install multiple Node.js versions, and you can switch between them as needed.

5. **Verify Node.js and npm Installation**

- To verify that Node.js and npm have been installed, you can check their versions. Run:

   ```bash
   node --version
   ```

   This command will display the version of Node.js. If it gives you something that looks like a version number, it's probably fine.

   To check the version of npm, run:

   ```bash
   npm --version
   ```

   This command will display the version of npm. If it gives you something that looks like a version number, it's probably fine.

That's it! You've successfully installed NVM, Node.js, and npm on your macOS using the Terminal and `curl`. You can now use Node.js and npm for your development projects.

** Disclaimer: I had ChatGPT write these steps, I didn't test any of them so if they don't work then yell at me and I'll fix them. 
</details>

<details>
  <summary>Windows Users</summary>



1. **Download and Run the NVM Setup Script**:

   Go to https://github.com/coreybutler/nvm-windows#readme and click "Download Now" in the README. Click on the .exe file to install. Open the downloaded file to start the Setup wizard. 

2. **Follow the Installation Wizard**:

   The NVM for Windows Setup wizard will appear. Follow the on-screen instructions to complete the installation. This typically involves agreeing to the license terms, choosing an installation directory, and confirming the installation.

3. **Finish the Installation**:

   After the installation is complete, you will see a confirmation screen. Click "Finish" to exit the installer.

4. **Open a New PowerShell Window**:

   To start using NVM, you need to open a new PowerShell window. You can do this by searching for "PowerShell" in the Windows Start menu and opening the application.

5. **Verify NVM Installation**:

   In the new PowerShell window, you can verify that NVM is installed by running the following command:

   ```powershell
   nvm version
   ```

   This should display the version of NVM that you installed.

6. **Install Node.js**:

   To install a specific version of Node.js, you can use NVM. For example, to install the latest LTS (Long-Term Support) version of Node.js, run:

   ```powershell
   nvm install --lts
   ```

   This command will download and install the latest LTS version of Node.js.

8. **Switch Between Node.js Versions**:

   You can use NVM to switch between different versions of Node.js. For example, if you want to switch to the LTS version you just installed, run:

   ```powershell
   nvm use --lts
   ```

   This sets the LTS version as the active Node.js version.

Now you have NVM for Windows installed, and you can easily manage different versions of Node.js on your machine using PowerShell. You can use the same steps to install additional versions of Node.js or switch between them as needed for your development projects.

** Disclaimer: I had ChatGPT write these steps, I didn't test any of them so if they don't work then yell at me and I'll fix them. 

</details>

### Getting an IDE (recommended)

An IDE (Integrated Development Environment) is a software tool that provides programmers with a digital workspace, code editing capabilities, helpful tools, and project management features to make the process of writing, testing, and managing computer programs more efficient and organized. Basically, it helps you code by keeping you organized and giving you neat little tools. I'd recommend developing in an IDE. Which one is  up to you, but if you're completely new to this I'd just go ahead and use Visual Studio Code (VSCode) - it's lightweight, pretty intuitive, and enough people use it to help you out. You can find any standard doc online to install it, there's little to set up here so I won't bore you with details.

### Starting Development

Ok, you're almost ready to write code! At this point, you should have npm installed and you should have a folder somewhere on your machine with the code for this mall-assassins repository. 
1. In your terminal, navigate to the directory where you put this mall-assassins code (note: if you don't know how to navigate in the terminal, ask ChatGPT how to navigate in the terminal in Windows/MacOS).
2. Once you're in the right folder, run ```npm install```. This may take a bit as it will install all the necessary packages to get your code up and running. 
3. After your install finishes, go ahead and run ```npm start```. This should automatically open a browser tab at URL localhost:3000 and it should display something that looks like a basic screen with a "Join Room" and "Host Room" option.
4. **Profit**. At this stage, you can make changes to the code and it will dynamically update your local server so you can see changes you're making to the app in real time. 

If you made it this far, congratulations, you have made it through the setup and are ready to start coding! At this point, check in with the lead of your team on what you can start working on.

## Setting Up Firebase Emulator

You will eventually want to write backend code, including server-side code. For this, you'll want to use Firebase Emulator to test your code locally so you don't have to deploy things directly to production and you can instantly see the effects of the changes you are doing. The setup for this is relatively minimal:

1. Install Firebase CLI. ```npm install -g firebase-tools```
2. To start the emulator, run ```firebase emulators:start```

Note: You need a version of Java at least as new as Java 11 in order to run the emulator.

## Resources

Below is a list of useful tutorials if you want to familiarize yourself with the technologies used in this app. 

### ChatGPT
- If you can't tell from how I wrote this doc, I think ChatGPT is great for projects like this where you're trying to learn lots of new stuff on the fly (and there's no stakes so there's no cheating concerns).
- If you have any kind of basic question that you just want an answer for, I think a completely acceptable workflow is to ask ChatGPT, see if you understand it, and if not, find someone who looks knowledgeable and ask them to explain what ChatGPT told you. 

### Basic Web Development
- [Basic blog on web dev]([url](https://www.freecodecamp.org/news/html-css-and-javascript-explained-for-beginners/))

### React
- [React documentation](https://reactjs.org/): Basic documentation
- [Learn React Tutorial](https://react.dev/learn): I'd recommend you start here if you've never seen React before

### Firebase
- [AngularFire CodeLab]([url](https://firebase.google.com/codelabs/firebase-web#0)): This is using Angular rather than React but you can get some basic ideas of how to call into Firebase from JavaScript
