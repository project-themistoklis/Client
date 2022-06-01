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
            MenuManager.getInstance.ChangeScreen(screen.Main);
        }
    }

    public void SendPacket(NetDataWriter writer, DeliveryMethod method)
    {
        if (server == null)
            return;

        server.Send(writer, method);
    }
}

public enum Packets
{
    Welcome = 0,
}