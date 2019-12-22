<!-- markdownlint-disable MD033-->
# **Implode-CSS** 🌋💣

Npm CLI package that removes all unused CSS *classes* and *ids* from your project.

---

[![Version](https://badge.fury.io/js/%40josee9988%2Fimplode-css.svg)](https://www.npmjs.com/package/@josee9988/implode-css)
[![Downloads](https://img.shields.io/npm/dt/@josee9988/implode-css.svg)](https://www.npmjs.com/package/@josee9988/implode-css)

---

## **Goal of the package** 🎯

To remove **useless/unused** CSS selectors from a project to increase **performance** and **readability**.

If you create a project from scratch or use templates there is a *high chance of creating CSS selectors that you will finally not use* and will be downloaded by the user and will make the **page performance slower**.

With `implodeCss` you will be able to **detect** and/or **remove** these unused CSS.

---

## **Installation** 🔩⚙

``` bash
sudo npm install -g @josee9988/implode-css
```

---

## **Examples of use** 📐🛡

- If you **do not know** how to use the package, show the **manual** by using:

    ``` bash
    implodeCss -h # to show the manual
    ```

- To be **prompted by the package**, do not use arguments, *we will help you*:

    ``` bash
    implodeCss # it will guide you
    ```

- Specify **folder** (actual / absolute path):

    ``` bash
    implodeCss . # actual folder, you must use always absolute paths but with the dot
    ```

    ``` bash
    implodeCss /home/user/project # folder /home/user/project
    ```

- **Audit** (detect but do not do any action):

    ``` bash
    implodeCss . -a # audit actual package
    ```

- **Fix** (remove all unused CSS selectors):

    ``` bash
    implodeCss . -f # audit actual package
    ```

- **Ignore folders**:

    ``` bash
    implodeCss . -a -i src,data  # audit actual package and do not look into folders: /src/, /data/
    ```

- Specify **port** (default = 4949):

    ``` bash
    implodeCss . -a -p 8080 # audit actual package and create the server on port 4949
    ```

---

## **Screenshots** 📸 😁

- **Auditing** the code with: `implodeCss . -a`

<img src="https://i.imgur.com/AnTvuHb.png" alt="auditing code" title="auditing code" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- **Table** with all the unused selectors and more information.

<img src="https://i.imgur.com/vkXgq70.png" alt="table with unused selectors" title="table with unused selectors" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- **Help** command: `implodeCss -h`

<img src="https://i.imgur.com/dVof1Rx.png" alt="help command" title="help command" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- If you do not specify a folder...

<img src="https://i.imgur.com/HJj8OmH.png" alt="folder not specified" title="folder not specified" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- If you do not specify the option to perform...

<img src="https://i.imgur.com/l67EvSs.png" alt="option not specified" title="option not specified" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

---

## **Error codes** ❌

<details>
<summary>Click to see all the <b>error</b> and <b>informational</b> codes and it's explanation</summary>

### **200**

- Exists without errors.

### **201**

- Exit without an expected code, this code should not appear at all.

### **401**

- Bad arguments passed by the user. Some of the arguments used are not expected.

### **402**

- The path (most of the times the main folder) doesn't have read permissions, so the program could not read your files.

### **403** [Not used]

- The path doesn't have write permissions (Not used anywhere yet. see 405 instead).

### **404**

- Found 0 CSS files or 0 HTML files. The user should provide atleast 1 CSS files and 1 HTML file.

### **405**

- The local temporary file doesn't have write permissions so the page with the results won't get any data.

### **406**

- A path inside the main folder doesn't have read or write permissions (not specified).

### **500**

- Unknown error, the package specified an error that doesn't exist (should not appear, if so, please contact us and tell us how).

### **501**

- The selected port couldn't be opened.

### **502**

- Unexpected error (should not appear, if so, please contact us and tell us how).

</details>

---

### Did you enjoyed the package? Help us raise these numbers up 🥰 🎉

[![Github followers](https://img.shields.io/github/followers/Josee9988.svg?style=social)](#did-you-enjoyed-the-package-help-us-raise-these-numbers-up--)
[![Github stars](https://img.shields.io/github/stars/Josee9988/Implode-CSS.svg?style=social)](#did-you-enjoyed-the-package-help-us-raise-these-numbers-up--)
[![Github watchers](https://img.shields.io/github/watchers/Josee9988/Implode-CSS.svg?style=social)](#did-you-enjoyed-the-package-help-us-raise-these-numbers-up--)
[![Github forks](https://img.shields.io/github/forks/Josee9988/Implode-CSS.svg?style=social)](#did-you-enjoyed-the-package-help-us-raise-these-numbers-up--)

Also check the [npm page with the package](https://www.npmjs.com/package/@josee9988/implode-css)

---

> ⚠️Remember that this tool does not guarantee a 100% effectiveness and may have some issue at some point. Use it at your own risk and always do backups of your code.⚠️

*Made with a lot of ❤️❤️ by **[@Josee9988](https://github.com/Josee9988)***
