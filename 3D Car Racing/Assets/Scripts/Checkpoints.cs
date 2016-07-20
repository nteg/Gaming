using UnityEngine;
using System.Collections;

public class Checkpoints : MonoBehaviour
{
    private Transform playerTransform;

    // Use this for initialization
    void Start()
    {
        playerTransform = GameObject.FindGameObjectWithTag("Car").transform;
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnTriggerEnter(Collider other)
    {
        if (!other.CompareTag("Player"))
        {
            return;
        }

        if (transform == playerTransform.GetComponent<CheckpointController>().checkPointArray[CheckpointController.currentCheckPoint].transform)
        {
            Debug.Log("We are at check point: " + CheckpointController.currentCheckPoint);
            if (CheckpointController.currentCheckPoint + 1 < playerTransform.GetComponent<CheckpointController>().checkPointArray.Length)
            {
                if (CheckpointController.currentCheckPoint == 0)
                {
                    CheckpointController.currentLap++;
                    Debug.Log("We are on Lap: " + CheckpointController.currentLap);
                }
                CheckpointController.currentCheckPoint++;
            }
            else
            {
                CheckpointController.currentCheckPoint = 0;
            }
        }
    }
}
