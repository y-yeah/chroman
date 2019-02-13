<div align="center">
    <img src="./img/chromanTileIconOrigin.png" align="center" width="100%">
</div>
<h1 align="center" >Chroman</h1>
<div align="center">👻👻👻👻👻</div>
<div align="center">
    <br/>
    <h3>Chrome Loading Time Checker</h3>
    <p>Built by 
        <a href="https://github.com/y-yeah">Yuma Sumi</a>
    </p>
    <p><strong>ver 1.0</strong> as of 13 Feb 2019</p>
    <br/>
</div>
<div align="center">
    <div >
        ***********************************************************************
        <p>This was created during my time as a student at <a href="https://codechrysalis.io">Code Chrysalis</a>.</p>
        Will be released soon at 
        <a href="https://chrome.google.com/webstore/category/extensions">Chrome Web Store</a> 🎉🎉
        <br/>
        ***********************************************************************
    </div>
</div>
<br/>
<div align="center">

**Chroman** is the Chrome Extension that tells you URL, total page size, connection speed, and the loading time of the webpage with a sexy voice message.

[Overview](#1-overview)&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;[Architecture](#2-architecture)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Setup](#3-setup)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Contributions](#4-contributions)

</div>

---

# 1. Overview

Chroman tells you URL, total page size, connection speed, and the loading time of the webpage with a sexy voice message.
It is the simple website speed checker on Chrome.

By clicking Chroman, you can check out the following information:

1. URL of the current tab
2. Connection type and Effective connection type of the current network (if defined)
3. Approximate total page size (except for asynchronous page rendering)
4. Connection speed when you loade that tab page
5. Loading time of the current tab

Besides, it will give you a sexy advice with sexy voice on your connection speed and the file size.

# 2. Architecture

Chroman ver 1.0 has very simple architecture:

<img src="./img/architecture.png" alt="chroman architecture">

The main future plans are:

- to improve the accuracy
- to extend its function to the Google search results
- make its voice sexier

# 3. Setup

***⚠️As of 13 Feb 2019, this app is currently going through a compliance review at Chrome Web Store.***

## 💡Use this app on the server

To use this app on Google Chrome, go to [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) and download this app.

## 💡Use this app locally

### 1. Download the original source

To use this app locally, you have to create a Git branch.

Create your own Git account on GitHub and **fork a master** from [Chroman](https://github.com/y-yeah/chroman).

Copy the URL of your fork, and run the following code locally.

```
cd <target_repo>
git clone <url_of_your_fork>
```

### 2. Enable Google Extension on Google Chrome

***⚠️This part is mainly cited from the official instructions on Google Chrome Extension. More info at [Google Chrome Developer page](https://developer.chrome.com/extensions/getstarted).***

First and foremost, open Google Chrome.

Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).

Enable Developer Mode by clicking the toggle switch next to Developer mode.

Click the `LOAD UNPACKED` button and select the extension directory.

<img src="https://developer.chrome.com/static/images/get_started/load_extension.png" alt="extension unpacked" width="80%">

Now Chromon's icon should be installed onto your toolbar!

## 4. Contributions

Chroman wants to improve himself **a lot more**. He needs your help!

Follow the instructions [use this app locally](#3-setup) and you will get the original source on your computer.

To contribute to this app, make sure you create a branch and **ALWAYS** make a pull request. **DO NOT EDIT THE MASTER!**

`git checkout -b <branch_name>`

If you want to push your edited files to your remote file, run the following:

`git push <remote_name> <branch_name>`

---

**LICENSE**: CC7 YUMA SUMI

**Linkedin**: [Yuma Sumi](https://www.linkedin.com/in/yuma-sumi-15b8129a/)

**Twitter**: [@yumayeah](https://twitter.com/yumayeah)
