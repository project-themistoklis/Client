using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LoadingScreen : ScreenManager
{
    public override void OnUpdate(bool enable)
    {
        if (enable)
            Client.getInstance.Connect();
    }
}
