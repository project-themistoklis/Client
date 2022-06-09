using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class LoginScreen : ScreenManager
{
    public static LoginScreen getInstance;
    void Awake() { getInstance = this; }

    [SerializeField] TMP_InputField usernameInput, passwordInput;
    [SerializeField] Button loginButton;
    [SerializeField] TMP_Text response;

    private void Start()
    {
        loginButton.onClick.AddListener(delegate {
            string username = usernameInput.text;
            string password = passwordInput.text;
            usernameInput.text = "";
            passwordInput.text = "";
            response.text = "";

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                response.text = "Invalid login";
                return;
            }

            Client.getInstance.Login(username, password);
        });
    }

    public void Response(RequestResponse response)
    {
        if (response == RequestResponse.OK)
            MenuManager.getInstance.ChangeScreen(screen.Main);
        else
            this.response.text = "Invalid login";
    }

    public override void OnUpdate(bool enable)
    {
        usernameInput.text = "";
        passwordInput.text = "";
        response.text = "";
    }
}
