using UnityEngine;
using System.Collections;

public class Translate : MonoBehaviour {

        public float speed = 4f;
        // Use this for initialization
        void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        transform.Translate(0, 0, speed );
    }
}
