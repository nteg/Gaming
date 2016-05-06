using UnityEngine;
using System.Collections;

public class Waypoints : MonoBehaviour
{
    public static Waypoints start;
    public Waypoints next;
    public bool isStart = false;

    void Awake()
    {
        if (!next)
        {
            Debug.LogWarning("This waypoint is not connected!");
        }

        if (isStart)
        {
            start = this;
        }
    }

    void OnDrawGizmos()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawCube(transform.position, new Vector3(0.5f, 0.5f, 0.5f));

        if (next)
        {
            Gizmos.color = Color.green;
            Gizmos.DrawLine(transform.position, next.transform.position);
        }
    }

}
