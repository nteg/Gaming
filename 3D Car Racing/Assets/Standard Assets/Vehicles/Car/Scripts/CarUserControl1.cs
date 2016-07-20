using System;
using UnityEngine;
using UnityStandardAssets.CrossPlatformInput;

namespace UnityStandardAssets.Vehicles.Car
{
    [RequireComponent(typeof(CarController))]
    [RequireComponent(typeof(GameTimer))]
    public class CarUserControl1 : MonoBehaviour
    {
        private CarController m_Car; // the car controller we want to use
        private GameTimer timer;

        private void Awake()
        {
            // get the car controller
            m_Car = GetComponent<CarController>();
            timer = GetComponent<GameTimer>();
        }


        private void FixedUpdate()
        {
            if (timer.startRace)
            {
                // pass the input to the car!
                float h = CrossPlatformInputManager.GetAxis("Horizontal1");
                float v = CrossPlatformInputManager.GetAxis("Vertical1");
#if !MOBILE_INPUT
                float handbrake = CrossPlatformInputManager.GetAxis("Jump");
                m_Car.Move(h, v, v, handbrake);
#else
            m_Car.Move(h, v, v, 0f);
#endif
            }
        }
    }
}