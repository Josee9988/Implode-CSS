# **Implode-CSS** 🌋💣

Npm CLI package that removes all unused CSS *classes* and *ids* from your project.

---

## **Goal of the package**

Reduce useless/unused CSS selectors from a project in order to increase performance and readability.

If you create a project from scratch or use templates there is a high change of creating CSS selectors that you will finally not use and will be downloaded by the user and will make the page performance slower.

With `implodeCss` you will be able to **detect** and/or **remove** these unused CSS.

---

## **Installation**

``` bash
sudo npm install -g @josee9988/implode-css
```

---

## **How to use it**

- If you do not know how to use the package use:

    ``` bash
    implodeCss -h # to show the manual
    ```

- To be prompted by the package do not use arguments:

    ``` bash
    implodeCss # it will guide you
    ```

- Specify folder (actual / absolute path)

    ``` bash
    implodeCss . # actual folder
    ```

    ``` bash
    implodeCss /home/user/project # folder /home/user/project
    ```

- Audit (detect but do not do any action):

    ``` bash
    implodeCss . -a # audit actual package
    ```

- Fix (remove all unused CSS selectors)

    ``` bash
    implodeCss . -f # audit actual package
    ```

- Ignore folders

    ``` bash
    implodeCss . -a -i src,data  # audit actual package and do not look into folders: /src/, /data/
    ```

- Specify port (default = 4949)

    ``` bash
    implodeCss . -a -p 8080 # audit actual package and create the server on port 4949
    ```

---

## **Screenshots** 📸 😁

- Auditing the code with `implodeCss . -a`

<img src="https://i.imgur.com/AnTvuHb.png" alt="auditing code" title="auditing code" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- Table with all the unused selectors

<img src="https://i.imgur.com/wRXYHmG.png" alt="table with unused selectors" title="table with unused selectors" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- If you do not specify a folder...

<img src="https://i.imgur.com/HJj8OmH.png" alt="folder not specified" title="folder not specified" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- If you do not specifiy the option to perform...

<img src="https://i.imgur.com/l67EvSs.png" alt="option not specified" title="option not specified" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

---

> ⚠️Remember that this tool does not guarantee a 100% effectiveness and may have some issue at some point. Use it at your own risk and always do backups of your code.⚠️

*Made with a lot of ❤️❤️ by **[@Josee9988](https://github.com/Josee9988)***
