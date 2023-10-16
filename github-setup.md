**1. Sign Up for a GitHub Account:**

- Go to the GitHub website: [https://github.com](https://github.com).
- Click on the "Sign up" button in the top right corner.

GitHub Sign Up

- Fill in your information, including your username, email address, and password.
- Click the "Create account" button.
- Follow the verification steps, which may include verifying your email address.
- Complete the onboarding process, where you can customize your GitHub experience.

**2. Download and Install Git:**

- If you don't already have Git installed on your local machine, you can download it from the official website: [https://git-scm.com/downloads](https://git-scm.com/downloads).
- Select the appropriate download for your operating system (Windows, macOS, or Linux).
- Follow the installation instructions for your operating system.

**3. Configure Git:**

After you've installed Git, you should configure it with your name and email. Open your command line or terminal and run the following commands, replacing `"Your Name"` and `"your@email.com"` with your actual name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

**4. Fork the Repository **

Go back to our [main Github page](tinyurl.com/hacknew23). Click the "Fork" button in the upper right corner of the repository page. This will create a copy (fork) of the repository in your own GitHub account.

**5. Clone your forked Repository:**

- You should be on the page for the forked GitHub repository you just created

- Click on the "Code" button (green or blue) and copy the URL provided (it can be either an HTTPS or SSH URL).

- On your local machine, open your command line or terminal and navigate to the directory where you want to clone the repository.

- Use the `git clone` command followed by the URL you copied from GitHub. For example, to clone a repository with an HTTPS URL:

```bash
git clone https://github.com/username/repository-name.git
```

Or, if you have set up SSH keys with your GitHub account, you can use the SSH URL:

```bash
git clone git@github.com:username/repository-name.git
```

If you haven't set up SSH before, go ahead and just use HTTPS, it's less setup.

- Git will download the repository to your local machine.

**6. Make your first commit **

- On your local machine, navigate to the directory where your project is.
- Open the README.md file and type something in it to edit it.
- On your local terminal, type `git status` to see which files have been modified.
- Use `git add` to stage the changes you want to commit. For example, to stage all changes, you can use `git add .`. If you only want to stage specific files, you can list them individually after `git add`.
- Use `git commit` to create a commit with a descriptive message. The message should explain the purpose of the commit. For example:

   ```bash
   git commit -m "Add new feature X"
   ```
- Congrats, you've made your first git commit!

**7. Make your first PR **

Now for your code to be available for others to use, you need to push it to your remote repository in GitHub, which will update the remote state with your changes. 

- Use the `git branch` command to see what your current branch is. It should be highlighted in your terminal. 
- Use the `git push` command:

   ```bash
   git push origin your-branch-name
   ```

   Replace `your-branch-name` with the name of the branch you're working on.
- Congrats! Your changes are stored on the remote repository, ie, no longer just on your own machine!

**8. Create a Pull Request**:
- Now we want your changes to be in the main app which everyone is using. To do so, you will create a pull request. 

   1. Visit the [main repository page](tinyurl.com/hacknew23).
   2. Click on the "Pull Requests" tab.
   3. Click the "New Pull Request" or "Compare & pull request" button.

   The service will detect your changes and let you create a pull request with a title and description. Explain what your changes do and why they should be accepted.

   4. Review the changes, add comments or context, and make sure everything looks good.

   5. When you're ready, click the "Create Pull Request" button.

**9. Review and Merge**:
- Your pull request will be reviewed by the project maintainers. They may ask for changes, provide feedback, or approve the request.

- If your pull request is approved, it can be merged into the main branch of the repository.

And that's it! You've successfully added your changes, created a commit, pushed the commit to a remote repository, and created a pull request for your contribution. Your code changes will now be reviewed and, if accepted, integrated into the project.

That's it, you've done it! You're now (almost) ready to get started actually coding. Go back to the main README.md doc and finish setting up the other components.
