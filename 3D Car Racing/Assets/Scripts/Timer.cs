using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Timer : MonoBehaviour
{

    [SerializeField]
    private Text timerLabel;

    private float time;
    private static int countDownUpto = 3;
    private static int second = 0;
    public bool startRace = false;

    void Update()
    {
        if (!startRace)
        {

            time += Time.deltaTime;

            float seconds = time % 60;//Use the euclidean division for the seconds.

            second = 3 - (int)Mathf.Round(seconds);
            //update the label value
            if (second < countDownUpto && second > 0)
            {
                timerLabel.text = second.ToString();
            }
            else if (second == -1)
            {
                startRace = true;
                timerLabel.text = "";
            }
            else
            {
                timerLabel.text = "";

            }
        }

    }
}
