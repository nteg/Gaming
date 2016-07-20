using UnityEngine;
using System.Collections;
using UnityEngine.UI;
namespace UnityStandardAssets.Vehicles.Car
{
    public class GameTimer : MonoBehaviour
    {

        private float time;
        private static int countDownUpto = 3;
        private static int second = 0;
        [HideInInspector]
        public bool startRace = false;

        void Update()
        {

            time += Time.deltaTime;

            float seconds = time % 60;//Use the euclidean division for the seconds.

            second = 3 - (int)Mathf.Round(seconds);
            //update the label value
            if (second < countDownUpto && second > 0)
            {
                //do nothing
            }
            else if(second == -2)
            {
                startRace = true;
            }
        }
    }
}
