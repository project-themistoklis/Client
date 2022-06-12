using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainScreen : ScreenManager
{
    [SerializeField] Button addDroneButton, editDronesButton, preferencesButton;

    private void Start()
    {
        addDroneButton.onClick.AddListener(delegate { MenuManager.getInstance.ChangeScreen(screen.Add); });
        editDronesButton.onClick.AddListener(delegate { MenuManager.getInstance.ChangeScreen(screen.Edit); });
        preferencesButton.onClick.AddListener(delegate { MenuManager.getInstance.ChangeScreen(screen.Settings); });
    }

    public override void OnUpdate(bool enable)
    {
    }
}
