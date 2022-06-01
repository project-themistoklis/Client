using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MenuManager : MonoBehaviour
{
    public static MenuManager getInstance;
    void Awake() { getInstance = this; }

    [System.Serializable]
    public class ScreenObj
    {
        public screen screen;
        public GameObject obj;
        public ScreenManager manager;
    }

    [SerializeField] ScreenObj[] screens;
    [SerializeField] screen startingScreen;

    screen currentScreen = screen.None;

    void Start()
    {
        ChangeScreen(startingScreen);
    }

    public void ChangeScreen(screen screen)
    {
        if (currentScreen == screen)
            return;

        currentScreen = screen;
        for (int i = 0; i < screens.Length; i++)
        {
            if (screens[i].obj)
                screens[i].obj.SetActive(screens[i].screen == screen);
            if (screens[i].manager)
                screens[i].manager.OnUpdate(screens[i].screen == screen);
        }
    }
}

public enum screen
{
    None = -1,
    Loading = 0,
    Main = 1,
    Add = 2,
    Edit = 3,
    Settings = 4,
}