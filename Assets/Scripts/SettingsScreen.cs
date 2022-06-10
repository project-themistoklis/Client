using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class SettingsScreen : ScreenManager
{
    public static SettingsScreen getInstance;
    void Awake() { getInstance = this; }

    Dictionary<string, string> settings = new Dictionary<string, string>();

    public void SetSettings(Dictionary<string, string> settings)
    {
        this.settings = settings;
    }

    public override void OnUpdate(bool enable)
    {
    }
}
