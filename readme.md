**playwithfriends-api**

This is a lightweight nodejs/expressjs app that uses the [Steam web API](https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0001.29) to find games in common between two steam accounts.

In order to use it you can either spin it up locally using the dev script in `package.json`, or you can invoke the URL of [my AWS lambda function](https://v76mrglfwkuz4ot6kauvygs5hy0kiwdy.lambda-url.us-east-1.on.aws). You must pass in two steam ids as query parameters. You can find your steam ID on your account page under `Account Details`.

In the future, I will build out a frontend using this API that will make things easier/prettier.
