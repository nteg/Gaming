using UnityEngine;
using System.Collections;

public class RayCasting : MonoBehaviour {

    public float obstacleRange = 15f;
    public float rotationSpeed = 30f;
    private RaycastHit hit;
    public int range = 10;
    private float sensorLength = 10f;
    public float frontSensorStartPoint = 10f;
    public float frontSensorSideDistance = 1f;
    public float frontSensorAngle = 30f;

	// Update is called once per frame
	void Update () {
        Vector3 forward = transform.TransformDirection(Vector3.forward) * frontSensorStartPoint;
        Vector3 rightAngle = Quaternion.AngleAxis(frontSensorAngle, transform.up) * transform.forward;
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hit;

        //Front Mid sensor
        if (Physics.Raycast(ray,  out hit, sensorLength)) {
            Debug.DrawRay(transform.position, forward, Color.green);
        }

        //Front Straight Right Sensor
        Vector3 pos = transform.position + transform.right * frontSensorSideDistance;
        if (Physics.Raycast(pos,transform.forward, out hit, sensorLength)) {
            Debug.DrawRay(pos, forward, Color.green);
        }

        //Front Angled Right Sensor
        pos = transform.position + transform.right * frontSensorSideDistance;
        if (Physics.Raycast(pos, rightAngle, out hit, sensorLength))
        {
            Debug.DrawRay(pos, rightAngle, Color.green);
        }

        //Front Straight Left Sensor
        pos = transform.position - transform.right * frontSensorSideDistance;
        if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
        {
            Debug.DrawRay(pos, forward, Color.green);
        }


    }
}
