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

**4. Clone a Repository:**

- Once you have a GitHub account and Git installed, you can clone our repository from GitHub to your local machine.

- Go to the [GitHub repository]([url](https://github.com/Octophi/mall-assassins/tree/main)) you want to clone in your web browser.

- Click on the "Code" button (green or blue) and copy the URL provided (it can be either an HTTPS or SSH URL).

Clone Repository

- Open your command line or terminal and navigate to the directory where you want to clone the repository.

- Use the `git clone` command followed by the URL you copied from GitHub. For example, to clone a repository with an HTTPS URL:

```bash
git clone https://github.com/username/repository-name.git
```

Or, if you have set up SSH keys with your GitHub account, you can use the SSH URL:

```bash
git clone git@github.com:username/repository-name.git
```

- Git will download the repository to your local machine.

That's it! You've signed up for a GitHub account, installed Git, configured Git with your name and email, and cloned a repository from GitHub to your local machine. You can now work with the repository, make changes, and push them back to GitHub when needed.
