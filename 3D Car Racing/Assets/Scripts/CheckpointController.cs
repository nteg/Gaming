using UnityEngine;
using System.Collections;

public class CheckpointController : MonoBehaviour
{
    public Transform[] checkPointArray;
    public static int currentCheckPoint = 0;
    public static int currentLap = 0;
    public static Vector3 startPosition;

    // Use this for initialization
    void Start()
    {
        startPosition = transform.position;

    }

    // Update is called once per frame
    void Update()
    {

    }
}
