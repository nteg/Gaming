using UnityEngine;
using System.Collections;

public class RayCasting : MonoBehaviour {

    public float obstacleRange = 15f;
    public float rotationSpeed = 30f;
    private RaycastHit hit;
    public int range = 10;
    public float sensorLength = 10f;
    public float angledSensorLength = 10f;
    public float sideWaySensorLength = 10f;
    public float sideWaysSensorStartPoint = 5f;
    public float frontSensorStartPoint = 10f;
    public float frontSensorSideDistance = 1f;
    public float frontSensorFrontDistance = 4f;
    public float frontRightSensorAngle = 30f;
    public float frontLeftSensorAngle = -30f;
    public float angledSensorMag = 4f;
    public float maxSteer = 15.0f;
    public float avoidSpeed = 10.0f;
    public float deAcerlationSpeed = 10.0f;
    [HideInInspector]
    public int flag = 0;
    [HideInInspector]
    public bool reversing = false;
    public float reverseCounter = 0.0f;
    public float waitToReverse = 2.0f;
    public float reverseFor = 2.5f;
    public GameObject terrain;

    // These variables allow the script to power the wheels of the car.
    public WheelCollider FrontLeftWheel;
    public WheelCollider FrontRightWheel;

    // Update is called once per frame
    void Update() {
        if (terrain.GetComponent<Timer>().startRace)
        {
            flag = 0;
            float senstivity = 0f;

            Vector3 forward = transform.TransformDirection(Vector3.forward) * frontSensorStartPoint;
            Vector3 right = transform.TransformDirection(Vector3.right) * frontSensorStartPoint;
            Vector3 sideWaysRight = transform.TransformDirection(Vector3.right) * sideWaysSensorStartPoint;
            Vector3 rightAngle = Quaternion.AngleAxis(frontRightSensorAngle, transform.up) * transform.forward * angledSensorMag;
            Vector3 leftAngle = Quaternion.AngleAxis(frontLeftSensorAngle, transform.up) * transform.forward * angledSensorMag;
            RaycastHit hit;

            //Braking sensor
            //Moving the position of sensor to the front 
            Vector3 pos = transform.position + transform.forward * frontSensorFrontDistance;
            if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
            {
                if (hit.collider.tag != "Road" && !reversing && hit.collider.tag != "CheckPoint")
                {
                    if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
                    {
                        flag++;
                        FrontLeftWheel.brakeTorque = deAcerlationSpeed;
                        FrontRightWheel.brakeTorque = deAcerlationSpeed;
                        Debug.DrawRay(pos, forward, Color.red);
                    }
                }
                else
                {
                    FrontLeftWheel.brakeTorque = 0;
                    FrontRightWheel.brakeTorque = 0;
                }

            }
            else
            {
                FrontLeftWheel.brakeTorque = 0;
                FrontRightWheel.brakeTorque = 0;
            }




            //Front Straight Right Sensor
            //Moving the position of sensor to right side
            pos = transform.position + transform.right * frontSensorSideDistance;
            //Moving the position of sensor to the front 
            pos = pos + transform.forward * frontSensorFrontDistance;
            if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
            {
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
                    {
                        flag++;
                        //moving car to the left to avoid obstacle
                        senstivity -= 0.5f;
                        Debug.DrawRay(pos, forward, Color.green);
                    }
                }
            }
            else if (Physics.Raycast(pos, rightAngle, out hit, angledSensorLength))
            { //Front Angled Right Sensor
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
                    {
                        flag++;
                        senstivity -= 0.5f;
                        Debug.DrawRay(pos, rightAngle, Color.green);
                    }
                }
            }
            //Front Straight Left Sensor
            //Moving the position of sensor to left side
            pos = transform.position - transform.right * frontSensorSideDistance;
            //Moving the position of sensor to the front 
            pos = pos + transform.forward * frontSensorFrontDistance;
            if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
            {
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
                    {
                        flag++;
                        senstivity += 0.5f;
                        Debug.DrawRay(pos, forward, Color.green);
                    }
                }

            }
            else if (Physics.Raycast(pos, leftAngle, out hit, angledSensorLength))
            { //Front Angled Left Sensor
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
                    {
                        flag++;
                        senstivity += 0.5f;
                        Debug.DrawRay(pos, leftAngle, Color.green);
                    }
                }
            }
            //postion at centre
            pos = transform.position;
            //Right Sideways Sensor
            if (Physics.Raycast(pos, transform.right, out hit, sideWaySensorLength))
            {
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    flag++;
                    senstivity -= 0.5f;
                    Debug.DrawRay(pos, sideWaysRight, Color.green);
                }
            }

            //Left Sideways Sesnosr
            if (Physics.Raycast(pos, -transform.right, out hit, sideWaySensorLength))
            {
                if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                {
                    flag++;
                    senstivity += 0.5f;
                    Debug.DrawRay(pos, -sideWaysRight, Color.green);
                }
            }


            pos = transform.position + transform.forward * frontSensorFrontDistance;
            //Front Mid Sensor
            if (senstivity == 0)
            {
                if (Physics.Raycast(pos, transform.forward, out hit, sensorLength))
                {
                    if (hit.collider.tag != "Road" && hit.collider.tag != "CheckPoint")
                    {
                        if (hit.normal.x < 0)
                        {
                            senstivity = -0.5f;
                        }
                        else
                        {
                            senstivity = 0.5f;
                        }
                        Debug.DrawRay(pos, forward, Color.white);
                    }
                }
            }

            //currentSpeed has not been used because velocity.magnitude is being calclauted on the basis of speed of the rigidBody moving in the space
            if (GetComponent<Rigidbody>().velocity.magnitude < .5 && !reversing)
            {
                reverseCounter += Time.deltaTime;
                if (reverseCounter >= waitToReverse)
                {
                    reverseCounter = 0;
                    reversing = true;
                }
            }
            else if (!reversing)
            {
                reverseCounter = 0;
            }

            if (reversing)
            {
                flag = 1;
                senstivity *= -1;//help car to decide to go left or back while reversing
                reverseCounter += Time.deltaTime;
                //if we have reversed for this amount of time stop reversing
                if (reverseCounter >= reverseFor)
                {
                    reverseCounter = 0;
                    reversing = false;
                }
            }

            if (flag != 0)
            {
                AvoidSteer(senstivity);
            }
        }
    }

    private void AvoidSteer(float senstivity)
    {
        FrontLeftWheel.steerAngle = avoidSpeed * senstivity;
        FrontLeftWheel.steerAngle = avoidSpeed * senstivity;
    }


}
