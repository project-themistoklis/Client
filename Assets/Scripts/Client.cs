using LiteNetLib;
using LiteNetLib.Utils;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Client : MonoBehaviour
{
    public static Client getInstance;
    void Awake() { getInstance = this; }

    [SerializeField] string ip;
    [SerializeField] int port;
    //TODO: Encrypt it, so the server gets the encrypted key for higher security
    [SerializeField] string connectionKey;

    EventBasedNetListener listener;
    NetManager client;
    NetPeer server;
    int clientId;

    public void Connect()
    {
        listener = new EventBasedNetListener();
        client = new NetManager(listener);
        client.Start();
        client.Connect(ip, port, connectionKey);

        listener.NetworkReceiveEvent += NetworkReceiveEvent;
    }

    void Update()
    {
        if (client != null)
            client.PollEvents();
    }

    void NetworkReceiveEvent(NetPeer peer, NetPacketReader reader, byte channel, DeliveryMethod deliveryMethod)
    {
        Packets packet = (Packets)reader.GetUShort();
        if (packet == Packets.Welcome)
        {
            clientId = reader.GetInt();
            server = peer;
            MenuManager.getInstance.ChangeScreen(screen.Login);
        }
        else if (packet == Packets.Login)
        {
            RequestResponse response = (RequestResponse)reader.GetUShort();
            if (response == RequestResponse.OK)
            {
                Dictionary<string, string> settings = new Dictionary<string, string>();
                int count = reader.GetInt();
                for (int i = 0; i < count; i++)
                {
                    string key = reader.GetString();
                    string value = reader.GetString();
                    settings.Add(key, value);
                }
                SettingsScreen.getInstance.SetSettings(settings);
            }

            LoginScreen.getInstance.Response(response);
        }
    }

    public void SendPacket(NetDataWriter writer, DeliveryMethod method)
    {
        if (server == null)
            return;

        server.Send(writer, method);
    }

    public void Login(string username, string password)
    {
        NetDataWriter writer = new NetDataWriter();
        writer.Put((ushort)Packets.Login);
        writer.Put(username);
        writer.Put(password);

        SendPacket(writer, DeliveryMethod.ReliableOrdered);
    }

    public void SendImage(string base64)
    {
        NetDataWriter writer = new NetDataWriter();
        writer.Put((ushort)Packets.Image);
        writer.Put(base64);

        SendPacket(writer, DeliveryMethod.Unreliable);
    }
}

public enum Packets
{
    Welcome = 0,
    Login = 1,
    Image = 2,
}

public enum RequestResponse
{
    OK = 0,
    Error = 1,
}