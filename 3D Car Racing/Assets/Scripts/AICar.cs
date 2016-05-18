﻿using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class AICar : MonoBehaviour
{
    // These variables allow the script to power the wheels of the car.
    public WheelCollider FrontLeftWheel;
    public WheelCollider FrontRightWheel;
    // These variables are for the gears, the array is the list of ratios. The script
    // uses the defined gear ratios to determine how much torque to apply to the wheels.
    public float[] GearRatio ;
    public int CurrentGear = 0;
    // These variables are just for applying torque to the wheels and shifting gears.
    // using the defined Max and Min Engine RPM, the script can determine what gear the
    // car needs to be in.
    public float EngineTorque = 600;
    public float MaxEngineRPM = 3000;
    public float MinEngineRPM = 1000;

    private float EngineRPM = 0;
    // Here's all the variables for the AI, the waypoints are determined in the "GetWaypoints" function.
    // the waypoint container is used to search for all the waypoints in the scene, and the current
    // waypoint is used to determine which waypoint in the array the car is aiming for.
    public GameObject WayPoints;
    private List<Transform> waypoints;
    private int currentWaypoint = 0;
    // input steer and input torque are the values substituted out for the player input. The 
    // "NavigateTowardsWaypoint" function determines values to use for these variables to move the car
    // in the desired direction.
    private float inputSteer = 0;
    private float inputTorque = 0;
    void Start()
    {
        Vector3 centerOfMass = GetComponent<Rigidbody>().centerOfMass;
        centerOfMass.y = -1.5f;
        // I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
        GetComponent<Rigidbody>().centerOfMass = centerOfMass;

        // Call the function to determine the array of waypoints. This sets up the array of points by finding
        // transform components inside of a source container.
        GetWaypoints();
    }

    void Update()
    {
        // This is to limith the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
        // but it's easy, and it doesn't interfere with the physics processing.
        GetComponent<Rigidbody>().drag = GetComponent<Rigidbody>().velocity.magnitude / 250f;

        // Call the funtion to determine the desired input values for the car. This essentially steers and
        // applies gas to the engine.
        NavigateTowardsWaypoint();

        // Compute the engine RPM based on the average RPM of the two wheels, then call the shift gear function
        EngineRPM = (FrontLeftWheel.rpm + FrontRightWheel.rpm) / 2f * GearRatio[CurrentGear];
        ShiftGears();

        // set the audio pitch to the percentage of RPM to the maximum RPM plus one, this makes the sound play
        // up to twice it's pitch, where it will suddenly drop when it switches gears.
        GetComponent<AudioSource>().pitch = Mathf.Abs(EngineRPM / MaxEngineRPM) + 1.0f;
        // this line is just to ensure that the pitch does not reach a value higher than is desired.
        if (GetComponent<AudioSource>().pitch > 2.0f)
        {
            GetComponent<AudioSource>().pitch = 2.0f;
        }

        // finally, apply the values to the wheels. The torque applied is divided by the current gear, and
        // multiplied by the calculated AI input variable.
        FrontLeftWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;
        FrontRightWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;

        // the steer angle is an arbitrary value multiplied by the calculated AI input.
        FrontLeftWheel.steerAngle = 10f * inputSteer;
        FrontRightWheel.steerAngle = 10f * inputSteer;
    }
    void ShiftGears()
    {
        int AppropriateGear = 0;

        // this funciton shifts the gears of the vehcile, it loops through all the gears, checking which will make
        // the engine RPM fall within the desired range. The gear is then set to this "appropriate" value.
        if (EngineRPM >= MaxEngineRPM)
        {
            AppropriateGear = CurrentGear;

            for (int i = 0; i < GearRatio.Length; i++)
            {
                if (FrontLeftWheel.rpm * GearRatio[i] < MaxEngineRPM)
                {
                    AppropriateGear = i;
                    break;
                }
            }

            CurrentGear = AppropriateGear;
        }

        if (EngineRPM <= MinEngineRPM)
        {
            AppropriateGear = CurrentGear;

            for (int j = GearRatio.Length - 1; j >= 0; j--)
            {
                if (FrontLeftWheel.rpm * GearRatio[j] > MinEngineRPM)
                {
                    AppropriateGear = j;
                    break;
                }
            }

            CurrentGear = AppropriateGear;
        }
    }

void GetWaypoints()
{
    // Now, this function basically takes the container object for the waypoints, then finds all of the transforms in it,
    // once it has the transforms, it checks to make sure it's not the container, and adds them to the array of waypoints.
    Transform[] potentialWaypoints = WayPoints.GetComponentsInChildren<Transform>();
    waypoints = new List<Transform>();

    foreach (Transform potentialWaypoint in potentialWaypoints)
    {
        if (potentialWaypoint != WayPoints.transform)
            waypoints.Add(potentialWaypoint);
    }
}

void NavigateTowardsWaypoint()
{
    // now we just find the relative position of the waypoint from the car transform,
    // that way we can determine how far to the left and right the waypoint is.
    Vector3 RelativeWaypointPosition = transform.InverseTransformPoint(new Vector3(
                                                waypoints[currentWaypoint].position.x,
                                                transform.position.y,
                                                waypoints[currentWaypoint].position.z));


    // by dividing the horizontal position by the magnitude, we get a decimal percentage of the turn angle that we can use to drive the wheels
    inputSteer = RelativeWaypointPosition.x / RelativeWaypointPosition.magnitude;

    // now we do the same for torque, but make sure that it doesn't apply any engine torque when going around a sharp turn...
    if (Mathf.Abs(inputSteer) < 0.5)
        inputTorque = RelativeWaypointPosition.z / RelativeWaypointPosition.magnitude - Mathf.Abs(inputSteer);
    else
        inputTorque = 0.0f;

    // this just checks if the car's position is near enough to a waypoint to count as passing it, if it is, then change the target waypoint to the
    // next in the list.
    if (RelativeWaypointPosition.magnitude < 20)
    {
        currentWaypoint++;

        if (currentWaypoint >= waypoints.Count)
            currentWaypoint = 0;
    }

}
}