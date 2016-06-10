using UnityEngine;
using System.Collections;

public class RayCasting : MonoBehaviour {

    public float obstacleRange = 15f;
    public float rotationSpeed = 30f;
    private RaycastHit hit;
    public int range = 10;
    public float sensorLength = 10f;
    public float sideWaySensorLength = 10f;
    public float frontSensorStartPoint = 10f;
    public float frontSensorSideDistance = 1f;
    public float frontSensorFrontDistance = 4f;
    public float frontRightSensorAngle = 30f;
    public float frontLeftSensorAngle = -30f;
    public float angledSensorLength = 4f;

    // Update is called once per frame
    void Update () {
        Vector3 forward = transform.TransformDirection(Vector3.forward) * frontSensorStartPoint;
        Vector3 right = transform.TransformDirection(Vector3.right) * frontSensorStartPoint;
        Vector3 rightAngle = Quaternion.AngleAxis(frontRightSensorAngle, transform.up) * transform.forward * angledSensorLength;
        Vector3 leftAngle = Quaternion.AngleAxis(frontLeftSensorAngle, transform.up) * transform.forward * angledSensorLength;
        RaycastHit hit;

        //Front Mid sensor
        //Moving the position of sensor to the front 
        Vector3 pos = transform.position + transform.forward * frontSensorFrontDistance;
        if (Physics.Raycast(pos,  transform.forward, out hit, sensorLength)) {
            Debug.DrawRay(pos, forward, Color.green);
        }

        //Front Straight Right Sensor

        //Moving the position of sensor to right side
        pos = transform.position + transform.right * frontSensorSideDistance;
        //Moving the position of sensor to the front 
        pos = pos + transform.forward * frontSensorFrontDistance;
        if (Physics.Raycast(pos,transform.forward, out hit, sensorLength)) {
            Debug.DrawRay(pos, forward, Color.green);
        }

        //Front Angled Right Sensor
        //Moving the position of sensor to right side
        pos = transform.position + transform.right * frontSensorSideDistance;
        //Moving the position of sensor to the front 
        pos = pos + transform.forward * frontSensorFrontDistance;
        if (Physics.Raycast(pos, rightAngle, out hit, sensorLength))
        {
            Debug.DrawRay(pos, rightAngle, Color.green);
        }
        //Front Straight Left Sensor
        //Moving the position of sensor to left side
        pos = transform.position - transform.right * frontSensorSideDistance;
        //Moving the position of sensor to the front 
        pos = pos + transform.forward * frontSensorFrontDistance;
        if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
        {
            Debug.DrawRay(pos, forward, Color.green);
        }
        //Moving the position of sensor to left side
        pos = transform.position - transform.right * frontSensorSideDistance;
        //Moving the position of sensor to the front 
        pos = pos + transform.forward * frontSensorFrontDistance;
        //Front Angled Left Sensor
        if (Physics.Raycast(pos, leftAngle, out hit, sensorLength))
        {
            Debug.DrawRay(pos, leftAngle, Color.green);
        }
        //postion at centre
        pos = transform.position;
        //Right Sesnosr
        if (Physics.Raycast(pos, transform.right, out hit, sensorLength))
        {
            Debug.DrawRay(pos, right, Color.green);
        }

        //Right Sesnosr
        if (Physics.Raycast(pos, -transform.right, out hit, sideWaySensorLength))
        {
            Debug.DrawRay(pos, -right, Color.green);
        }
    }
}
